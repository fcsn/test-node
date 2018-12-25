const should =require('should');
const request = require('supertest');
const app = require('./index');
// 테스트 수트 - 테스트 환경으로 describe()
// 테스트 케이스 - 실제 테스트로 it()

//성공 - 유저 객체를 담은 배열로 응답한다.
//    - prameter로 준 최대 limit 갯수만큼 응답한다.
// 실패 -prameter로 준 limit이 숫자형이 아니면 400을 응답한다.
//     -prameter로 준 offset이 숫자형이 아니면 400을 응답한다.
// limit - 응답받을 데이터의 최대 길이
// offset - 앞에 skip하고 주지 않은 데이터 갯수
describe('GET /users는', () => {
    describe('성공시', () => {
        // node api는 비동기로 동작하기 때문에 test도 비동기 처리를 해줘야 한다.
        //done()이라는 콜백함수를 인자로 넣어주고 test가 끝나는 시점에 done() 호출한다.
        it('유저 객체를 받은 배열로 응답한다.', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array)
                    done();
                });
        });
        it('최대 limit 갯수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                  res.body.should.have.lengthOf(2)
                  done();
                });
        });
    });
    describe('실패시', () => {
        it('limit가 숫자형이 아니면 400을 응답한다', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        });
    });
});

describe('GET /users/:id은', () => {
    describe('성공시', () => {
        it('id가 1인 유저 객체를 반환한다', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1);
                    done();
                });
        });
    });
});

describe('DELETE /user/:id',  () => {
    describe('성공시', () => {
        it('204를 응답한다', done => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    })
    describe('실패시', () => {
        it('id가 숫자가 아닐경우 400으로 응답한다', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});

describe('POST /users', () => {
    describe('성공시', () => {
        let name = 'daniel',
            body;
        // before()는 it() - 테스트 케이스 함수 전에 동작하는 함
        before(done => {
            request(app)
                .post('/users')
                .send({name})
                .expect(201)
                .end((err, res) => {
                   body = res.body;
                   done();
                });
        });
        it('생성된 유저를 반환한다', () => {
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다', () => {
            body.should.have.property('name', name);
        })
    })
    describe('실패시', () => {
        it('name 파라미터 누락시 400을 반환한다', done => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done)
        });
        it('name이 중복일 경우 409를 반환한다', done => {
            request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done)
        })
    })
});

describe('PUT /user/:id', () => {
    describe('성공시', () => {
        it('변경된 name을 응답한다', done => {
            const name = '찰리';
            request(app)
                .put('/users/1')
                .send({name})
                .end((err, res) => {
                    res.body.should.have.property('name', name);
                    done();
                });
        })
    })
    describe('실패시', () => {
        it('정수가 아닌 id일 경우 400을 응답한다', done => {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        })
        it('name이 없을 경우 400을 응답한다', done => {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);
        })
        it('없는 유저 경우 404을 응답한다', done => {
            request(app)
                .put('/users/999999999')
                .send({name: 'foo'})
                .expect(404)
                .end(done);
        })
        it('이름이 중복일 경우 409을 응답한다', done => {
            request(app)
                .put('/users/3')
                .send({name: 'chris'})
                .expect(409)
                .end(done);
        })
    })
})