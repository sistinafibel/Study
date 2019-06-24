### URL

인터넷 주소를 쉽게 조작하도록 도와주는 묘듈.
노드에서는 두가지 방식을 사용하며 WHATWG(웹표준 단체) 방식의 URL과 이전부터 사용하는 방식 두가지로 구성되어 있다.

* WHATWG와 기존 노드를 설명한 표
  * URL 기준으로 위가 기존 노드의 구분 방법.
  * 아래가 WHATWG의 url 구분 방법이다.

![](C:\Users\null\Desktop\099.jpg)

------------------

#### 소스코드

```javascript
const url = require('url');

//WHATWG 방식
const URL = url.URL;
const myURL = new URL('https://www.youtube.com/watch?v=F64yFFnZfkI');

console.log('new URL() : ' , myURL);
console.log('url.format() :' , url.format(myURL));

console.log('--------------------------------------------');
//기존 Node 방식
const parsedUrl = url.parse('https://www.youtube.com/watch?v=F64yFFnZfkI');
console.log('url.parse() : ' , parsedUrl);
console.log('url.format() : ' ,url.format(parsedUrl));

```

url.parse(주소) : 주소를 분해합니다. WHATWG 방식과 비교하면 username, password 대신 auth 라는 속성과 searchParams 대신 query가 있는것을 볼 수 있다.

url.format(객체): WHATWG와 노드URL 방식 둘다 사용 할 수 있다.
분해되어 있던 url 객체를 원래 상태로 조립함.

결과

```javascript
>node url
new URL() :  URL {
  href: 'https://www.youtube.com/watch?v=F64yFFnZfkI',
  origin: 'https://www.youtube.com',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'www.youtube.com',
  hostname: 'www.youtube.com',
  port: '',
  pathname: '/watch',
  search: '?v=F64yFFnZfkI',
  searchParams: URLSearchParams { 'v' => 'F64yFFnZfkI' },
  hash: '' }
url.format() : https://www.youtube.com/watch?v=F64yFFnZfkI
--------------------------------------------
url.parse() :  Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.youtube.com',
  port: null,
  hostname: 'www.youtube.com',
  hash: null,
  search: '?v=F64yFFnZfkI',
  query: 'v=F64yFFnZfkI',
  pathname: '/watch',
  path: '/watch?v=F64yFFnZfkI',
  href: 'https://www.youtube.com/watch?v=F64yFFnZfkI' }
url.format() :  https://www.youtube.com/watch?v=F64yFFnZfkI

```

취향에 따라 사용 할 수 있음.
책에서는 주소가 host 부분 없이 pathname 부분만 오는 경우, WHATWG 방식은 이 주소를 처리 할 수 없다고 하는데, 
결과 데이터를 보면 조합시 사용 할 수 있을것 같다..(...)
또 다른 점은  search 부분은 ?뒤의 값을 가져오는데, 여기서 WHATWG 경우 searchParams (키 = 값) 형태로 데이터를 가공하여 가져온다. 

여기서 궁금한게 생겼다. JSON 방식과 다른 searchParams 값은 어떻게 가져올까?

```javascript
console.log("searchParams 가져오기 :: " + myURL.searchParams.get('키ID'));
```

로 가져오면 된다.
이런식으로 데이터를 짜르면 즐겁게 가공할수 있다! 자세한건 아래를 보며 더 이야기해보자.

------------------------

### searchParams  조금 더 알아보기(WHARWG 에서만 사용 가능)

```javascript
const { URL } = require('url');

const myURL = new URL('https://www.gilub.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

console.log(myURL);

console.log('searchParams :' , myURL.searchParams);
//키에 해당하는 모든 값을 가져옵니다. 
console.log('searchParams.getAll() : ' , myURL.searchParams.getAll('category')); 
//limit키에 해당하는 값중 첫번째 값만 가져옵니다.
console.log('searchParams.get() : ', myURL.searchParams.get('limit')); 
//파라미터속 키 값이 있는지 조회합니다.
console.log('searchParams.has() : ' , myURL.searchParams.has('page')); 

// searchParams 키를 모두 iterator 문법의 객체로 가져옵니다.
console.log('searchParams.keys() : ' , myURL.searchParams.keys()); 
// searchParams 값을 모두 iterator 문법의 객체로 가져옵니다.
console.log('searchParams.values() : ' , myURL.searchParams.values()); 

myURL.searchParams.append('filter' , 'es3'); 
//filter라는 키에 es3라는 값을 넣어줍니다. 같은 키가 있다면 유지하고 하나를 더 추가합니다.
myURL.searchParams.append('filter' , 'es5');

//filter라는 키에 해당하는 모든 값을 가져옵니다.
console.log(myURL.searchParams.getAll('filter')); 

//filter라는 키에 있는 이전 데이터를 모두 지우고 << 중요 >> es6를 넣어줍니다.
myURL.searchParams.set('filter' , 'es6'); 
//filter라는 키를 모두 가져옵니다.
console.log(myURL.searchParams.getAll('filter')); 

myURL.searchParams.delete('filter'); //filter키에 들어 있는 값을 모두 지웁니다. 
console.log(myURL.searchParams.getAll('filter'));

 //조작한 serchParams 객체를 다시 문자열로 만듭니다.
console.log('searchParams.toString : ' , myURL.searchParams.toString());
 // 이 문자열을 myURL.search에 반영하면 주소 객체에 반영됩니다.
myURL.search = myURL.searchParams.toString();

```

정리한 내용은 표로 확인 해보자.

| 메서드         | 설명                                                         |
| -------------- | ------------------------------------------------------------ |
| getAll(키)     | 키에 해당하는 모든 값을 가져옵니다.                          |
| get(키)        | 키에 해당하는 첫번째 값만 가져옵니다.                        |
| has(키)        | 키가 실제하는지 아닌지를 검사합니다.                         |
| keys()         | searchParams의 모든 키를 반복기(iterator) 객체로 가져옵니다. |
| values()       | searchParams의 모든 값을 반복기(iterator) 객체로 가져옵니다. |
| append(키, 값) | 해당 키를 추가합니다. 같은 키의 값이 있다면 삭제하지 않은체 유지하며 하나를 더 추가시킵니다. |
| set(키, 값)    | 이전 키를 모두 지우고, 해당 키를 추가합니다. (단일)          |
| delete(키)     | 해당 키를 제거합니다.                                        |
| toString()     | 조작한 searchParams 객체를 다시 문자열로 만듭니다.           |

이걸로 Wharwg에서는 URL을 가공 할 수 있다.

---------------------------------

### querystring (이전 노드 방식 으로 가공하기)

이전 노드방식으로 가공할때는 Search 부분을 사용하기 쉽게 객체로 만드는 방법은 다음과 같다. 

```javascript
const url = requite('url');
const querystring = require('querystring');

const parseUrl = url.parse('https://www.gilub.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

//url query 부분을 자바스크립트 객체로 분해한다 (JSON)
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse() : ' , query);
query.page = '5'; // 값 바꾸기
console.log('querystring.parse() : ' , query); //바꾼값 확인하기

//분해된 query 객체를 다시 문자열로 조립한다.
console.log('querystring.stringify() : ' , querystring.stringify(query));

```

이게 더 쉽다 ㅡㅡ;;;

