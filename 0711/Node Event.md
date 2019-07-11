### Node Event

노드는 대부분의 이벤트를 비동기 방식으로 처리함. 즉 콜백과 비슷한 형태지만
콜백 함수의 경우 비동기식 함수에서 결과를 반환하여 호출하지만, 이벤트는 '옵저버 패턴'을 통해 작동된다.

옵저버 패턴이란?
객체의 상태 변화를 관찰하여 객체에서 상태변화가 있을때마다 각 옵저버로 통지하도록 하는 디자인 패턴.

----

노드에서는 이벤트를 보내고 받기위해 EventEmitter를 사용하는데, 노드의 객체는 EventEmitter를 상속 받을 수 있다. 상속 받은 뒤 EventEmitter 메소드를 사용하여 객체의 이벤트를 받을 수 있음.

EventEmitter 메소드

| 메소드명                           | 설명                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| on(event , listener)               | 지정한 이벤트 리스너를 추가한다.                             |
| once(event , listener)             | 지정한 이벤트 리스너를 추가하고 한번 실행되면 그 리스너를 제거한다. |
| removeListener(event, listener)    | 지정한 이벤트에 대한 리스너를 제거한다.                      |
| addListner(eventName,eventHandler) | 이벤트를 연결한다.                                           |
| removeAllListeners([eventName])    | 모든 이벤트 리스너를 제거한다.                               |

---

process이벤트 발생 확인하기 

```javascript
process.on('exit',function(){
    console.log('exit 이벤트 발생함');
});

// process 객체는 노드에서 언제든지 사용할 수 있는 객체, 이미 내부적으로 EventEmitter 를 상속받도록 만들어져 있어 on() emit()메소드 바로 사용 가능 
setTimeout(function(){
    console.log('시스템 종료 시도함');
    process.exit();
},3000);
```

process 객체 자체가 내부적으로 EventEmitter를 상속받도록 만들어져있음.

----

on 사용하여 연속 이벤트 확인하기

```javascript

// 직접 만든 이벤트 전달 처리
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});

setTimeout(function(){
    console.log('2초 후에 tick 이벤트 전달을 시도함');
    process.emit('tick','2'); //이벤트 호출 용도
    process.emit('tick','2'); //이벤트 호출 용도
},2000);

```

tick Event 생성하고 process.on 메소드를 이용하여 이벤트를 등록하면 이 메소드를 호출하면서 파라미터로 전달한 tick 이벤트가 발생했을 때 그다음에 나오는 콜백 함수가 실행.

여러번 실행하면 실행하는 대로 이벤트가 캐치되는것을 확인 할 수 있다.

----

once 사용하여 이벤트 확인하기

```javascript
process.once('tick2',function(count){
    console.log('tick Event Occur : %s',count);
});

setTimeout(function(){
    console.log('2초 후에 tick 이벤트 전달을 시도함');
    process.emit('tick2','3'); //이벤트 호출 용도
    process.emit('tick2','3'); //이벤트 호출 용도 한번 더 호출해도 호출되지 않음.
},2000);
```

once는 단일 한번만 사용하여 호출하는것으로, 한번 실행된뒤 emit로 다시 호출하여 호출되지 않음을 확인 할 수 있다.

----

노드의 이벤트 갯수 제한

Node에서는 한가지 이벤트에 10개가 넘는 이벤트 리스너가 걸리면 오류로 간주함.
이 경우 setMaxListeners(늘릴값)으로 설정이 가능하다.

```javascript
//이벤트 발생 개수해제
//process.setMaxListeners(20);
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});

setTimeout(function(){
    process.emit('tick','2'); //이벤트 호출 용도
},2000);

...
오류 발생함.
```



----

### 참조

https://javafa.gitbooks.io/nodejs_server_basic/content/chapter7.html
https://imcreator.tistory.com/62

