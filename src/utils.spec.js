// 단위 테스트: 함수의 기능 테스트
const utils = require('./utils');
// node doc에는 assert를 테스트에 쓰지 말고 서드파티 라이브러리를 쓰라고 합니
const should = require('should');

describe('utils.js 모듈의 capitalize() 함수는', () => {
    it('문자열의 첫번째 문자를 대문자로 변환', () => {
    const result = utils.capitalize('hello');
    // assert.equal(result, 'Hello');
    result.should.be.equal('Hello');
    })
})