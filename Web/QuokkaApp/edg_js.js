/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/
import * as _ from 'lodash';
var edge = require('edge-js');
import path from "path";

(()=>{
    return 
    var _filePath = path.join(__dirname,'./_demo.xlsx');
    
 

    var fn = {
        '*'(){ 
        
            var helloWorld = edge.func(function () {
                /*async (input) => { 
                    return ".NET Welcomes " + input.ToString(); 
                }*/
            });
            helloWorld('JavaScript', function (error, result) {
                if (error) throw error;
                console.log(result);
            });
        },
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})()


var helloWorld = edge.func(`async (input) => { return ".NET welcomes " + input.ToString(); }`);
helloWorld('JavaScript', function (error, result) {
    if (error) throw error;
    console.log(result);
});