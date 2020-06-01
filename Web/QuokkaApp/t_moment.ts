import  * as moment from 'moment'; 
var fs = require('fs');


var TestAll:any = {};
TestAll.T01 = (()=>{
    var s = moment().format('_YYYY-MM-DD HH:mm:ss');
    s;
})
TestAll.T02 = (()=>{
    var dir = 'Auto/20010101';
    var x = fs.existsSync(dir);
    if (x == false){
        fs.mkdirSync(dir);
    }
    x;
    
})()

