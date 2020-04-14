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
    '整數往前補零'() {
        return (1).toString().padStart(3, '0');
    },
    '數字轉換'() {
        let r = {
            '二進位': (10).toString(2),
            '16進位': (10).toString(16),
        }
        return r;
    },
    '物件複製'() {
        var A = { a: 1, b: 2 };
        var B = { A, c: 3 };
        var C = Object.assign({}, B);
        return JSON.stringify(C, null, 2);
    },
    'addEventListener'() {
        /*
        Ref:https://jsfiddle.net/Linusborg/39ues2rx/
        未完成
        <input type="text">
        <button id="A">Test</button>
        const btn = document.getElementById('A')
        btn.addEventListener('mouseenter', evt => {alert('test')})
        */

    },
    'resizable'() {
        //https://jsfiddle.net/Linusborg/xzjfw8gm/
    },
    isEmptyObj() {
        //_.isEmpty({});
        //$.isEmptyObject(obj)
        //Object.keys(obj).length === 0
    }
}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="_"){
        e();
    }
})