//TODO-i18n:
i18n: {
    順序號: "@RES.BLL.Face.ITEM_SEQ",
    類別: "@RES.BLL.Face.ITEM_TYPE",
    操作: "@RES.BLL.Face.Operate",
    長度: "@RES.BLL.Face.ITEM_VALUE_LENGTH",
    值: "@RES.BLL.Face.ITEM_VALUE",
    可用字元列表: "@RES.BLL.Face.SERIAL_CHARS",
    表名: "@RES.BLL.Face.TABLE_NAME",
    列名: "@RES.BLL.Face.COLUMN_NAME",
    列起始值: "@RES.BLL.Face.COLUMN_VALUE_START",
    序號起始值: "@RES.BLL.Face.SERIAL_START_VALUE",
    入口函數: "@RES.BLL.Face.CUSTOM_ENTRY_FUNCTION",
    是否重置: "@RES.BLL.Face.RESET_ON_CHANGED",
    ConfirmCancel: '請確認是否放棄當前的修改?',
    ConfirmDel: '請確認是否刪除這筆資料?',
    ConfirmAdd: '執行新增將跳離當前頁面，請確認.',
    ConfirmSave: '請確認,是否執行儲存?',
},
grid: {
    data: items,
    pageSize: 10,
    pageIdx: 1,
    row_count: 0,
    Sort: {
        Name: "CREATE_DATE",
        isAsc: true
    },
    Conditions: {},
    Page: {
        Index: 1,
        Size: 10,
    },
    get query_rule() {
        {
            let { Conditions, Sort, Page } = this;
            return {
                Conditions, Sort, Page
            }
        }
    }
},