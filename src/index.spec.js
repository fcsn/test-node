const should =require('should');
const request = require('supertest');
const app = require('./index');

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
        })
    })
});