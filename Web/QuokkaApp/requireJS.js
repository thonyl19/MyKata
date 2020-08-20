/*
[Ref]
已試過在 Quokka 使用 require.js ,但無法使用 
用 cdn 式則出現如下錯誤 
    Error [ERR_INVALID_PROTOCOL]: Protocol 'https:' not supported. Expected 'file:'
使用 local 則出現
    Cannot find module 'require'. Please verify that the package.json has a valid "main" entry
    */
//import * as _require from 'https://cdn.jsdelivr.net/npm/requirejs@2.3.6/require.js';
import _require from "require";
(()=>{
    var _filePath = path.join(__dirname,'./_demo.xlsx');
    
    require


    var fn = {
        '_'(){ 
            
        },
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="_"){
            e();
        }
    })
})()