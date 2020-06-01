(()=>{
    let SQL_App = {
        /**
         * 資料規格化
         * @param {*} sqlCmd 
         * SPEC)所謂的規格化，是把所有資料集合起來，以便做後續的處理分析
            1.剔除換行符號
            2.取得基本key word
         */
        FormatSTD(sqlCmd){
            regexp	= new RegExp("\\s+","gi");
            var tmpData	= as_SqlCmd.replace(regexp," ");;
            var arr_SqlCMD = new Array("UNION","INSERT INTO","DELETE","UPDATE","SET"
            ,"SELECT","FROM","WHERE","GROUP","ORDER","HAVING","JOIN","LEFT JOIN","CASE","WHEN","ELSE","END");
            for ( i = 0 ; i < arr_SqlCMD.length ; i++)
            {
                regexp	= new RegExp("\\b" + arr_SqlCMD[i] + "\\s","gi");
                var tmpData	= tmpData.replace(regexp,"\n" + arr_SqlCMD[i] +"\t");
            }
            return tmpData;
        }
    }
})()