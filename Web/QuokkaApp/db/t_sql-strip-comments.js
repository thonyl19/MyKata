/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/
import * as _ from 'lodash';
import path from "path";
import strip from 'sql-strip-comments';
const d = require('debug')('t_sql-strip-comments');
(()=>{
    
    const strip = require("sql-strip-comments");

    let sql='SELECT * FROM customers; -- test comments';
    console.log(1, strip(sql));
    // SELECT * FROM customers; 

    sql='SELECT * FROM customers; /* -- test comments */';
    console.log(2, strip(sql));
    // SELECT * FROM customers; 

    sql=`
    SELECT 
        "comments can be one line (-- comment text 
    ) and multiline (/* comment text */)" AS literal, 
        * 
    FROM 
        customers; /* -- test comments */`;
    console.log(3, strip(sql));
    d('test = %s','a');
})()