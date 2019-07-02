const fs = require('fs');

//폴더 경로 조회하기
fs.readdir('./', function(error, filelist){
    console.log("filelist ::" + filelist); //파일 리스트 가져오기
    console.log("filelist.length ::" + filelist.length); //파일 사이즈 가져오기

    for(var i=0; i < filelist.length; i++){
        console.log("FileName::" + filelist[i]); //조회할 파일명
        var file_extension = filelist[i].split('.'); //점 기준으로 파일명 자르기

        if(file_extension[1]){
            var data = fs.readFileSync('./' + filelist[i] , 'utf-8');
            console.log("결과 :" + data);
        }else{
            console.log('폴더 디렉토리입니다.');
        }

    }

    console.log("완료");

})

