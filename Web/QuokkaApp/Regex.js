import * as _ from 'lodash';
var fn = {
    '解析 %(1.5'(){
        var _reg = /(|[0-9]+%)\(([0-9]+|)(\.[0-9]+|)$/g;
        var _list = [
            '移植到 2019 版 20%(1',
            '移植到 2019 版 20%(1.5',
            '移植到 2019 版(1.5',
            '移植到 2019 版(1'
        ];
        var arr = []
        _.each(_list,(e)=>{
           arr.push([e,e.match(_reg)]);
        })
        arr;
    },
    '正負數,小數'(){
        var _reg = /(\-|\+)?\d+(\.\d)?$/g;
        var _list = [
            '100.1',
            '100',
            '-100',
            '-100.1',
        ];
        var arr = []
        _.each(_list,(e)=>{
           arr.push([e,e.match(_reg)]);
        })
        arr;
    },
    '_有兩位小數'(){
        //https://kknews.cc/code/65y4v9v.html
        //不正確
        var _reg = /^[0-9]+(.[0-9]{2})?$/g;
        var _list = [
            '100.1',
            '100',
            '-100',
            '-100.1',
        ];
        var arr = []
        _.each(_list,(e)=>{
           arr.push([e,e.match(_reg)]);
        })
        arr;
    },

}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="_"){
        e();
    }
})