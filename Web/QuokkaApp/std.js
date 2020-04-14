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
    '正負數,小數'(){
        var _reg = /(\-|\+)?\d+(\.\d)?$/g;
        fn.gen(_reg)
    },
}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="_"){
        e();
    }
})