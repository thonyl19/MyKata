var request = require('request');



let t1 = (()=>{
    request.get('http://localhost:8080/echo/test/tcode?cs=22',(error,res,body)=>{
        //這個階段只是字串
        body;
        //需經過 parse 後才會轉成 json 物件
        var x = JSON.parse(body);
        x;
    })   
})();

let DefParse = (resolve,reject)=>{
    return (error,res,body)=>{
        if (!error &&  res.statusCode  == 200){
            resolve(JSON.parse(body));
        }else{
            reject({error,res});
        }
    }
}

let ReqFn = (url,defParse=DefParse)=>{
    return new Promise((resolve,reject)=>{
        request.get(url,defParse(resolve,reject))   
    });
}

let t2 = (async()=>{
    // ReqFn('http://localhost:8080/echo/test/tcode?cs=22').then(val=>{
    //     val;
    // })
    //此一式效果與上同
    var x =await ReqFn('http://localhost:8080/echo/test/tcode?cs=22');
    x;
})();


//自訂義,要轉換處理的呈序
let t3 = (async()=>{
    var myParse = (resolve,reject)=>{
        return (error,res,body)=>{
            if (!error &&  res.statusCode  == 200){
                var z  = JSON.parse(body);
                resolve(z.Args.Url);
            }else{
                reject({error,res});
            }
        }
    };
    var x1 =await ReqFn
        ('http://localhost:8080/echo/test/tcode?cs=22'
        ,myParse 
        );
    x1;
})();