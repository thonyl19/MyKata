var Edge = require('edge');

var TestAll:any = {};
var Ex = { 
    payload : {
        anInteger: 1,
        aNumber: 3.1415,
        aString: 'foobar',
        aBool: true,
        anObject: { first: 'Tomasz', last: 'Janczuk' },
        anArray: [ 'a', 1, true ],
        aBuffer: new Buffer(1024),
        fn:((input,callback)=>{
            callback(null, input * 2);
        }),
        a:1,
        b:2
    }
}

TestAll.T01 = (()=>{
    Edge.func(`
        async (input) => { 
            return ".NET Welcomes " + input.ToString(); 
        }
        `)
        ('JavaScript', (error, result)=> {
                if (error) throw error;
                console.log(result);
        });
});

TestAll.T02 = (()=>{
    /*
    以下的語法是參照 http://tjanczuk.github.io/edge/#/25
        但是用 qoka 測試時,會出現 以下訊息
        If .NET source is provided as JavaScript function, function body must be a
    */
    var fn_原生範例 =function () {
        /*
            async (dynamic input) => { 
                return input.nested.text + " work!"; 
            }
        */}
    var fn_有效語法 =`async (dynamic input) => { 
                    return input.nested.text + " work!"; 
                }`
    var input = {
            nested: {
                text: "Dynamics"
            }
        };
    Edge.func
        (
            //fn_原生範例
            fn_有效語法
        )(input, (error, result)=> {
            result;    
        });
});


/**
 * http://tjanczuk.github.io/edge/#/29
 * Pass data from Node.js to C#
 */
TestAll.T03 = (()=>{
    return ;
    var hello = Edge.func('My.Sample.dll') 
        (Ex.payload
        , function (error, result) { 
            result;
        });
})

/**
 * Pass data from C# to Node.js
 * 將在 c# 中產生的動態物件,傳入 nodjes
 */
TestAll.T04 = (()=>{
    var code = `
        async (input) => {
            return new {
            anInteger = 1,
            aNumber = 3.1415,
            aBool = true,
            anObject = new { a = "b", c = 12 },
            anArray = new object[] { "a", 1, true },
            
            aBuffer = new byte[1024]
            };
        }
    `
    Edge.func(code) 
        (null,function (error, result) { 
            result;
        });
})

/*
http://tjanczuk.github.io/edge/#/33

*/
TestAll.T05 = (()=>{
    var code = `
        using System.Collections.Generic;
        async (dynamic data) => 	
        {
            
            int sum = (int)data.a + (int)data.b;
            var multiplyBy2 = (Func<object,Task<object>>)data.fn;
            return await multiplyBy2(sum);
        }
    `
    Edge.func(code) 
        (Ex.payload,function (error, result) { 
            result;
        });
})

/** 
 * http://tjanczuk.github.io/edge/#/33
*/
TestAll.T06 = (()=>{  //})
    var code = `
        async (input) => {
            return (Func<object,Task<object>>)(async (i) => { 
                var s = "Hello from .NET";
                Console.WriteLine(s); 
                return s; 
            });
        }
    `
    var result = Edge.func(code) 
        (null,true)
        (null,true);
    result;

})

/**  
 * http://tjanczuk.github.io/edge/#/34
 * 
*/
TestAll.T07 = (()=>{  //})
    var code = `
        async (input) => {
            var k = (int)input; // CLR state 
            return (Func<object,Task<object>>)
            (async (i) => { return ++k; });
        }
    `
    var fn = Edge.func(code) ;
    var fn1 = fn(12, true);
    var arr = [fn1(null,true),fn1(null,true)];
    arr;
})

/** 
 * http://tjanczuk.github.io/edge/#/39
 * MULTI-THREADING IN NODE.JS PROCESS
 */
TestAll.T08 = (()=>{  //})
    var code = `
        async (input) => { 
        // we are on V8 thread here
        return await Task.Run<object>(async () => {
          // we are on CLR thread pool thread here
          await Task.Delay(5000); // simulate CPU bound  
          return ".NET welcomes " + input.ToString();
        });
      }
    `
    Edge.func(code)
        ('Node.js', function (error, result) { 
            result;
         });;

})

/**
 * ZIP COMPRESSION
 * http://tjanczuk.github.io/edge/#/41
 * ?找不到類型或命名空間名稱 'Task' (您是否遺漏 using 指示詞或組件參考?)​​
 * 
 */
TestAll.T09 = (()=>{  //})
    return ;
    var code = `
        class Startup {
        public async Task<object> Invoke(dynamic p) {
          await Task.Run(async () => {
            System.IO.Compression.ZipFile.CreateFromDirectory(
              (string)p.src, (string)p.dest);
          });
          return null;
        }
      }
    `
    Edge.func(code)
    ({ src: 'D:\\Test', dest: 'D:\\Test.zip' }, function (error, result) { 
        result;
    });;
})

/**
 * Convert images between JPG, BMP, TIFF, PNG, and GIF
 * http://tjanczuk.github.io/edge/#/42
 */
TestAll.T10 = (()=>{  //})
    //......
})

for (var fn in TestAll){
    //TestAll[fn]();
}




// var c_code = `
//     async()=>{
//         string strProvider = "@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=D:\A\Code\股\DBS\轉檔.accdb";
//         string strSql = "Select count(*) from Yahoo100";
//         OleDbConnection con = new OleDbConnection(strProvider);
//         OleDbCommand cmd = new OleDbCommand(strSql, con);
//         con.Open();
//         // cmd.CommandType = CommandType.Text;
//         // OleDbDataAdapter da = new OleDbDataAdapter(cmd);
//         // DataTable scores = new DataTable();
//         // da.Fill(scores);
//         // dataGridView1.DataSource = scores;
//     }
// `
// Edge.func(c_code)('JavaScript', (error, result)=> {
//         if (error) throw error;
//         console.log(result);
//     });

    //http://tjanczuk.github.io/edge/#/15
    // var update = require('edge').func('sql', function () {/*
    //     update Products
    //     set ProductName = @newName 
    //     where ProductId = @id
    // */});
    
    // update({ id: 10, newName: 'New Ikura' }, function (error, result) {
    //     if (error) throw error;
    //     console.log(result);
    // });


//http://tjanczuk.github.io/edge/#/17
// var factorial = edge.func('lsharp', function () {/*
//   (def fact(n) 
//       (if (is n 0) 1 (* n (fact (- n 1)))))
// */});

// factorial([5], function (error, result) {
//     if (error) throw error;
//     console.log(result);
// });

//http://tjanczuk.github.io/edge/#/19
// var hello = require('edge').func({
//     assemblyFile: 'My.Edge.Samples.dll',
//     typeName: 'Samples.FooBar.MyType',
//     methodName: 'MyMethod' // Func<object,Task<object>>
// }});

// hello('Node.js', function (error, result) { ... });
         

//http://tjanczuk.github.io/edge/#/22
// var hello = edge.func('mysample.cs');


//http://tjanczuk.github.io/edge/#/23
// var helloCs = edge.func(...); // C# is the default
// var helloFs = edge.func('fs', ...); // F#
// var helloPy = edge.func('py', ...); // Python
// var helloPs = edge.func('ps', ...); // PowerShell
// var helloPs = edge.func('sql', ...); // T-SQL via ADO.NET