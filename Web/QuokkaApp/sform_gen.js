/*
smart form 的轉換核心
*/

import * as _ from 'lodash';
var smart = {
	select:['A','B'],
    select_1:{src:['A','B'],select:'A'},
    text_s:'',
    text_i:1,
    text_i1:1.1,
    text_n:null,
    checkbox:true, //{checkbox:['A','B']}
    checkbox_1:{checkbox:'A',src:['A','B']}, //{checkbox:['A','B']}
    radio:{radio:'A',src:['A','B']},
    date:new Date(),
	textarea:'~',
	textarea_1:{textarea:''},
	x(){}
};
var test =  {
	"WO_SID": "97e7d181-f0af-4b8f-8032-d511ddc596c9",
	"WO": "20200430-0001",
	"SO": null,
	"SO_TYPE": null,
	"SO_SEQ": null,
	"PO": null,
	"PO_TYPE": null,
	"PO_SEQ": null,
	"WO_TYPE": "Eng",
	"WO_TYPE2": null,
	"WO_TYPE3": null,
	"STATUS": "Release",
	"ERP_STATUS": null,
	"QUANTITY": 1000.0,
	"ERP_QUANTITY": 0.0,
	"UNIT": "g",
	"QTY_1": 0.0,
	"UNIT_1": "0",
	"QTY_2": 0.0,
	"UNIT_2": "0",
	"UNRELEASE_QUANTITY": 0.0,
	"UNRELEASE_QTY_1": null,
	"UNRELEASE_QTY_2": null,
	"LOT_SIZE": 10.0,
	"ROUTE_VER_SID": "GTI12090317461000029",
	"ROUTE": "流程_001",
	"ROUTE_VERSION": 1.0,
	"PRODUCT_SID": "GTI12090317332700014",
	"PRODUCT": "產品_001",
	"PARTNO_VER_SID": "GTI12090318000300056",
	"PARTNO": "Part_001",
	"PARTNO_VERSION": 1.0,
	"PRIORITY": "3",
	"OWNER": null,
	"CUSTOMER": null,
	"BONDED_FLAG": "F",
	"BONDED_NO": null,
	"SCHEDULEDATE": null,
	"DUEDATE": null,
	"ERP_CREATE_DATE": null,
	"ERP_FINISH_DATE": null,
	"FINISH_DATE": null,
	"CREATEDATE": null,
	"MIN_START_DATE": null,
	"PRE_START_DATE": null,
	"ROOT_WO_SID": null,
	"PARENT_WO_SID": null,
	"PARENT_WO_TYPE": null,
	"FACTORY": null,
	"MODIFY_FLAG": "N",
	"BOM_SID": null,
	"BOM_VERSION": 0.0,
	"BOM_CREATE_DATE": null,
	"CONFIRM_FLAG": "N",
	"SCHEDULE_QTY": null,
	"ERP_RECEIVE_QTY": 0.0,
	"ERP_WIP_QTY": 0.0,
	"AREA_SID": null,
	"AREA_NO": null,
	"INVENTORY_TYPE": null,
	"LINE_NAME": null,
	"CONFIRM_DATE": null,
	"CONFIRM_USER": null,
	"PACKAGE_UNIT_QTY": 0.0,
	"PACKAGE_UNIT": null,
	"SIGN_STATUS": null,
	"CUST_PART_NO": null,
	"CUST_PART_NO_SID": null,
	"CUST_PART_NO_VER_SID": null,
	"GROSS_DIE_QTY": 0.0,
	"PM_USER": null,
	"SHIPPING_ADDRESS": null,
	"SHIPPING_ADDRESS1": null,
	"URGENT_FLAG": "N",
	"WAFER_THICKNESS": 0.0,
	"WAFER_SIZE": 0.0,
	"RECEIVE_NO": null,
	"RECEIVE_NO_TYPE": null,
	"ERP_COMMENT": null,
	"MES_COMMENT": null,
	"ERP_COMMENT1": null,
	"ERP_COMMENT2": null,
	"ERP_COMMENT3": null,
	"ERP_COMMENT4": null,
	"ATTRIBUTE_01": null,
	"ATTRIBUTE_02": null,
	"ATTRIBUTE_03": null,
	"ATTRIBUTE_04": null,
	"ATTRIBUTE_05": null,
	"ATTRIBUTE_06": null,
	"ATTRIBUTE_07": null,
	"ATTRIBUTE_08": null,
	"ATTRIBUTE_09": null,
	"ATTRIBUTE_10": null,
	"ATTRIBUTE_11": null,
	"ATTRIBUTE_12": null,
	"ATTRIBUTE_13": null,
	"ATTRIBUTE_14": null,
	"ATTRIBUTE_15": null,
	"ATTRIBUTE_16": null,
	"CREATE_USER": "admin_Test",
	"CREATE_DATE": "2012-09-03 18:40:03",
	"UPDATE_USER": "Admin",
	"UPDATE_DATE": "2020-04-30 15:43:51",
	"RELEASE_QUANTITY": 1000.0,
	"RELEASE_QTY_1": 0.0,
	"RELEASE_QTY_2": 0.0,
	"YIELD": null,
	"SCARP_QUANTITY": 0.0,
	"SCARP_QTY1": 0.0,
	"SCARP_QTY2": 0.0,
	"TERMINATED_QUANTITY": 0.0,
	"TERMINATED_QTY1": 0.0,
	"TERMINATED_QTY2": 0.0,
	"ECN": null,
	"STOCK_QTY": null,
	"RELEASE_DATE": null,
	"ECN_SID": null,
	"ECN_NO": null,
	"ECN_NAME": null,
	"WO_LINE_SID": null,
	"WO_LINE_NO": null,
	"WO_LINE": null
  }
var fn = {
    _gen(arg = smart){
        var arr = {}
        _.each(arg,(val,key)=>{
			var _t = typeof(val);
			var _base = {
				label:key,
				type:'input',
				val
			}
			_t
			switch(_t){
				case "string":
					if (val.substr(0,1) == '~'){
						_base.type = 'textarea';
					}
					//基於轉換處理的考量,先不自動把日期字段判斷為日期物件
					//else if (isNaN(Date.parse(val))==false){}
					break;
				// case "number":
				// 	break;
				case "boolean":
					_base.type = 'checkbox';
					break;
				case "object":
					//val
					//key
					if (_.isNull(val)){
						//
					}else if (_.isArray(val)){
						let [first=""] = val;
						_base.val = first;
						_base.type = 'select';
						_base.src= val;
					}else if (_.isDate(val)){
						_base.type = 'date';
					}else if (_.isPlainObject(val)){
						let {checkbox,radio,textarea,select,src} = val;
						if (textarea!=null){
							_base.type = 'textarea';
							_base.val = textarea;
						}
						if (src !=null){
							_base.src = src;
						}

						if (checkbox!=null){
							_base.type ='checkbox';
							_base.val = checkbox;
						}else if (radio!=null){
							_base.type ='radio';
							_base.val = radio;
						}else if (select!=null){
							_base.type ='select';
							_base.val = select;
						}
					}

					break;

			}
			arg[key]= _base;
			_t;
        })
        console.log(arg);
    },
     
}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="_"){
        e();
    }
})