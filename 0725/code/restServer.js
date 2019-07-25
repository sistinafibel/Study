const http = require('http');
const fs = require('fs');

const users = {}; //오브젝트 선언

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
                return res.end(JSON.stringify(users));
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

        //POST 처리 start
        else if (req.method === 'POST') {
            if (req.url === '/users') { //POST 메서드 상태에서 users 호출
                let body = '';

                console.log(req.data.name);
                console.log(req);

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

        //PUT 처리 start
        else if (req.method === 'PUT') {
            if (req.url.startsWith('/users/')) {
                const key = req.url.split('/')[2];
                let body = '';
                req.on('data', (data) => {
                    body += data;
                });
                return req.on('end', () => {
                    console.log('PUT 본문(Body):', body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users));
                });
            }
        }
        //PUT 처리 END

        //DELETE 처리 start
        else if (req.method === 'DELETE') {
            if (req.url.startsWith('/users/')) {
                const key = req.url.split('/')[2];
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }
        //DELETE 처리 end

        //그외 문제 발생시.
        res.writeHead(404, 'NOT FOUND');
        return res.end('NOT FOUND');
    })
    .listen(8085, () => {
        console.log('8085번 포트에서 서버 대기중입니다');
    });