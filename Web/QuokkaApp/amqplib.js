/*
[Ref]
https://www.npmjs.com/package/amqplib
*/
import * as _ from 'lodash';
import path from "path";
var q = 'tasks';
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
        '_'(){ 
            var x = `{A:1}`
            var _t = _base.JsonCode.v20200609V2("1243");
            //var _t1 = _t.toJsonStr();
            _t;
            var _t1 = _t.isObj;
            _t1
        },
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})()