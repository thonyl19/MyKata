/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/

import * as _ from 'lodash';
import Mock from 'mockjs';
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
    'A01'() {
        var x = Mock.mock({
            'number1|1-100.1-10': 1,
            'number2|123.1-10': 1,
            'number3|123.3': 1,
            'number4|123.10': 1.123
        })
        x;
    },
    '@title'() {
        /*
        1.使用 @title 參數,亂數產生 10資料
        2.使用 @title(n) 函數,亂數產生 1筆 n個字組的資料
        
        */
        var x = Mock.mock({
            'arr|10': ['@TITLE']
        });
        x
        var x1 = Mock.mock('@title(5)');
        x1
    },
    A021() {
        return Mock.mock({
            'arr|10': [
                '@integer(60, 100)'
            ]
        })
    },
    A022(){
        var _op = {};
        _op[`arr|${10}`] = ['@integer(60, 100)']
        var x =  Mock.mock(_op);
        x;
    },
    A03() {
        var x =  [{a:1}, ...Mock.mock({
            'data|5': [{
                p: '@name'
            }]
        }).data];
        x;
    },
    A031() {
        var x =  Mock.mock({
            'data|5': [{
                p: '@string'
            }]
        });
        x
    },
    A032() {
        return Mock.mock({
            'data|5': [{
                id: '@id',
                name:'@name',
                mail: '@EMAIL',
            }]
        });
    },
    _x(){
        var z = Mock.mock({
            "array|1-10": [
              {
                "name|+1": [
                  "Hello",
                  "Mock.js",
                  "!"
                ]
              }
            ]
          });
        z
    }
}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="_"){
        e();
    }
})