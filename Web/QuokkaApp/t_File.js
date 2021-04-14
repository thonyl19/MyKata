/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/
import * as _ from 'lodash';
var fs=require("fs");
var encoding = require("encoding");
var jschardet = require("jschardet");
const chardet = require('chardet');
(()=>{
    var _filePath = path.join(__dirname,'./_demo.xlsx');
    
    var _base = {
        JsonCode:{
            v20200609(val,isZip=false){
                var _r ={
                    _:null,
                    isObj:false,
                    isZip,
                    get val(){
                        return this._;
                    },
                    set val(o){
                        this._ = o;
                        try {
                            if (_.isString(o)){
                                this._ = JSON.parse(o);
                                this._
                            }
                        } catch (error) {
                            
                        }
                        this.isObj = _.isPlainObject(this._);
                    },
                    toJsonStr(isZip=this.isZip){
                        if (this.isObj){
                            var _r  = isZip
                                ? JSON.stringify(this._)
                                : JSON.stringify(this._,null,'\t');
                            return _r;
                        }
                        return null;
                    }
                }
                _r.val = val;
                return _r;
            },
            v20200609V2(val,isZip=false){
                var _r ={
                    json:null,
                    get isObj(){
                        this.json = null;
                        try {
                            if (_.isPlainObject(this.val)){
                                this.json= this.val;
                            }else if (_.isString(this.val)){
                                this.json = JSON.parse(this.val);
                            }else{
                                return false;
                            }
                            return  true;
                        } catch (error) {
                            
                        }
                        return false;
                    },
                    isZip,
                    val
                }
                return _r;
            }
        }
    }


    var fn = {
        'save_utf8'(){ 
            var data="echo Hello 中文字\r\npause";     //在 Windows 中跳行須用 \r\n
            fs.writeFile("./test~.bat", data, "UTF8", function(err) {
                if (err) throw err;
                console.log("檔案寫入操作完成!");
            })
        },
        '*save_ASCII'(){ 
            var s="echo Hello 中文字\r\npause\r\ntest~.bat";  
            var info = jschardet.detect(s);
            info
            //info.encoding
            var resultBuffer = encoding.convert(s, "ascii", "UTF-8");
            var x = chardet.analyse(Buffer.from(s));
            x
            fs.writeFile("./test~.bat", resultBuffer, "UTF-8", function(err) {
                if (err) throw err;
                console.log("檔案寫入操作完成!");
            })
        },
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})()