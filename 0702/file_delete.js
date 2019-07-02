const fs = require('fs');

// 파일삭제
fs.unlink('file02_sync.txt',function(error, data) {
    if(error){
        throw error;
    }
    console.log('파일 삭제 성공');
})
