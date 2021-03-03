/*
[Ref]
https://nunjucks.bootcss.com/
*/
import * as _ from 'lodash';
import path from "path";
const nunjucks = require('nunjucks');
nunjucks.configure('QuokkaApp', { autoescape: true });
const fs = require('fs');
(()=>{
    var fn = {
        save(data,filename="test.txt"){
            fs.writeFileSync(`./QuokkaApp/${filename}`,data,'utf-8');
        },
        'T01'(){
            var s = nunjucks.render('Nunjucks_t1.njk', { name: 'nunjucks' });
            s
            //fn.save(s,"Nunjucks_t1.txt")
        },
        '*T02'(){
            var s = nunjucks.render('Nunjucks_t2.njk', { name: 'nunjucks' });
            s
            //fn.save(s,"Nunjucks_t2.cshtm")
        }

    } 
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})()