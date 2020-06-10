### pw_input
    1.輸入完的資料,會 轉成一個 JsonCode 的物件,並藉此判斷是否符 Json 格式
    2.符合 Json 格式的情形下, txtbox 右上方會有一個 JsonType 的標記
    3.提供一個 zip_json 的核選功能
        3-1.依據 JsonCode.isObj 判斷 顯示/隱藏
        3-2.依據 核選結果,控制資料 t(格式化顯式)/f(壓縮顯示)
    4.提供 SyncBack/Exec/Renew 的動態 button ,以執行相應的處理功能
    5.提供 slot 以便依特別需求,做功能擴充
        5-1.在 slot 中,提供存取 pw_input.JsonCode 的機制