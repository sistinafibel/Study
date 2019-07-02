### Node.js FS(파일 시스템 )알아보기

노드는 파일 시스템을 관리 할 수 있는 묘듈이 있다.
읽기, 쓰기, 수정등을 사용 할 수 있으며 일반적으로 FS는 비동기 형태로 사용하나 동기 식으로도 사용이 가능하다.

1. 파일읽기

```javascript
// 1. fs(파일시스템) 모듈 사용
var fs = require('fs');

// 2. 비동기방식의 파일읽기. 파일을 읽은 후 마지막 파라미터에 넘긴 callback 함수가 호출
fs.readFile('home.js', 'utf-8', function(error, data) {
	if(error){ //파일이 없다면 에러 발생한다고 드랍 시키기
        console.log('에러발생');
    }else{
        console.log('01 readAsync: %s',data);
    }
});

// 3. 동기방식의 파일읽기. 파일을 읽은 후 data 변수에 저장
var data = fs.readFileSync('home.js', 'utf-8');
console.log('02 readSync: %s',data);
```

파일이 없는 경우 "에러발생"이라는 오류를 발생시키며 프로그램은 대기 상태로 돌아간다.
이 코드의 경우 동기 방식의 파일 읽기 문제로 비동기가 완료되기 전 끝날 수 있음에 따라 테스트시 3번 동기 방식은 주석 처리를 진행하고 테스트를 진행해준다. 

정상적으로 오류가 발생하지 않았다면 펑션속 data에 내용을 모두 담은뒤, 표출해준다.



2. 파일 쓰기

```javascript
var fs = require('fs');

// 1. 새로 생성할 파일에 입력될 문자열
var data = "My first data...\r\nhello there!";

// 2. 비동기 방식으로 파일을 생성. 함수의 인자는 앞에서 부터 순서대로 파일명, 입력데이터, 인코딩, 콜백함수
fs.writeFile('file01_async.txt', data, 'utf-8', function(e){
    if(e){
        // 3. 파일생성 중 오류가 발생하면 오류출력
        console.log(e);
    }else{
        // 4. 파일생성 중 오류가 없으면 완료 문자열 출력
        console.log('01 WRITE DONE!');
    }
});

// 5. 동기방식은 callback 함수를 통한 오류처리를 할 수 없기 때문에 함수전체를 try 문으로 예외처리
try{
    // 6. 동기 방식으로 파일을 생성. 함수의 인자는 앞에서 부터 순서대로 파일명, 입력데이터, 인코딩
    fs.writeFileSync('file02_sync.txt', data, 'utf-8');
    console.log('02 WRITE DONE!');
}catch(e){
    console.log(e);
}
```

 비동기 방식으로 파일을 생성한다. 함수의 인자는 파일명 ,  들어갈 데이터 , 인코딩 , 콜백 함수이며
콜백 이후 오류발생시 오류 정보를 출력한다.

3. 파일 삭제

```javascript
const fs = require('fs');

// 파일삭제
fs.unlink('file02_sync.txt',function(error, data) {
    if(error){
        throw error;
    }
    console.log('파일 삭제 성공');
})

```

파일삭제는 unlink를 사용하여 삭제한다.  오류가 발생하면 error를 리턴하며
정상적으로 파일 삭제시에는 타 오류를 발생시키지 않는다.



4. 폴더 경로 조회해서 모든 파일 출력하기

```javascript
const fs = require('fs');

//폴더 경로 조회하기
fs.readdir('./', function(error, filelist){
    console.log("filelist ::" + filelist); //파일 리스트 가져오기
    console.log("filelist.length ::" + filelist.length); //파일 사이즈 가져오기

    for(var i=0; i < filelist.length; i++){
        console.log("FileName::" + filelist[i]); //조회할 파일명
        var file_extension = filelist[i].split('.'); //점 기준으로 파일명 자르기

        if(file_extension[1]){ //파일인지 폴더인지 구분
            var data = fs.readFileSync('./' + filelist[i] , 'utf-8');
            console.log("결과 :" + data);
        }else{
            console.log('폴더 디렉토리입니다.');
        }

    }

    console.log("완료");
})

```

  readir를 사용하여 폴더에 있는 모든 파일 리스트를 가져온다. 
가져온 다음  filelist.length를 사용하여 배열 길이를 for문에 태워서 모든 파일을 조회한다.

readdir는 폴더와 파일 전부 가져오기 때문에 split를 사용하여 폴더와 파일을 구분해준다.