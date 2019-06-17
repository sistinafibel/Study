const string = 'abc';
const object = {
    test1: {
        test2:{
            key2 : 'value',
            test3: {
                key3 : 'value2',
            },
        },
    },
};


console.time('전체 시간');

console.log("콘솔 로그 111");
console.error("콘솔 에러 메세지");


console.count("테스트 카운트");
console.count("테스트 카운트");
console.count("테스트 카운트");

console.dir(object , {colors : true , depth: 2});
console.dir(object , {colors : false , depth: 5});


test();

function test(){
    console.trace('에러 위치 추적');
}

console.timeEnd('전체 시간');


