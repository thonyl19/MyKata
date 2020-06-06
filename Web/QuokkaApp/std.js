/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/
import * as _ from 'lodash';
import path from "path";
(()=>{
    var _filePath = path.join(__dirname,'./_demo.xlsx');
    
    var fn = {
        '_'(){ },
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="_"){
            e();
        }
    })
})()