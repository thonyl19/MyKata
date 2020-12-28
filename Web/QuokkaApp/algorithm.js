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
        //https://pjchender.blogspot.com/2017/09/fizz-buzz.html
        'fizzbuzz'(){ 
            /*
            會輸出從 1 ~ num 的數值
            但若這個輸出的數值是 3 的倍數，則輸出 fizz
            但若這個輸出的數值是 5 的倍數，則輸出 buzz
            但若這個輸出的數值同時是 3 和 5 的倍數，則輸出 fizzBuzz
            */
          
            var fn =(n)=>{
                var arr = [];
                for (var i =1 ; i <= n ;i++){
                    if (i % 15 == 0){
                        arr.push("fizzBuzz");
                    }else if (i % 5 == 0){
                        arr.push( "buzz");
                    }else if (i % 3 == 0 ){
                        arr.push( "fizz");
                    }else{
                        arr.push(i);
                    }
                }
                return arr;
            }
            console.log(fn(20));
        },
    }
    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})()