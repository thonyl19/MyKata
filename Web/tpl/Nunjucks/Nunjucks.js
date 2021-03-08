/*
[Ref]
https://nunjucks.bootcss.com/
*/
import * as _ from 'lodash';
import path from "path";
const nunjucks = require('nunjucks');
nunjucks.configure('Nunjucks', { autoescape: true });
const fs = require('fs');
(()=>{
    var _tmp = {
        base:`<h1>Hello {{ name }}</h1>`,
        array:`{% for key, val in food %}
                    Use [key]{{ key }} of {{ val }}
                {% endfor %}`,
        array_解構:`{% for x, y, z in points %}
                Point: {{ x }}, {{ y }}, {{ z }}
            {% endfor %}`
    }
    var fn = {
        save(data,filename="test.txt"){
            fs.writeFileSync(`./Nunjucks/${filename}`,data,'utf-8');
        },
        '讀入 template'(){
            var s = nunjucks.render('Nunjucks_t1.njk', { name: 'nunjucks' });
            s
            //fn.save(s,"Nunjucks_t1.txt")
        },
        'T02'(){
            var s = nunjucks.render('Nunjucks_t2.njk', { name: 'nunjucks' });
            s
            //fn.save(s,"Nunjucks_t2.cshtm")
        },
        '字串 templage'(){
            var s = nunjucks.renderString(_tmp.base, { name: 'nunjucks' });
            s
        },
        '解析物件'(){
            var food = {
                'ketchup': '5 tbsp',
                'mustard': '1 tbsp',
                'pickle': '0 tbsp'
            };
            var s = nunjucks.renderString(_tmp.array,{food} );
            console.log(s)
        },
        '陣列解構'(){
            var points = [[0, 1, 2], [5, 6, 7], [12, 13, 14]];
            var s = nunjucks.renderString(_tmp.array_解構,{points} );
            s
        },
        'set - 變數設定'(){
            var _tmp =`原值:{{ username }}
            {% set username = "joe" %}
            新值:{{ username }}`
            var s = nunjucks.renderString(_tmp,{username:'apple'} );
            s
        },
        'block - 區塊運用'(){
            /*
            1.在 Nunjucks_t1 設 block header
            2._tmp 中,繼承 Nunjucks_t1 , 並置換自己的 header
            */
            var _tmp =`
            {% extends 'Nunjucks_t1.njk' %}
            {% block header %}
            --this is new content
            {% endblock %}`
            var s = nunjucks.renderString(_tmp,{} );
            s
        },
    } 
    var _case = {
        '*el_table'(){
            var filed = {
                "ROUTE_SID": "GTI20101517555209104",
                "ROUTE_NO": "C030-19",
                "ROUTE": "单面阳极板（子流程）",
                "ROUTE_CATEGORY": "R",
                "DEFAULT_VERSION": 1,
                "VERSION_DESCRIPTION": null,
                "MAX_VERSION": 2,
                "CREATE_USER": "mes",
                "CREATE_DATE": "2020-10-15 17:56:21",
                "UPDATE_USER": "mes",
                "UPDATE_DATE": "2020-10-30 14:13:41"
            }
            var s = nunjucks.render('el_table.njk',{filed} );
            fn.save(s,"./_tmp.txt"); 
        },

    }


    _.each([fn,_case],(_fn)=>{
        _.each(_fn,(e,k)=>{
            if (k.substr(0,1)=="*"){
                e();
            }
        })
    })
})()