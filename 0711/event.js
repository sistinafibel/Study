process.on('exit',function(){
    console.log('exit 이벤트 발생함');
});

// process 객체는 노드에서 언제든지 사용할 수 있는 객체, 이미 내부적으로 EventEmitter 를 상속받도록 만들어져 있어 on() emit()메소드 바로 사용 가능 
setTimeout(function(){
    console.log('시스템 종료 시도함');
    process.exit();
},3000);


// 직접 만든 이벤트 전달 처리
process.on('tick',function(count){
    console.log('tick Event Occur : %s',count);
});
process.once('tick2',function(count){
    console.log('tick Event Occur : %s',count);
});

// tick Event 생성하고 process.on 메소드를 이용하여 이벤트를 등록하면 이 메소드를 호출하면서 파라미터로 전달한 tick 이벤트가 발생했을 때 그다음에 나오는 콜백 함수가 실행 된다. 
setTimeout(function(){
    console.log('2초 후에 tick 이벤트 전달을 시도함');
    
    process.emit('tick','2'); //이벤트 호출 용도
    process.emit('tick2','3'); //이벤트 호출 용도
    process.emit('tick2','3'); //이벤트 호출 용도 한번 더 호출해도 호출되지 않음.
},2000);



