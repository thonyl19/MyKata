form: {
	ROUTE_NO :'',
	ROUTE :'',
	ROUTE_CATEGORY :'',
	DESCRIPTION :'',
	ENABLE_FLAG :'',
},
//TODO-i18n:
i18n: {
	ROUTE_NO :'ROUTE_NO',
	ROUTE :'ROUTE',
	ROUTE_CATEGORY :'ROUTE_CATEGORY',
	DESCRIPTION :'DESCRIPTION',
	ENABLE_FLAG :'ENABLE_FLAG',
},
grid: {
    data: [],
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
ctr_ENABLE:{
    val:true,
    enableTrigger:true
},
