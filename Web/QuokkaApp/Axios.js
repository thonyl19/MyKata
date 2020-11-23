/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/
import * as _ from 'lodash';
import path from "path";
import axios from 'axios';
(()=>{
    //基礎配置
    const instance = axios.create({
        //這個參數不見得好用,直接用 baseURL 即可
        // proxy: {
        //     host: '192.168.0.104',
        //     port: 3000,
        //     // auth: {
        //     //   username: 'mikeymike',
        //     //   password: 'rapunz3l'
        //     // }
        //   },
        baseURL: 'http://192.168.0.104:3000/api',
        timeout: 1000,
        headers: {'X-Custom-Header': 'test'}
      });
    var fn = {
        '基本用法'(){ 
            instance.get('user/1')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        async '*async'(){
            var r = await instance.get('user/1');
            r;
        }
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})()