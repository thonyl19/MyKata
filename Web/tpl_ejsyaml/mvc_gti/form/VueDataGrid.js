﻿grid: {
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