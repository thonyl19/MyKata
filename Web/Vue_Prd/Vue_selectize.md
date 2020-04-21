#### readonly_inputType
[說明]
這功能主要目的是為修飾當在 readonly 模式時,如果要以 selectize 物件方式呈現,
    就必須要帶入相應的 options 才能正確的“顯示”資料,但這樣的處理並不合理,
    所以才會思考為,如何在 沒有 options ,呈現出 資料值的作法.
目前的處理方式是,當 readonly_inputType 設為真時, 原本的 selectize 會隱藏,
    改顯示 input.text 的物件,並相應的顯示資料值.
當 readonly_inputType 設為否時,則是以原始 selectize 物件的 lock 功能,
    來完成 readonly 的需求 