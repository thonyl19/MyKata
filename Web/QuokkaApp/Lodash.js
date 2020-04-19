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
var fn = {
    gen(reg,list=list_number){
        var arr = []
        _.each(list,(e)=>{
           arr.push({val:e,test:e.match(reg)});
        })
        arr;
    },
    '_assignInWith'(){
        var a = {a:1,c:3,z:{z1:1,z3:3}};
        var b = {a:-1,b:2,z:{z1:-1,z2:-1}}
        var c = [
            _.assignInWith({},a,b),
            _.assignWith({},a,b),
            _.assignIn({},a,b),
            //既有的不會被覆蓋一,沒有的項目會添加進去 
            _.defaultsDeep({},a,b),
            //既有的會被覆蓋一,沒有的項目會添加進去 
            _.merge({},a,b),
            
        ];
        c
    }
}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="_"){
        e();
    }
})