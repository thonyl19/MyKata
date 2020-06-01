var cheerio = require("cheerio");
import * as iconv from 'iconv-lite';
var superagent = require('superagent');
var charset = require('superagent-charset');
import * as  _ from 'lodash';

charset(superagent);
var Charset = {
    'utf8': 'utf8'
	, 'big5': 'big5'
	//, 'ascii': 'ascii'
	, 'win1251': 'win1251'
};

var args = {
    Url:'http://just2.entrust.com.tw/z/zc/zca/zca.djhtm?a=2002'
    ,Sel:'title'
}

var args1 = {
    Url:'https://tw.stock.yahoo.com/d/i/rank.php?t=up&e=tse&n=30'
    ,Sel:'title'
}

var Test= {
	Args: {
        Url: "https://tw.stock.yahoo.com/s/list.php?c=tse"
		, FilePath: "x\\Yahoo_tse.html"
		, CharSet: '212'
	}
	, selector: function ($) {
		var $1 = $('th:contains("股票代號")').parents('table');
		return $('<div>').append($1).html();
    }
}

let fn = (code)=>{
    return new Promise((resolve, reject)=> {
        superagent
            .get(args.Url)
            .charset(code) //这里设置编码
            .end(function(err, res){
                //console.log(res);
                var $ = cheerio.load(res.text,{ decodeEntities: false });
                var _val = $(args.Sel).text();

                console.log(_val);
                console.log($.html(args.Sel));
                resolve($.html(args.Sel))
            });
    })
}


var xfn_1 = ()=>{
    var arr =[];
    _.map(Charset,(v,k)=>{
        arr.push(fn(v));
    })
    Promise.all(arr).then(val=>{
        console.log(val);
    })
}
xfn_1();
 