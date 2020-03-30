let Views = {
  std1() {
     var _note = `
        <pre>
        </pre>
        `;
        var _r = {
          "WO_SID": "20120903-0001",
          "WO": "工單號",
          
          "STATUS": "目前狀態",
          "PRODUCT": "產品",
          "PARTNO": "使用料號",
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
          "ROUTE_VER_SID": "流程版本序號",
          "ROUTE": "流程_001",
          "ROUTE_VERSION": 1.0,
          "PRODUCT_SID": "GTI12090317332700014",
          "PARTNO_VER_SID": "GTI12090318000300056",
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
          "CREATE_USER": "Admin",
          "CREATE_DATE": "2012-09-03 18:40:03",
          "UPDATE_USER": "Admin",
          "UPDATE_DATE": "2012-09-07 18:34:37",
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
        };
        var _map = [
          {
              label: "操作", width: 50, align: 'center', sortable: false, hidden: true,
          },

             { label: '主键', name: 'SID', hidden: true },
             {
                 label: '工單號', name: 'WO', width: 60, align: 'center',
             },
             {
                 label: '目前狀態', name: 'STATUS', width: 50, align: 'center',
                 formatter: function (cellvalue) {
                     switch (cellvalue) {
                         case "Release":
                             return "已投產";
                             break;
                         case "Create":
                             return '<span class="text-danger">未下線</span>';
                             break;
                         default:
                             return "無法辨視"


                     }
                 }

             },
             { label: '產品', name: 'PRODUCT', width: 80, align: 'center' },
             { label: '使用料號', name: 'PARTNO', width: 80, align: 'center' },
             {
                 label: '流程', name: 'ROUTE', width: 80, align: 'center',
             },
             { label: '流程版本序號', name: 'ROUTE_VER_SID', hidden: true },
             { label: '流程版本', name: 'ROUTE_VERSION', hidden: true },
             { label: '數量', name: 'QUANTITY', width: 30, align: 'center' },
             { label: '投產數', name: 'RELEASE_QUANTITY', width: 30, align: 'center' },
             { label: '未投產數', name: 'UNRELEASE_QUANTITY', width: 30, align: 'center' },
             {
                 label: 'CreateDate', name: 'CREATE_DATE', width: 80, align: 'center',
             }
      ];
      var _arr = [];
      for (var i = 1 ; i < _map.length ; i++){
        var _o = _map[i];
        let {label:title,name:data} = _o;
        _arr.push({title,data});
      }
     var _obj = {
        _vue: {
           template: `
              <div>
                 ${_note}
                {{r}}
              </div>
              `,
            data(){
              return {
                arg:_r,
                r:_arr
              }
            },

            
        }
     };
     return _obj;
  },
};

window.sample = { 
  Views 
  ,def:'std1' 
};
