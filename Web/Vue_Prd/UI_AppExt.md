Next
  切換到下一頁,會判斷下一頁的資料是否己設定
    N：自動進行產生 下一頁的資料
    Y：不轉換,需手動轉換
Exec
  將當前頁面的設定強制更新到下一頁
Renew:
  重新產生當前頁面的料
SyncBack:
  將當前面頁的設定回推到上一頁



1.Input  
	[Exec]
	A.換行式欄位
		以換行做為一個欄位的識別
	B.DataRow Json
		解析 Json 中的 Filed 做為欄位的識別,比 A 的解析多了自動判斷欄位型別的功能 
    
2.Config - jdt-table 的調設功能 [Next] 
	[SyncBack,Renew]  
	A.Code 
		I/O 為 jdt-table 標準的 Code 
	B.Columns [Next]
		以 Grid 呈現 Columns 的設定
	C.Exten  [Next]
		以 Grid 呈現 jdt-table 的其他設定

3.Mock  

4.View


Inpu 切換到下一頁,
  會判斷下一頁的資料是否己設定
    N：自動進行轉換動
    Y：不轉換,需手動轉換


* 切換到 Config
    先判斷 Code 內是否有值
      N:重新產生 Code
      Y:不得變動既有的 Code

  從 Code 切換到 Col 或 View ,
    則自動 依據 Code 的設定 Renew 

    
