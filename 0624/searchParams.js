const { URL } = require('url');

const myURL = new URL('https://www.gilub.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

console.log(myURL);

console.log('searchParams :' , myURL.searchParams);
console.log('searchParams.getAll() : ' , myURL.searchParams.getAll('category')); //키에 해당하는 모든 값을 가져옵니다. 
console.log('searchParams.get() : ', myURL.searchParams.get('limit')); //limit키에 해당하는 값중 첫번째 값만 가져옵니다.
console.log('searchParams.has() : ' , myURL.searchParams.has('page')); //파라미터속 키 값이 있는지 조회합니다.

console.log('searchParams.keys() : ' , myURL.searchParams.keys()); // searchParams 키를 모두 iterator 문법의 객체로 가져옵니다.
console.log('searchParams.values() : ' , myURL.searchParams.values()); // searchParams 값을 모두 iterator 문법의 객체로 가져옵니다.

myURL.searchParams.append('filter' , 'es3'); //filter라는 키에 es3라는 값을 넣어줍니다. 같은 키가 있다면 유지하고 하나를 더 추가합니다.
myURL.searchParams.append('filter' , 'es5');

console.log(myURL.searchParams.getAll('filter')); //filter라는 키에 해당하는 모든 값을 가져옵니다.

myURL.searchParams.set('filter' , 'es6'); //filter라는 키에 있는 이전 데이터를 모두 지우고 << 중요 >> es6를 넣어줍니다.
console.log(myURL.searchParams.getAll('filter')); //filter라는 키를 모두 가져옵니다.

myURL.searchParams.delete('filter'); //filter키에 들어 있는 값을 모두 지웁니다. 
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString : ' , myURL.searchParams.toString()); //조작한 serchParams 객체를 다시 문자열로 만듭니다.
myURL.search = myURL.searchParams.toString(); // 이 문자열을 myURL.search에 반영하면 주소 객체에 반영됩니다.
