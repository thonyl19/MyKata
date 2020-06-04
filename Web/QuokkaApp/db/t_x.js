var winax = require('winax');
(()=>{
    var Variant = winax.Variant;
    const path = require("path");
    var _filePath = path.join(__dirname,'./_demo.mdb');
    const connStr 
        //= `rovider=Microsoft.Jet.OLEDB.4.0;Data Source=${_filePath}`; 
        =`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${_filePath};Persist Security Info=False;`;
        //=`DBQ=${_filePath};DRIVER={Microsoft Access Driver (*.mdb)};`
    var conn = new ActiveXObject("ADODB.Connection"); 
    var rs = new ActiveXObject("ADODB.Recordset"); 
    　 conn.Open(connStr); 
    　 var sql="select * from Log;"; 
    　 rs.open(sql, conn); 
        console.log(rs.RecordCount )
    　shtml = "<table width='100%' border=1>"; 
    　shtml +="<tr bgcolor='#f4f4f4'><td>au_id</td><td>au_lname</td><td>au_fname</td></tr>"; 
    　 while(!rs.EOF) 
    　 { 
            console.log(rs);
    // 　shtml += "<tr><td>" + rs("friend_id") + "</td><td>" + rs("friend_name") + "</td><td>" + rs("friend_nickname") + "</td></tr>"; 
    　      rs.moveNext; 
    　 } 
    　 shtml += "</table>"; 
    　 document.write(shtml); 
    　 rs.close();  
    　 rs = null;  
    　 conn.close();  
    　 conn = null; 

})()