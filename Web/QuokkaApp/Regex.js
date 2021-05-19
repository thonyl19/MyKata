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
    gen(reg, list = list_number) {
        var arr = []
        _.each(list, (e) => {
            arr.push({ val: e, test: e.match(reg) });
        })
        arr;
    },
    '解析 %(1.5'() {
        var _reg = /(|[0-9]+%)\(([0-9]+|)(\.[0-9]+|)$/g;
        var _list = [
            '移植到 2019 版 20%(1',
            '移植到 2019 版 20%(1.5',
            '移植到 2019 版(1.5',
            '移植到 2019 版(1'
        ];

    },
    '正負數,小數'() {
        var _reg = /(\-|\+)?\d+(\.\d)?$/g;
        fn.gen(_reg)
    },
    '有兩位小數'() {
        //https://kknews.cc/code/65y4v9v.html
        //不正確
        var _reg = /^[0-9]+(.[0-9]{2})?$/g;
        fn.gen(_reg);
    },
    'm-n位的數字'() {
        var _reg = /^\d{1,3}$/g;
        fn.gen(_reg);
    },
    '漢字'() {
        //https://kknews.cc/code/m2pox22.html
        var _reg = /^[\u4e00-\u9fa5]{0,}$/g;

    },
    'Email地址'() {
        var _reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
    },
    '手機號碼'() {
        //"XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX
        //var _reg = /^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$/g;
    },
    '處理逸脫字元'() {
        /*
            https://codereview.stackexchange.com/questions/153691/escape-user-input-for-use-in-js-regex
            將  reg 字串, 轉換成 相應的 逸脫字元 表示式 (escaped)

        */
       return ;
        var fn = {
            pattern: RegExp("[" + "{}[]-/\\()*+?.%$|".replace(RegExp(".", "g"), "\\$&") + "]", "g"),
            dispatch: {
                '{': true,
                '}': true,
                '[': true,
                ']': true,
                '-': true,
                '/': true,
                '\\': true,
                '(': true,
                ')': true,
                '*': true,
                '+': true,
                '?': true,
                '.': true,
                '^': true,
                '$': true,
                '|': true
            },
            sanitize_for_regex_v1(val) {
                return val.replace(fn.pattern, "\\$&");
            },
            sanitize_for_regex_v2(val) {
                var escaped = "";
                for (var i = 0; i !== val.length; ++i) {
                    if (fn.dispatch[val[i]]) {
                        escaped += "\\";
                    }
                    escaped += val[i];
                }
                return escaped;
            }
        }
            

        var v1 = fn.sanitize_for_regex_v1("\t");
        var _reg_v1 = new RegExp(v1, 'gi');
        alert('1\t2'.replace(_reg_v1, ','));

        var v2 = fn.sanitize_for_regex_v2("\t");
        var _reg_v2 = new RegExp(v2, 'gi');
        alert('1\t2'.replace(_reg_v2, ','));
    },
    '?取得\t,不work'(){
        //var _reg = /\\t/i;
        var _reg = /\^\\t+/gm;
        var x = `
            For more information,          see Chapter 3.4.5.1`;
        var z = x.match(_reg);
        z
    },
    'Regex 使用變數'(){
        new RegExp(`\d{${YOUR_VALUE_GOES_HERE}}`, 'igm');
    },
    '*case'(){
        var reg = new RegExp('(|^\t|\s)+','g');
        var s = `ddl_Route: {
            src: [],
            
            old: "",
        },
				//#_[Vue_Data]
                            //#_[Vue_Data]`;
        var point = s.match(/(|\t)(.)+(##|#_)/g);
        _.each(point,(v,k)=>{
            v
            var [x] = v.match(/(|\t|\s)+/g);
			console.log(`${x}A`);
        })
    

    }
}

_.each(fn, (e, k) => {
    if (k.substr(0, 1) == "*") {
        e();
    }
})