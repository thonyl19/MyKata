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

    
### power-form-{bts|el} 
	這是在 power-form 的基礎上 ,以 element-ui 跟 bts 兩個不同的呈現機制,
		各自處理相的UI 呈現程序
	:quick
		以陣列欄位型式來做快速的 UI 生成
	:form_base
		以定制的 json 格式語法,來實現 UI 動態生成
	~新構想(old)
		應以 工具(pw-mock)的概念,先能快速的實現 UI 的結構,
			在這個基礎上生成 schema 或 template code
		最終端最多只有支援使用 schema , 沒有其他調試的功能 ,
			讓 智財可得到最大限度的保障
	~構想(v2020622)
		L0:
			終端應用,只能使用 slot template
		L1:
			智能模式,進入智財層
			支援 quick , schema ,mock 模式
		L2:
			GUI模式

	[L0] power-form-{bts|el} 
		只是外殼層加上 slot 的處理
	[L1] pw-form 
		:type{bts|el}
		:quick{col|dataRow}
		:schema
		規劃 以類似 x-component 的應用方式
	[L2] pw-form-cfg 
		Quick
		Config
			schema
				text_s:'',
					text_i:1,
					text_i1:1.1,
					text_n:null,
				select:['A','B'],
					select_1:{src:['A','B'],select:'A'},
				checkbox:true, //{checkbox:['A','B']}
					checkbox_1:{checkbox:'A',src:['A','B']}, //{checkbox:['A','B']}
					radio:{radio:'A',src:['A','B']},
				date:new Date(),
				textarea:'~',
				textarea_1:{textarea:''},
				x(){}
			grid
				以表格型式呈現 格式設定
		View
			檢視 pw-form 實際呈現
		Code
			html
			js
			mock
### pw-debug
	提供 點撃後,可以快速的簽入當前的程序,直接調試 $data

### cfg
	{
		{tab-type}:{
			//TabName
			Input:{
				is:def(tab{pw_input})
				val:
				Exec:
				Renew:
				SyncBack:
			}
			Config:{

			}
		}
		階層式 tab 擴展
		{
			is:
			type:{tab-type}
			tabs:{
				//TabName
				Input:{
					is:def(tab{pw_input})
					val:
					Exec:
					Renew:
					SyncBack:
				}
				Config:{
					type:{tab-type},
					tabs:{

					}
				}
			}
			
		}
	}