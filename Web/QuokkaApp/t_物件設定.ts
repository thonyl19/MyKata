var request = require("request");
var _ = require('lodash');
import * as fs from 'fs';
var cheerio = require("cheerio");
var iconv = require('iconv-lite');


interface LooseObject {
    [key: string]: any
}
var PObj: LooseObject = {};
 
/*
PObj.玩股網_月營業收入={
    Args: { 
        Url: "http://w.wantgoo.com/Stock/report/basic_mr?StockNo=${No}"
        , FilePath: "x\\玩股網_月營業收入.html"
        , CharSet: '112'
        , No: ""
    }
    ,fn:()=>{}
};
PObj.玩股網_每股盈餘={
    Args : _.defaults({
        Url: "http://w.wantgoo.com/Stock/report/basic_eps?StockNo=${No}"
        , FilePath: "x\\玩股網_每股盈餘.html"
    }, PObj.玩股網_月營業收入.Args)
}

let x1 = _.defaultsDeep({
        Args:{Url:'test'}
    }
    ,PObj.玩股網_月營業收入);

console.log([PObj.玩股網_每股盈餘,PObj.玩股網_月營業收入,x1]);

export let 撿股讚_ROC ={
    Args: {
        Url: "http://stock.wespai.com/p/38849"
        , FilePath: "EPS_ROC.html"
        , CharSet: '112'
        , Selector: "table#example"
    }
}
export let 撿股讚_BF = _.defaultsDeep({
    Args: {
        Url: "https://stock.wespai.com/p/46975"
        , FilePath: "EPS_bf.html"
    }
},撿股讚_ROC);
console.log([撿股讚_ROC,撿股讚_BF]);
*/
var charset = {
    'utf8': 'utf8'
	, 'big5': 'big5'
	, 'ascii': 'ascii'
	, 'win1251': 'win1251'
};
let wfile =async(name,_data,encode=charset.utf8)=>{
    //console.log(_data);
    fs.writeFileSync
        ("D:/A/Code/nodejs_old/NodeApp/quka/"+ name
        , _data
        , encode
        );
        // , function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        //     console.log("The file was saved!");
        // })
}


    request({
      url: "http://just2.entrust.com.tw/z/zc/zca/zca.djhtm?a=2012",
      method: "GET"
    }, function(error, response, body) {
      if (error || !body) {
          console.log(error);
        return;
      }else{
        wfile("test_body.html",body
            ,charset.win1251
        );
          //utf8
        var buf = Buffer.from(body
           ,charset.win1251
           //,charset.utf8
        );
		var _body = iconv.decode
			(buf
            ,charset.utf8 );
        //console.log(body);
        wfile("test_buf.html",_body);
        var _tmp = {
            $: cheerio.load(_body, { decodeEntities: false })
            , charset: charset.utf8
        };
        var _data = 
            //_tmp.$('#mainCol > div.stkAnalysis.clearfix > div.br-trl.clearfix.mb-x1 > table').html()
            _tmp.$('title').text()
            ;
        //console.log(_data);
        wfile("test1.html",_data);
        
      }
    });
  
  //jp();

  