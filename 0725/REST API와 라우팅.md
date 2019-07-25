## REST API와 라우팅

서버에 요청을 보낼때는 주소를 통해 요청의 내용을 보낸다. 주소가 /index인 경우 서버 컨트롤러에서 index를 요청한다는 의미이고, about이면 about을 보내달라는 뜻이다.

요청을 받는다고 항상 동일한 페이지를 보내지는 않으며, 꼭 페이지가 아닌 json이나 로직 관련 분기를 태우는 경우도 있다. (ex, 회원가입 서브밋시 돌아가는 컨트롤러 등)

### RESTAPI

REST API(Representational State Transfer)는 소프트웨어 아키텍처의 한 종류로 서버에 대한 자원을 정의하고, 자원에 대한 주소를 지정하는 방법을 가르킨다. 주소는 간결하고 기능에 대한 명사로 구성되어 있다. (/user -> 유저 정보 , /post -> 게시글 관련 자원 요청)

RESTAPI는 주소만 받아서 사용하는게 아닌 HTTP 요청 메소드도 같이 사용하여 분기처리를 하는데, 일반적으로 5개의 주요 요청 메소드를 사용한다.

| 요청메소드명 | 요청메소드설명                                               |
| ------------ | ------------------------------------------------------------ |
| GET          | 서버 자원을 가져올때 사용하는 메소드로 요청에 본문 데이터를 <br />넣지 않고 데이터를 서버로 보내는 경우 쿼리 스트링을 사용한다. (?다음부분&변수=값&변수)  / 사용자 조회 |
| POST         | 서버에 자원을 새로 등록할때 사용하는 메소드로 요청 본문에 새로 등록할 데이터를 포함하여 전송한다. / 사용자 등록 |
| PUT          | 서버의 자원을 요청에 들어있는 자원으로 치환하고자 할때 사용한다. 요청의 본문에 치환할 데이터를 넣어 보냄. / 사용자 정보 수정 |
| PATCH        | 서버의 자원의 일부만 수정하고자 할때 사용한다. 일부 수정할 데이터를 요청할 본문에 넣어서 보냄. / 사용자 정보 수정 (PUT과 유사하지만 PUT은 자원 전체 데이터를 수정 할때 사용하고, PATCH는 일부를 교체한다는 점) |
| DELETE       | 서버의 자원을 삭제할때 사용한다. / 사용자 정보 삭제          |

URL에는 정보에 자원에 대한 내용만 남아야한다는 점, 
자원에 대한 행위(삭제나 등록등)은 모두 HTTP MetHod로 표현하는게 중요하다.

예시)
GET : /board/1  -> 페이지 1의 board를 호출한다.

REST API 방식을 사용하며 좋은 점.
HTTP프로토콜을 사용하는 클라이언트는 누구든 상관 없이 서버와 통신이 가능하다.
모두 동일한 주소로 요청을 보내고 받을 수 있음 (구조에 따라 다르지만, 서버와 클라이언트가 분리 되었다는 점에 초점)  여기서 REST API 방식을 따르는 서버를 RESTful 서버라 부름.

### 실제 REST API 서버 구현해보기

| HTTP메서드 | 주소                | 역활                                 |
| ---------- | ------------------- | ------------------------------------ |
| GET        | /                   | 메인 페이지인 index.html 페이지 제공 |
| GET        | /users              | users목록 제공                       |
| POST       | /users              | 사용자 등록                          |
| PUT        | /users/사용자아이디 | 사용자아이디 업데이트                |
| DELETE     | /users/사용자아이디 | 사용자 아이디 제거                   |

브라우저에서 날라오는 메서드는 req.method를 통해 확인 할 수 있음.
GET 처리를 먼저 진행해보면 다음과 같이 할 수 있다.

```javascript
http.createServer((req, res) => { //서버 시작
    //GET 처리 start 
        if (req.method === 'GET') {
            if (req.url === '/') { // 아무것도 타지 않은 상태로 접속시
                return fs.readFile('./restFront.html', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    res.end(data);
                });
            }else if (req.url === '/users') { //usrl 접속시
                return res.end(JSON.stringify(users)); //JSON으로 데이터를 뿌려준다.
            }
            return fs.readFile(`.${req.url}`, (err, data) => { //특정 html 파일 접속시.
                if (err) {
                    res.writeHead(404, 'NOT FOUND');
                    return res.end('NOT FOUND');
                }
                return res.end(data);
            });
        } 
        //GET 처리 end 
}
```

req.method에서 GET을 가져올시 req.url로 이용자가 요청한 URL 파라미터를 확인한다. 아무것도 타지 않은 상태에서는 /만 표시되며, users를 접속시에는 JSON으로 데이터를 표출시켜서 브라우저에 전송하게 된다.

맨 하단을 보면 fs.readFile을 통해 특정 html도 지원하고 있는데, 모든 조건에서 넘어가지 않을시 오류가 발생하여
404error를 표출하게 된다.

### Post로 게시글 등록하기

```javascript
//POST 처리 start
else if (req.method === 'POST') {
    if (req.url === '/users') { //POST 메서드 상태에서 users 호출
        let body = '';
        req.on('data', (data) => { //옵저버로 req에 있는 data를 조회하여 그 데이터를 body에 포함시킴. -> 이벤트 리스너에 등록해야 그 데이터를 받을 수 있음.
            body += data;
        });
        return req.on('end', () => { 
            console.log('POST 본문(Body):', body);
            const {
                name
            } = JSON.parse(body);
            const id = +new Date();
            users[id] = name;
            res.writeHead(201);
            res.end('등록 성공');
        });
    }
}
//POST 처리 end
```

req.method 에서 POST 요청이 날라올시 GET과 동일한 방식으로 url을 검증 한 다음, 다음과 같은 조건 분기를 타게 된다.
이후 req.on에 등록된 이벤트 리스너를 사용해서 데이터를 받게 된다.



### 참조

https://meetup.toast.com/posts/92

https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/