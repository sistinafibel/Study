const url = require('url');

const URL = url.URL;
const myURL = new URL('https://www.youtube.com/watch?v=F64yFFnZfkI&v2=Fasdqweqwe1');

console.log('new URL() : ' , myURL);
console.log('url.format() :' , url.format(myURL));
console.log("searchParams 가져오기 :: " + myURL.searchParams.get('v'));
console.log('--------------------------------------------');

const parsedUrl = url.parse('https://www.youtube.com/watch?v=F64yFFnZfkI&v2=Fasdqweqwe1');
console.log('url.parse() : ' , parsedUrl);
console.log('url.format() : ' ,url.format(parsedUrl));
