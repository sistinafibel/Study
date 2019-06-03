## 프로미스 & Async / Awit 


예제 1 - 콜백이 아닌 상태

```javascript
// #1
console.log('Hello');
// #2
setTimeout(function () {
    console.log('Bye');
}, 3000);
// #3
console.log('Hello Again');
```

예제 2 - 콜백 함수

```javascript
function getData(callbackFunc) {
    setTimeout(function () {
        console.log('실행 유무 확인');
        callbackFunc("돌려줄 리턴값!");
    }, 3000);
}


getData(function (tableData) {
    console.log("tete" + tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

예제 3 - 프로미스 생성

```javascript
//프로미스 생성
const promise1 = function(param){
    console.log("param : " + param);
    return new Promise(function(resolve,reject){ //프로미스 생성
        if(param){
            resolve("true :: 성공");
        }
        else{
            reject("false :: 실패");
        }
    });
}

//생성2 function = const 동일방법임.
function promise2(param){
    console.log("param2 : " + param);
    return new Promise(function(resolve1,reject1){ //프로미스 생성
        if(param){
            resolve1("true2 :: 성공");
        }
        else{
            reject1("false2 :: 실패");
        }
    });

}

//프로미스 실행
promise2(true).then(function(resolve){ 
    console.log(resolve);//성공
},function(reject){
    console.log(reject);//실패
});

```

예제 4 - 여러개의 프로미스 실행

```javascript
const param = true;
const promise1 = new Promise(function(resolve,reject){
    if(param){
        resolve("성공");
    }
    else{
        reject("실패");
    }
});
const promise2 = new Promise(function(resolve,reject){
    if(param){
        resolve("성공2");
    }
    else{
        reject("실패2");
    }
});
Promise.all([promise1,promise2]).then(function(values){
    console.log("1,2,3 모두완료",values);
});
```

예제 5 - async / awit 적용전

```javascript
  async function test(){
      await foo(1, 2000)
      await foo(2, 500)
      await foo(3, 1000)
  }

function foo(num, sec){
    setTimeout( function(){
        console.log(num);
    }, sec);
}

test();
```

예제 6 - async / awit 적용후

```javascript
async function test(){
    await foo(1, 2000)
    await foo(2, 500)
    await foo(3, 1000)
}

function foo(num, sec){
    return new Promise(function(resolve, reject){
        setTimeout( function(){
            console.log(num);
            resolve("async는 Promise방식을 사용합니다.");
        }, sec);
    });
}
test();
 
```

