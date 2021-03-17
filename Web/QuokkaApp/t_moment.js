var fs = require('fs');
var _ = require("lodash");
var moment = require("moment");


/*
TestAll.T02 = (()=>{
    
    x;
    
})()
*/
var fn = {
    'format'(){
        var s = moment().format('_YYYY-MM-DD HH:mm:ss');
        s;
    },
    'existsSync'(){
        var dir = 'Auto/20010101';
        var x = fs.existsSync(dir);
        if (x == false){
            fs.mkdirSync(dir);
        }
    },
    '將文字轉成日期物件'(){
        var start_time = "2020-05-28T16:00:00Z";
        var z = moment(start_time).toDate();
        z;
    },
    'offset'(){
        var start_time = Date.now();
        start_time
        var z = moment(start_time).add(1, 'day').toDate();
        z;
    },
    'get toDay'(){
        var z = moment().startOf('day').toDate();
        z;
    },
    'isDate'(){
        var s = "2020-05-28T16:00:00Z";
        var z = moment(s).isValid();
        z;
    }

}

_.each([fn],fn=>{
	_.each(fn,(e,k)=>{
		if (k.substr(0,1)=="*"){
			e();
		}
	})
})
