/*
[Ref]
https://lodash.net/docs/4.16.1.html
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
    'assignInWith'(){
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
    },
    'union'(){
        /*
        把數組組合成一個陣列 ,並剔除重覆值
        */
        var r = _.union([3,5,1], [1, 2]);
        r
    }
}

var Function = {
    'curry'(){
        var abc = function(a, b, c) {
            return [a, b, c];
          };
           
          var curried = _.curry(abc);
        
          var arr = [
              curried(1)(2)(3),
              curried(1, 2)(3),
              curried(1, 2, 3),
              curried(1)(3)(2)
          ]
        arr;
    },
    '_defer'(){
        var _fn = (text)=>{
            console.log(text);
        }
        _.defer(function(text) {
            console.log(text);
        }, 'deferred',"A");
    },
    'delay'(){
        _.delay(function(text) {
            console.log(text);
          }, 5000, 'later');
    },
    
}

_.each([Function,fn],fn=>{
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="_"){
            e();
        }
    })
})