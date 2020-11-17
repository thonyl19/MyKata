### 一次式更新語法
[Ref]
    https://blog.csdn.net/weixin_44671994/article/details/87720196?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param
```
    --將 B0.PARAMETER_NAME 更新到 A0.REPORT 
    UPDATE 	ZZ_OPER_WORKT_SUMMARY
    SET 	REPORT = B0.PARAMETER_NAME
    FROM 	ZZ_OPER_WORKT_SUMMARY A0
	    	INNER JOIN AD_PARAMETER B0
		    	ON B0.PARAMETER_NO = A0.REPORT_TYPE
```

### 批次匯檔
```
    SELECT  
        'print ''' + a.TABLE_NAME   +''';'
        --,'dbo.' +a.TABLE_NAME                as 表格名稱   
        ,'drop table SAP_BUFFER.dbo.' +a.TABLE_NAME + '_TEST;'
        ,'select * into SAP_BUFFER.dbo.' +a.TABLE_NAME + '_TEST FROM SAP_BUFFER.dbo.' +a.TABLE_NAME  +';'
        ,'print ''' + a.TABLE_NAME   +''';'
        ,'set identity_insert ' + a.TABLE_NAME   +' on ;'
        ,'truncate table SAP_BUFFER.dbo.' + a.TABLE_NAME +';'
        ,'INSERT INTO SAP_BUFFER.dbo.' +a.TABLE_NAME + ' select * _TEST FROM SAP_BUFFER_Test.dbo.' +a.TABLE_NAME +';'
    FROM  
        INFORMATION_SCHEMA.TABLES  a  
        --LEFT JOIN INFORMATION_SCHEMA.COLUMNS b ON (a.TABLE_NAME=b.TABLE_NAME)  
    
    ORDER BY  

        a.TABLE_NAME
```

### 設法取得 Percentage 為最大的一筆
```
    with TT AS (
        select   * from EmployeeDashboardData E
        where WindowsID in ('PW40' ,'hl55','pt95','al1j')
        --order by E.Percentage desc
    )
    select  Guid,Percentage, EmployeeNo,NickName
            ,[RANK]= RANK()  over ( order by Percentage desc)
            ,[DENSE_RANK]= DENSE_RANK() over ( order by Percentage desc)
    from    TT
```


### SQL變數 轉 UniCode 用法
https://msdn.microsoft.com/zh-tw/library/ms188001.aspx

```
    declare @a  varchar(max)
    select *
    from PMPProjects P
    where P.ProjectName = UniCode(@a)

```

### 預儲程序 做 交易處理的寫法

```
    DECLARE @ERRORID INT
    BEGIN TRANSACTION
        UPDATE	b2b_porderd_test
        SET		porderd_firstinqty	= porderd_qty
                ,porderd_secinqty	= 0
        WHERE	porderm_no	= @as_porderm_no
        
        SET @ERRORID =  @@ERROR
        IF @ERRORID <> 0
            GOTO ErrHandler

        UPDATE	b2b_porderm_test
        SET		porderm_replyok	='Y'
                ,porderm_replydate	= @as_date
                ,porderm_replytime	= @as_time
        WHERE	porderm_no	= @as_porderm_no+'1'

        SET @ERRORID =  @@ERROR
        IF @ERRORID <> 0
            GOTO ErrHandler

    COMMIT TRANSACTION
    RETURN @ERRORID

    --錯誤處理
    ErrHandler:
    ROLLBACK TRANSACTION
    RETURN @ERRORID

```

### Cursor 
```
    declare compname_cursor cursor for
    select  comp_ip,comp_cname
    from    comp_ip

    open    compname_cursor
    fetch   next from compname_cursor into @compip,@compcname
    while (@@fetch_status= 0 )
        begin
            fetch next from compname_cursor into @compip,@compcname
        end 
    close compname_cursor
```

### Format

```
    --轉換成有固定小數位的資料
	CONVERT(CHAR(15),convert(decimal(10,2),isnull(b0.borrbackd_price,0))) as borrbackd_price
	
    --用西元轉成民國
	convert(int,convert(char(10),getdate(),112)-19110000)

```

### 生成一個空表結構
```
    select col1,col2 into #t from t where 1=0
    --這類程式碼不會返回任何結果集，但是會消耗系統資源的，應改成這樣：
    create table #t(...)
```










