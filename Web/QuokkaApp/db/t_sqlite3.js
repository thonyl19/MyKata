var sqlite3 = require('sqlite3').verbose();
var _ = require('lodash');
(async()=>{
    const path = require("path");
    var _filePath = path.join(__dirname,'./_demo.db');
    _filePath
    var database  
        //= new sqlite3.Database(_filePath, 'OPEN_READONLY');
        = new sqlite3.Database(_filePath);
    // ,  function(e){
    //     if (err) console.log(err);
    // });
    database.serialize(()=>{
        database
        database.each("SELECT * FROM User ", function(err, row) {
            console.log(row);
        });

        database.each("SELECT * FROM User Where Name = ? ", [1], function(err, row) {
            console.log(row);
        });
    })
})()