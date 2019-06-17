const A = require('./globalA');

console.log("처음 호출 : " + A());
global.message = '안녕하세요!';
console.log("두번째 호출 :" + A());
