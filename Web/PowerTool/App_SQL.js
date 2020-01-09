(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        //浏览器全局变量(root 即 window)
        root['App_SQL'] = factory(root.jQuery);
    }
}(this, function ($) {
    let App_SQL =  {
        isFiled換行:true,
        //將 SQL Cmd 標準化
        SqlCmdSTD(as_SqlCmd){
            debugger
            var regexp	= new RegExp("\\s+","gi");
            var tmpData	= as_SqlCmd.replace(regexp," ");
            var arr_SqlCMD = ["UNION","INSERT INTO","DELETE","UPDATE","SET"
            ,"SELECT","FROM","WHERE","GROUP","ORDER","HAVING","JOIN","LEFT JOIN","CASE","WHEN","ELSE","END"];
            _.forEach(arr_SqlCMD, (value, key)=> {
                regexp	= new RegExp(`\\b${value}\\s`,"gi");
                tmpData	= tmpData.replace(regexp,`\n${value}\t`);
            });
            return tmpData;
        },

        /*
        SQL 的命令字元轉成大寫
        NOTE:處理不需要複雜化，如果遇到不能處理的，修改視情形調整來源就好了
        */
        SqlCmdUpWord(as_SqlCmd) {
            var arr_SqlCMD = new Array("UNION","INSERT INTO","DELETE","UPDATE","SET"
            ,"SELECT","DISTINCT","CASE","WHEN","THEN","ELSE","END","AS"
            ,"FROM","WHERE","IN","BETWEEN","AND","OR","ISNULL"
            ,"GROUP","ORDER","BY","DESC","VALUES","\\(");
            var	tmpData	= as_SqlCmd;
            _.forEach(arr_SqlCMD, (value)=> {
                regexp	= new RegExp(`\\b${value}\\s`,"gi");
                switch(value){
                    //\n{}\t
                    case "UNION":
                    case "INSERT INTO":
                    case "DELETE":
                    case "UPDATE":
                    case "SET":
                    case "SELECT":
                    case "FROM":
                    case "WHERE":
                    case "\\(":
                        tmpData	= tmpData.replace(regexp,`\n${value}\t`);
                        break;
                    /*
                    //\n\t{}
                    case "AND":
                    case "OR":
                        tmpData	= tmpData.replace(regexp,"\n\t" + arr_SqlCMD[i]+ " ");
                        break;
                    //\n\t\t{}
                    case "WHEN":
                    case "ELSE":
                    case "END":
                        tmpData	= tmpData.replace(regexp,"\n\t\t" + arr_SqlCMD[i]+ " ");
                        break;
                    default:
                        tmpData	= tmpData.replace(regexp,arr_SqlCMD[i]+ " ");
                        break;
                    */
                }
            })
            return tmpData;
        },

        /*
        將UPDATE 指令轉成 SELET 條件
        SPEC:
        1.先將 Update 改成 from
        2.處理 set 改成相對 select 
            把原先 value 值  AS 成欄位名稱 
        */
        Update2Select(as_SqlCmd){
            var TmpData	= App_SQL.SqlCmdSTD(as_SqlCmd);
            TmpData	= App_SQL.SqlCmdUpWord(TmpData);
            //1.先將 Update 改成 from
            reg_SqlCmd	= new RegExp("\\bUPDATE\\s","gi");
            TmpData	= TmpData.replace(reg_SqlCmd,"FROM\t");

            //2.處理 set 改成相對 select 
            reg_SqlCmd	= new RegExp("\\bSET.+","gi");
            matched = TmpData.match(reg_SqlCmd);
            if (matched) 
            {	
                    //ls_Select	= matched[0].replace(new RegExp("=","gi")," AS ");
                    ls_Select	= App_SQL.Update2Select_FixAs(matched[0]);
                    //alert(TmpData);
                    //清掉原 set 條件
                    TmpData	= TmpData.replace(matched[0]+"\n","");  
                    TmpData	= ls_Select.replace(new RegExp("\\bSET\\s","gi"),"SELECT\t") 	+ TmpData;
            }	
            return TmpData;
        },

        /*
        處理 Set 的資料，將之處理成 select 正確的語法
        ，以排除 轉換成 AS 後，代名稱為數字而造成語法錯誤的問題
        */
        Update2Select_FixAs(as_Data){
            var arr_TmpA	= as_Data.split('=');
            var arr_TmpB	;
            var ls_Tmp		;
            var li_LenTmpB	= 0;
            // [i=1]剔除第一個不用處理
            for (i = 1 ; i < arr_TmpA.length ; i++)
            {
                arr_TmpB	= arr_TmpA[i].split(',');
                li_LenTmpB	= arr_TmpB.length;
                //alert(arr_TmpA[i] + "--" + arr_TmpB.length);
                switch(li_LenTmpB)
                {
                    case 1:
                    case 2:
                        //@取得逗號前的資料  EX:['C0666' 	,quoted_qty]
                        ls_Tmp	= _.trim(arr_TmpB[0]);
                        //@判斷若 不為逗號 則自動處理成 'data'
                        if (ls_Tmp.substr(0,1) != "'")
                        {
                            arr_TmpB[0]	= "'" + ls_Tmp + "'";
                            arr_TmpA[i]	= arr_TmpB.join(',');
                        }
                        
                        break;
                    default:
                        alert('發現異常:' + as_Data);
                        break;
                }
            }
            return  arr_TmpA.join(' AS ');
        },

        //將 SELECT, UPDATE 的欄位換行 主程序
        /*SPEC.
            以 SET 跟 SELECT 為單位
            逐一字串比對
                若有 '(' 則計數 +1  
                若有 ')' 則計數 -1  
                若遇到 ',' 且 計數 = 0 則換行  
        */
        FiledFormat(as_SqlCmd){
            var ls_Return	= as_SqlCmd;
            var ls_tmpWord	= "";
            var ls_tmpData	= "";
            var li_NewLineFlg	= 0;
            var reg_SqlCmd	= new RegExp("\\bSET.+|\\bSELECT.+","gi");
            var matched = ls_Return.match(reg_SqlCmd);
            if (matched) 
            {	
                for (var i=0; i< matched.length; i++) 
                {
                    ls_tmpData	= "";
                    for (var i1= 0 ; i1 < matched[i].length ; i1++)
                    {
                        ls_tmpWord	= matched[i].substr(i1,1);
                        switch(ls_tmpWord)
                        {
                            case "(":
                                li_NewLineFlg++;
                                break;
                            case ")":
                                li_NewLineFlg--;
                                break;
                            case ",":
                                if (li_NewLineFlg == 0 )
                                {
                                    ls_tmpData	+= "\n\t";	
                                }
                                break;
                        }
                        ls_tmpData	+= ls_tmpWord;
                    }
                    ls_Return	= ls_Return.replace(matched[i],ls_tmpData);  
                }
            }		
            /*	
                if (Form1.CB1.checked)
                {
                    reg_FiledSplit	= new RegExp(",","gi");
                    reg_SqlCmd	= new RegExp("\\bSET.+|\\bSELECT.+","gi");
                    matched = tmpData.match(reg_SqlCmd);
                    if (matched) 
                    {	
                        //alert(matched.length);
                        for (var i=0; i< matched.length; i++) 
                        {
                            tmpData	= tmpData.replace(matched[i],matched[i].replace(reg_FiledSplit,"\n\t,"));  
                        }
                    }		
                }
            */	
            return 	ls_Return;
        },

        /*
        將 SELET 條件 轉成 UPDATE 程式指令
        SPEC:
        1.處理 select 改成 set   
            把原先 成欄位名稱  設成 變數名稱 
        2.先將  from  改成 Update 
        */
        Select2UpdatePG(as_SqlCmd){
            var TmpData	= App_SQL.SqlCmdSTD(as_SqlCmd);
            TmpData	= App_SQL.SqlCmdUpWord(TmpData);

            //1.處理 select  改成相對  set
            reg_SqlCmd	= new RegExp("\\bSELECT.+","gi");
            matched = TmpData.match(reg_SqlCmd);
            if (matched) 
            {	
                    ls_SET	= "";
                    arrTmpA	= matched[0].replace(new RegExp("\\bSELECT\\s","gi"),"").split(",");
                    for (i = 0 ; i < arrTmpA.length ; i++)
                    {
                        arrTmpB	= arrTmpA[i].split(new RegExp("\\bAS\\s","gi"));
                        switch(arrTmpB.length)
                        {
                            case 1:
                                ls_SET	+= "," + arrTmpB[0] + "='as_" + _.trim(arrTmpB[0]) + "'";
                                break;
                            case 2:
                                ls_SET	+= "," + arrTmpB[0] + "='as_" + _.trim(arrTmpB[1]) + "'";
                                break;
                        }
                    }
                    //清掉原 select 條件
                    TmpData	= TmpData.replace(matched[0]+"\n","");  
                    TmpData	= "SET\t" + ls_SET.substring(1) + TmpData;
            }
            
            //2.先將 from 改成 Update
            reg_SqlCmd	= new RegExp("\\bFROM.+\\s","gi");
            matched = TmpData.match(reg_SqlCmd);
            if (matched) 
            {
                TmpData	= TmpData.replace(matched[0],"");  
                TmpData	= matched[0].replace(new RegExp("\\bFROM\\s","gi"),"UPDATE\t") + TmpData;	
            }	
            return TmpData;
        },



        //將 string Array 反解成 SQL 語法
        // BeStringArrayAnalysis(as_Data)
        // {
        //     var ls_Return = as_Data.replace(new RegExp("\t\"|\t,\"|\"\r|\"\$","gi"),"");
        //     return this.SqlCmdFormat(ls_Return);
        // }

    }
    return App_SQL;
}));
 
