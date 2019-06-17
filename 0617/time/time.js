//화살표 안쓰기
const timeout1 = setTimeout(function(){
    console.log("1.5초 뒤에 실행1");
}, 1500);

//화살표 쓰기
const timeout2 = setTimeout(() => {
    console.log("1.5초 뒤에 실행2");
}, 1500);

const interval = setInterval(() => {
    console.log("1초 마다 실행");
}, 1000);

const timeout3 = setTimeout(() => {
    console.log("실행확인해주세요.");
}, 3000);

setTimeout(() => {
    //timeout3와 Interval를 2.5초 뒤에 제거하도록 구성
    clearTimeout(timeout3);
    //clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
    console.log("즉시 실행한다!!");
});

const immediate2 = setImmediate(() => {
    console.log("이것도 즉시 실행 되나?");
});

//바로 취소했기때문에 실행되지 않음.
clearImmediate(immediate2);