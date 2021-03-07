import * as _ from 'lodash';
import path from "path";
let ejs = require('ejs');
const fs = require('fs');
(()=>{
	var _tpl = {
			f_confirm:`f_confirm(key_msg,callback){
	this.$confirm('請確認是否\${key_msg}?', '提示', {
		type: 'info',
		center: true
	}).then(() => {
		callback();
	}).catch(() => {
		this.$message({
			type: 'info',
			message: '已取消'
		});
	});
},`
	} 
	
})

