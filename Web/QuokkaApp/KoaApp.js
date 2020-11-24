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

var KoaRouterApp = {
    map_crud:{
        c:'post',
        r:'get',
        u:'patch',
        d:'delete'
    },
    Mode_A(_modeA){
        _.each(_modeA,(grp)=>{
            _.each(grp,(Funs,verb)=>{
                _.each(Funs,(fn,url)=>{
                    console.log(`${verb}-${url}`)
                    //router[verb](`/api/${url}`,fn);
                })
            })
        })
    },
    Mode_C(rootGrp){
        _.each(rootGrp,(root,rootName)=>{
            KoaRouterApp.Mode_B(rootName,root);
        })
    },
    Mode_B(rootName,root){
        switch(rootName){
            case "/api/":
                _.each(root,KoaRouterApp.Ctrs(rootName))
                break;
            case "/page/":
                _.each(root,KoaRouterApp.Verbs(rootName,""))
                break;
        }
    },
    Ctrs(rootName){
        return (ctrs,ctrName)=>{
            _.each(ctrs,KoaRouterApp.Verbs(rootName,ctrName));
        }
    },
    Verbs(rootName,ctrName){
        return (Verbs,path)=>{
            var _url = `${rootName}${ctrName}${path}`;
            if (_.isFunction(Verbs)){
                switch(rootName){
                    case "/api/":
                        KoaRouterApp.bindVerb(_url)(Verbs,"c");
                        break;
                    case "/page/":
                        KoaRouterApp.bindVerb(_url)(Verbs,"r");
                        break;
                }
            }else{
                _.each(Verbs,KoaRouterApp.bindVerb(_url))
            }
        }
    },
    bindVerb(_url){
        return (fn,crud)=>{
            var _verb =  KoaRouterApp.map_crud[crud];
            //router[_verb](_url,fn);
            console.log(`${_verb}:${_url}`);
        }
    }
}

var fn = {
    'Router_modelA'(){
        /*
            mode A 的用法,是以 Verb 做為確定的分類,再往下展開個 urlpath 和對應程序,
            這樣的工作最直接 好處是,Verb 的定義明確,但是缺點就是 urlpath 會大量的重覆,
            例如 同樣是 user/id/:id 有 get/delete ,就必須分開寫, 過於重工
        */
        var x = [
            {
                get:{'employe'(){}},
                post:{'id/:id'(){
                    }
                }
            }
        ]
        KoaRouterApp.Mode_A(x);
    },
    '*Router_modelC'(){
        /*
            mode B 主要的改量,就是在模組內, 以 urlPath 做為基礎,
                再往下展開 Verbs , 為了使處理便進一步簡化,就直接以 CRUD 的方式,
                直接做對應綁定相應的 Ver ,讓 Codeing 可以更有效率的展開,
                也降低 Key 錯的可能性
            mode C 的用法,是在 B 的基礎上,加上 Ctr [Controll] 的配置,
        */
       var employe = {
            ''(){},
            'id/:id':{
                c(){},
                r(){}
            }
        }
        var page = {
            ''(){}
            ,async 'id/:id'(){
                return await {};
            }
        }
        var _router = {
            '/api/':{employe},
            '/page/':page
        };
        KoaRouterApp.Mode_C(_router);
    }
}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="*"){
        e();
    }
})

module.exports = {
	KoaRouterApp
};
