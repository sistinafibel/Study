const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('https://www.gilub.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

//url query 부분을 자바스크립트 객체로 분해한다 (JSON)
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse() : ' , query);
query.page = '5'; // 값 바꾸기

console.log('querystring.parse() : ' , query);

//분해된 query 객체를 다시 문자열로 조립한다.
console.log('querystring.stringify() : ' , querystring.stringify(query));