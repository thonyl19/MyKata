(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        root.returnExports = factory(root.jQuery, root.Vue);
    }
}(this, function ($, Vue) {
    var PropDef = {
        FullType(def=null){
            return {
                validator(){
                    return true;
                },
                //type: [String,Boolean,Array,Object,Number,Function,Date],
                default: def
            };
        },
        FunEnable() {
            return {
                type: [Boolean, Function],
                default: false
            };
        },
        FunAppend() {
            return {
                type: [Object, Function],
                default(){return null;}
            };
        },
        Fun() {
            return {
                type: Function,
                default(cb) {
                    console.log('Fun()');
                    if (typeof (cb) == "function") cb();
                }
            };
        }
    }

    var _URL = {
        get baseURL() {
            if (window['gUTApp'] != null) {
                let { baseURL } = window['gUTApp'];
                return baseURL;
            }
            return "";
        },
        /**
         * @param {any} newPath
         * @param {any} newParams 
         * 以3態模式設計 , 0-boolean)預設,保留當前 url 的參數 
         * , 1-null)回傳值不包含 params 
         * , 2-PlanObject)以 PlanObject 模式,傳回新的 params
         */
        chg_Path(newPath, newParams = false) {
            var _url = new URL(location);
            _url.pathname = `${_URL.baseURL}${newPath}`;
            switch (typeof (newParams)) {
                case "boolean":
                    _url.search = "";
                    break;
                case "object":
                    if (newParams == null) {
                        return `${_url.origin}${_url.pathname}`
                    } else {
                        var _params = new URLSearchParams(newParams);
                        _url.search = `?${_params.toString()}`
                    }
                    break;
            }
            return _url.toString();
        }
    }

    var _base = {
        JsonCode:{
            v20200609(val,isZip=false){
                var _r ={
                    _:null,
                    isObj:_.isPlainObject(val),
                    isZip,
                    get val(){

                    },
                    set val(o){
                        this._ = o;
                        try {
                            if (_r.isObj==false && _.isString(val)){
                                this._ = JSON.parse(val);
                            }
                        } catch (error) {
                            
                        }
                        this.isObj = _.isPlainObject(this._);
                    },
                    
                }
                
                return _r;
            }
        }
    }

    var _UT = {
        JsonCode(val,isZip=false){
            var _r ={
                isObj:_.isPlainObject(val),
                isZip,
                val,
                toJsonStr(isZip=this.isZip){
                    if (this.isObj){
                        return  isZip
                            ? JSON.stringify(this.val)
                            : JSON.stringify(this.val,null,'\t');
                    }
                    return null;
                },
                //這段程序是偷懶用,必須要有 $pw_fn 
                Act(fn_filedObj){
                    let {parse_row,parse_cols} = Vue.prototype.$pw_fn ??{}
                    if (parse_row == null) alert('找不到 $pw_fn')
                    let _act = this.isObj 
                        ? parse_row
                        : parse_cols
                        ;
                    return _act(this.val,fn_filedObj);
                }
            }
            try {
                if (_r.isObj==false && _.isString(val)){
                    _r.val = JSON.parse(val);
                    _r.isObj = true;
                }
            } catch (error) {
                
            }
            return _r;
        },
        JsonCodeV2(val,isZip=false){
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
        }
    }

    if (Vue != null) {
        Vue.prototype.$PropDef = PropDef;
        Vue.prototype.$URL = _URL;
        Vue.prototype.$UT = _UT;
    }
}));
