/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/

import * as _ from 'lodash';
var list_number = [
    '100.11',
    '100',
    '-100',
    '-100.1',
    '-100.11',
    '$100.11',
    '-$100.11',
    '.11',
    '10%',
    '10.1%',
    '-10%',
    '-10.1%',
];
var map_crud={
    c:'post',
    r:'get',
    u:'patch',
    d:'delete'
}
var _model = {
    C(rootGrp){
        _.each(rootGrp,(root,rootName)=>{
            _model.B(rootName,root);
        })
    },
    B(rootName,root){
        _.each(root,_model.Ctrs(rootName))
    },
    Ctrs(rootName){
        return (ctrs,ctrName)=>{
            if (rootName == "/page/"){
                //_.each(ctrs,_model.bindVerb(_url));
            }else{
                _.each(ctrs,_model.Verbs(rootName,ctrName));
            }
        }
    },
    Verbs(rootName,ctrName){
        return (Verbs,path)=>{
            var _url = `${rootName}${ctrName}${path}`;
            if (_.isFunction(Verbs)){
                switch(rootName){
                    case "/api/":
                        _model.bindVerb(_url)(Verbs,"c");
                        //console.log(`post:${_url}`);
                        break;
                    case "/page/":
                        _model.bindVerb(_url)(Verbs,"r");
                        break;
                }
            }else{
                _.each(Verbs,_model.bindVerb(_url))
            }
        }
    },
    bindVerb(_url){
        return (fn,crud)=>{
            var _verb =  map_crud[crud];
            //router[_verb](_url,fn);
            console.log(`${_verb}:${_url}`);
        }
    }
}

var _modelC = {
    init(grpFn){
        _.each(grpFn,_modelC.root);
    },
    root(rootObj,root){
        _.each(rootObj,_modelC.rootObj(root))
    },
    rootObj(root){
        return ()=>{
            _.each()
        }
    },
    
}

var fn = {
    gen(reg,list=list_number){
        var arr = []
        _.each(list,(e)=>{
           arr.push({val:e,test:e.match(reg)});
        })
        arr;
    },
    '_Router_modelC'(){
        var x = {
            '/api/':{employe:{''(){},'id/:id':{c(){},r(){}}}},
            '/page/':{''(){},'id/:id'(){}}
        }
        // _model.B('/api/',x['/page/']);
        //_model.B('/page/',x['/page/']);
        _model.C(x);
    },
}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="_"){
        e();
    }
})