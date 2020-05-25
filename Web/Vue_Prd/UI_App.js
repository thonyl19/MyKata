(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        root.returnExports = factory(root.jQuery, root.Vue,root._);
    }
}(this, function ($, Vue, _) {
    var _data = {
        WO: [{ "WO_SID": "20120903-0001", "WO": "20120903-0001", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Eng", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Release", "ERP_STATUS": null, "QUANTITY": 1000.0, "ERP_QUANTITY": 0.0, "UNIT": "g", "QTY_1": 0.0, "UNIT_1": "0", "QTY_2": 0.0, "UNIT_2": "0", "UNRELEASE_QUANTITY": 0.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 10.0, "ROUTE_VER_SID": "GTI12090317461000029", "ROUTE": "流程_001", "ROUTE_VERSION": 1.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12090318000300056", "PARTNO": "Part_001", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "Admin", "CREATE_DATE": "2012-09-03 18:40:03", "UPDATE_USER": "Admin", "UPDATE_DATE": "2012-09-07 18:34:37", "RELEASE_QUANTITY": 1000.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "97e7d181-f0af-4b8f-8032-d511ddc596c9", "WO": "20200430-0001", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Eng", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Release", "ERP_STATUS": null, "QUANTITY": 1000.0, "ERP_QUANTITY": 0.0, "UNIT": "g", "QTY_1": 0.0, "UNIT_1": "0", "QTY_2": 0.0, "UNIT_2": "0", "UNRELEASE_QUANTITY": 0.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 10.0, "ROUTE_VER_SID": "GTI12090317461000029", "ROUTE": "流程_001", "ROUTE_VERSION": 1.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12090318000300056", "PARTNO": "Part_001", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "admin_Test", "CREATE_DATE": "2012-09-03 18:40:03", "UPDATE_USER": "Admin", "UPDATE_DATE": "2020-04-30 15:43:51", "RELEASE_QUANTITY": 1000.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "d98155ce-0a92-475f-8089-48568b2ff886", "WO": "20100430-0001", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Eng", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Release", "ERP_STATUS": null, "QUANTITY": 1000.0, "ERP_QUANTITY": 0.0, "UNIT": "g", "QTY_1": 0.0, "UNIT_1": "0", "QTY_2": 0.0, "UNIT_2": "0", "UNRELEASE_QUANTITY": 0.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 10.0, "ROUTE_VER_SID": "GTI12090317461000029", "ROUTE": "流程_001", "ROUTE_VERSION": 1.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12090318000300056", "PARTNO": "Part_001", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "admin_Test", "CREATE_DATE": "2012-09-03 18:40:03", "UPDATE_USER": "Admin", "UPDATE_DATE": "2020-04-30 14:22:51", "RELEASE_QUANTITY": 1000.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "20120907-0001", "WO": "20120907-0001", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Eng", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Terminated", "ERP_STATUS": null, "QUANTITY": 500.0, "ERP_QUANTITY": null, "UNIT": "g", "QTY_1": null, "UNIT_1": "0", "QTY_2": null, "UNIT_2": "0", "UNRELEASE_QUANTITY": 500.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 250.0, "ROUTE_VER_SID": "GTI12090317461000029", "ROUTE": "流程_001", "ROUTE_VERSION": 1.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12090318000300056", "PARTNO": "Part_001", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "Admin", "CREATE_DATE": "2012-09-07 13:57:46", "UPDATE_USER": "Admin", "UPDATE_DATE": "2012-09-07 13:57:46", "RELEASE_QUANTITY": 0.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "20121019-0001", "WO": "20121019-0001", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Normal", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Terminated", "ERP_STATUS": null, "QUANTITY": 1000.0, "ERP_QUANTITY": 0.0, "UNIT": "g", "QTY_1": 0.0, "UNIT_1": null, "QTY_2": 0.0, "UNIT_2": null, "UNRELEASE_QUANTITY": 1000.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 10.0, "ROUTE_VER_SID": "GTI12090317461000029", "ROUTE": "流程_001", "ROUTE_VERSION": 1.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12090318000300056", "PARTNO": "Part_001", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": "2020-02-27 00:00:00", "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "enn", "CREATE_DATE": "2012-10-19 13:10:44", "UPDATE_USER": "Admin", "UPDATE_DATE": "2020-02-27 12:33:10", "RELEASE_QUANTITY": 0.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "20121019-0002", "WO": "20121019-0002", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Normal", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Release", "ERP_STATUS": null, "QUANTITY": 1000.0, "ERP_QUANTITY": 0.0, "UNIT": "片", "QTY_1": 0.0, "UNIT_1": "0", "QTY_2": 0.0, "UNIT_2": "0", "UNRELEASE_QUANTITY": 0.0, "UNRELEASE_QTY_1": 0.0, "UNRELEASE_QTY_2": 0.0, "LOT_SIZE": 10.0, "ROUTE_VER_SID": "GTI12090317461000029", "ROUTE": "流程_001", "ROUTE_VERSION": 1.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12090318000300056", "PARTNO": "Part_001", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": null, "BOM_SID": null, "BOM_VERSION": null, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": null, "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": null, "ERP_WIP_QTY": null, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": null, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": null, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": null, "WAFER_THICKNESS": null, "WAFER_SIZE": null, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": 0.0, "ATTRIBUTE_12": 0.0, "ATTRIBUTE_13": 0.0, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "Admin", "CREATE_DATE": "2012-10-19 13:17:02", "UPDATE_USER": "Joseph", "UPDATE_DATE": "2020-05-14 14:08:02", "RELEASE_QUANTITY": 1000.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": null, "SCARP_QTY1": null, "SCARP_QTY2": null, "TERMINATED_QUANTITY": null, "TERMINATED_QTY1": null, "TERMINATED_QTY2": null, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "20121112-0001", "WO": "20121112-0001", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Normal", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Release", "ERP_STATUS": null, "QUANTITY": 1000.0, "ERP_QUANTITY": null, "UNIT": "g", "QTY_1": null, "UNIT_1": null, "QTY_2": null, "UNIT_2": null, "UNRELEASE_QUANTITY": 0.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 100.0, "ROUTE_VER_SID": "GTI12090317461000029", "ROUTE": "流程_001", "ROUTE_VERSION": 1.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12090318000300056", "PARTNO": "Part_001", "PARTNO_VERSION": 1.0, "PRIORITY": "1", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "Admin", "CREATE_DATE": "2012-11-12 09:33:41", "UPDATE_USER": "Admin", "UPDATE_DATE": "2012-11-12 09:33:54", "RELEASE_QUANTITY": 1000.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "20121129-0001", "WO": "20121129-0001", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Normal", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Release", "ERP_STATUS": null, "QUANTITY": 30.0, "ERP_QUANTITY": null, "UNIT": "片", "QTY_1": null, "UNIT_1": null, "QTY_2": null, "UNIT_2": null, "UNRELEASE_QUANTITY": 0.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 1.0, "ROUTE_VER_SID": "GTI12112916063601954", "ROUTE": "組裝測試流程", "ROUTE_VERSION": 1.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12112916155401972", "PARTNO": "140-DBR1394A", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "Willie", "CREATE_DATE": "2012-11-29 16:27:39", "UPDATE_USER": "Willie", "UPDATE_DATE": "2012-11-29 16:29:10", "RELEASE_QUANTITY": 30.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "20121129-0002", "WO": "20121129-0002", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Normal", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Release", "ERP_STATUS": null, "QUANTITY": 20.0, "ERP_QUANTITY": null, "UNIT": "片", "QTY_1": null, "UNIT_1": null, "QTY_2": null, "UNIT_2": null, "UNRELEASE_QUANTITY": 0.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 1.0, "ROUTE_VER_SID": "GTI12112917191402129", "ROUTE": "組裝測試流程", "ROUTE_VERSION": 2.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12112916155401972", "PARTNO": "140-DBR1394A", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "Willie", "CREATE_DATE": "2012-11-29 17:23:47", "UPDATE_USER": "Willie", "UPDATE_DATE": "2012-11-29 17:24:06", "RELEASE_QUANTITY": 20.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }, { "WO_SID": "20121130-0001", "WO": "20121130-0001", "SO": null, "SO_TYPE": null, "SO_SEQ": null, "PO": null, "PO_TYPE": null, "PO_SEQ": null, "WO_TYPE": "Normal", "WO_TYPE2": null, "WO_TYPE3": null, "STATUS": "Release", "ERP_STATUS": null, "QUANTITY": 20.0, "ERP_QUANTITY": null, "UNIT": "片", "QTY_1": null, "UNIT_1": null, "QTY_2": null, "UNIT_2": null, "UNRELEASE_QUANTITY": 0.0, "UNRELEASE_QTY_1": null, "UNRELEASE_QTY_2": null, "LOT_SIZE": 1.0, "ROUTE_VER_SID": "GTI12113016442402465", "ROUTE": "組裝測試流程", "ROUTE_VERSION": 3.0, "PRODUCT_SID": "GTI12090317332700014", "PRODUCT": "產品_001", "PARTNO_VER_SID": "GTI12112916155401972", "PARTNO": "140-DBR1394A", "PARTNO_VERSION": 1.0, "PRIORITY": "3", "OWNER": null, "CUSTOMER": null, "BONDED_FLAG": "F", "BONDED_NO": null, "SCHEDULEDATE": null, "DUEDATE": null, "ERP_CREATE_DATE": null, "ERP_FINISH_DATE": null, "FINISH_DATE": null, "CREATEDATE": null, "MIN_START_DATE": null, "PRE_START_DATE": null, "ROOT_WO_SID": null, "PARENT_WO_SID": null, "PARENT_WO_TYPE": null, "FACTORY": null, "MODIFY_FLAG": "N", "BOM_SID": null, "BOM_VERSION": 0.0, "BOM_CREATE_DATE": null, "CONFIRM_FLAG": "N", "SCHEDULE_QTY": null, "ERP_RECEIVE_QTY": 0.0, "ERP_WIP_QTY": 0.0, "AREA_SID": null, "AREA_NO": null, "INVENTORY_TYPE": null, "LINE_NAME": null, "CONFIRM_DATE": null, "CONFIRM_USER": null, "PACKAGE_UNIT_QTY": 0.0, "PACKAGE_UNIT": null, "SIGN_STATUS": null, "CUST_PART_NO": null, "CUST_PART_NO_SID": null, "CUST_PART_NO_VER_SID": null, "GROSS_DIE_QTY": 0.0, "PM_USER": null, "SHIPPING_ADDRESS": null, "SHIPPING_ADDRESS1": null, "URGENT_FLAG": "N", "WAFER_THICKNESS": 0.0, "WAFER_SIZE": 0.0, "RECEIVE_NO": null, "RECEIVE_NO_TYPE": null, "ERP_COMMENT": null, "MES_COMMENT": null, "ERP_COMMENT1": null, "ERP_COMMENT2": null, "ERP_COMMENT3": null, "ERP_COMMENT4": null, "ATTRIBUTE_01": null, "ATTRIBUTE_02": null, "ATTRIBUTE_03": null, "ATTRIBUTE_04": null, "ATTRIBUTE_05": null, "ATTRIBUTE_06": null, "ATTRIBUTE_07": null, "ATTRIBUTE_08": null, "ATTRIBUTE_09": null, "ATTRIBUTE_10": null, "ATTRIBUTE_11": null, "ATTRIBUTE_12": null, "ATTRIBUTE_13": null, "ATTRIBUTE_14": null, "ATTRIBUTE_15": null, "ATTRIBUTE_16": null, "CREATE_USER": "Willie", "CREATE_DATE": "2012-11-30 16:47:58", "UPDATE_USER": "Willie", "UPDATE_DATE": "2012-11-30 16:49:03", "RELEASE_QUANTITY": 20.0, "RELEASE_QTY_1": 0.0, "RELEASE_QTY_2": 0.0, "YIELD": null, "SCARP_QUANTITY": 0.0, "SCARP_QTY1": 0.0, "SCARP_QTY2": 0.0, "TERMINATED_QUANTITY": 0.0, "TERMINATED_QTY1": 0.0, "TERMINATED_QTY2": 0.0, "ECN": null, "STOCK_QTY": null, "RELEASE_DATE": null, "ECN_SID": null, "ECN_NO": null, "ECN_NAME": null, "WO_LINE_SID": null, "WO_LINE_NO": null, "WO_LINE": null }]
    }

    var _fn = {
        base(..._extArgs){
            var _base = {
                inheritAttrs: false,
                props: {
                    label: String,
                    value: Vue.prototype.$PropDef.FullType(),
                    readonly: {
                        type: Boolean,
                        default: false
                    }
                },
                computed: {
                    inputListeners: function () {
                        var vm = this;
                        // `Object.assign` merges objects together to form a new object
                        return Object.assign({},
                        // We add all the listeners from the parent
                        this.$listeners,
                        // Then we can add custom listeners or override the
                        // behavior of some listeners.
                        {
                            // This ensures that the component works with v-model
                            input: function (event) {
                                debugger
                                vm.$emit('input', event.target.value)
                            }
                        }
                        )
                    }
                }
            }
            _.merge(_base,..._extArgs)
            return _base;
        },
        el_mode(){
            return _fn.base({
                template: `
                    <el-col :md="12" :xs="24">
                        <el-row>
                            <slot name="lable" >
                                <el-col :span="8" :xs="24">
                                    {{label}}
                                </el-col>
                            </slot>
                            <el-col :span="16" :xs="24">
                                <slot>
                                    <input type="text"
                                        v-bind="$attrs"
                                        v-bind:value="value"
                                        v-bind:readonly="readonly"
                                        v-on="inputListeners"
                                        class="form-control"
                                        />
                                </slot>
                            </el-col>
                        </el-row>
                    </el-col>
                `
            });
        },
        bts_mode(){
            return _fn.base({
                template: `
                <div class="form-group col-lg-6 col-sm-12">
                    <slot name="lable" >
                        <label class="col-lg-4 col-sm-4 control-label">{{label}}</label>
                    </slot>
                    <div class="col-lg-8 col-sm-8">
                        <slot>
                            <input type="text"
                                v-bind="$attrs"
                                v-bind:value="value"
                                v-bind:readonly="readonly"
                                v-on="inputListeners"
                                class="form-control"
                                />
                        </slot>
                    </div>
                </div>
                `
            });
        }
        ,bts4_options(){
            var _obj = {
                template: `
                <div :class="[classByVer(false)]">
                    <div v-for="(item) in list" :class="[classByVer()]">
                        <input :type="type"  
                            :name="name"  
                            :value="item"
                            v-model="checked"  />
                        {{item}}
                    </div>
                </div>
                `,
                props:{
                    type:{
                        type:String,
                        default:'radio'
                    },
                    name:{
                        type:String,
                        default:"grp"
                    },
                    value:{
                        type: [String,Array,Object],
                        default(){
                            return null;
                        }
                    },
                    list:{
                        type:Array
                    },
                    bts_ver:{
                        type:[Number,String],
                        default:3
                    }
                },
                computed:{
                    checked:{
                        get(){
                            return this.value;
                        },
                        set(val){
                            //console.log([val,this.value]);
                            this.$emit('input', val);
                        }
                    }
                },
                methods: {
                    classByVer(isItems=true){
                        var chk = `${this.bts_ver}${isItems?'B':'A'}`;
                        var r = ""
                        switch(chk){
                            case "3A":
                                r = "row";
                                break;
                            case "3B":
                                r = "col-md-2";
                                break;
                            case "4A":
                                r = "d-flex justify-content-start";
                                break;
                            case "4B":
                                r = "p-2";
                                break;
                        }
                        return r;
                    },
                },
            }
            return _obj;
        },
        power_form_base(arg){
            var _vue = {
                inheritAttrs:false,
                props:{
                    quick:{
                        type:Array,
                    },
                    form_base:{
                        type:Object,
                    },
                    filed_map:{
                        type:Object
                    },
                    debug:{
                        default:false
                    }
                },   
                data(){
                    return {
                        form:{},
                        FiledMap:{
                            input:'input',
                            select:'el-select',
                            checkbox:'el-checkbox',
                            radio:'el-radio',
                            date:'el-date-picker',
                            textarea:'el-input-pw-ext',
                        }
                    }
                },
                mounted(){
                    if (this.filed_map !=undefined){
                        this.FiledMap = _.merge(this.FiledMap,this.filed_map);
                    }
                    this.__mode_quick();
                    this.__mode_std();
                },
                watch: {
                    quick(){
                        this.__mode_quick();
                    },
                    form_base(){
                        this.__mode_std();
                    }
                },
                methods:{
                    __mode_quick(){
                        if (this.quick ==undefined || this.form_base != undefined ) return ;
                        var _r = {};
                        _.each(this.quick,(label)=>{
                            var _base = {
                                label,
                                type:this.FiledMap.input,
                                val:''
                            }
                            if (this.debug) _base.val = label;
                            _r[label]=_base;
                        })
                        this.form = _r;
                    },
                    __mode_std(){
                        if (this.form_base == undefined ) return ;
                        var _self = this;
                        var _r = {};
                        _.each(this.form_base,(val,label)=>{
                            var _t = typeof(val);
                            var _base = {
                                label,
                                type:_self.FiledMap.input,
                                val
                            }
                            switch(_t){
                                case "string":
                                    if (val.substr(0,1) == '~'){
                                        _base.type = _self.FiledMap.textarea;
                                    }
                                    //基於轉換處理的考量,先不自動把日期字段判斷為日期物件
                                    //else if (isNaN(Date.parse(val))==false){}
                                    break;
                                // case "number":break;
                                case "boolean":
                                    _base.type = _self.FiledMap.checkbox;
                                    break;
                                case "object":
                                    if (_.isNull(val)){
                                    }else if (_.isArray(val)){
                                        _base.type = _self.FiledMap.select;
                                        _base.src= val;
                                        if (val.length !=0){
                                            _base.type +='-pw-ext';
                                        }
                                    }else if (_.isDate(val)){
                                        _base.type = _self.FiledMap.date;
                                    }else if (_.isPlainObject(val)){
                                        let {checkbox,radio,textarea,select,src,type,label} = val;
                                        if (type != null && label != null){
                                            console.log(val);
                                            _base = val;
                                            break;
                                        } 
                                        if (textarea!=null){
                                            _base.type = _self.FiledMap.textarea    ;
                                            _base.val = textarea;
                                        }
                                        if (checkbox!=null){
                                            _base.type =_self.FiledMap.checkbox;
                                            _base.val 
                                                = _.isArray(checkbox)
                                                ? checkbox
                                                : [checkbox]
                                                ;
                                        }else if (radio!=null){
                                            _base.type =_self.FiledMap.radio;
                                            _base.val = radio;
                                        }else if (select!=null){
                                            _base.type =_self.FiledMap.select;
                                            _base.val = select;
                                        }
                                        if (src !=null){
                                            _base.src = src;
                                            _base.type +="-pw-ext";
                                        }
                                    }
                                    break;
                            }
                            _r[label]= _base;
                        })
                        this.form = _r;
                    }
                }
            }
            return _.merge(_vue,arg);
        }
        ,power_form_el(){
            return _fn.power_form_base({
                template: `
                <el-row>
                    <el-grp-filed 
                        v-for="(item,key) in form"
                        :label="item.label"
                        :key=key
                        v-model="item.val"
                        >
                        <component
                            :ops="item"
                            :is="item.type"
                            v-if="item.type!='input'"    
                            v-model="item.val"
                            >
                            </component>
                        </el-grp-filed>
                </el-row>
                `,
            });
        },
        power_form_bts(){
            return _fn.power_form_base({
                template: `
                <div class="form-horizontal gt-form">
                    <div v-for="(item,key) in form">
                        <bts-grp-filed 
                            :label="item.label"
                            :key=key
                            v-model="item.val">
                            <component
                                :ops="item"
                                :is="item.type"
                                v-if="item.type!='input'"    
                                v-model="item.val">
                            </component>
                        </bts-grp-filed>
                    </div>
                </div>
                `,
                methods:{
                    genCode(arg){
                        var tpl = {
							main(list,_form){
                                return `form:${JSON.stringify(_form,null,'\t')}
<div class="form-horizontal gt-form">${list.join('')}
</div>`;
							},
							item(key,item){
								var isBaseType =  (item.type=='input');
								var _model = `v-model="form.${key}"`;
                                return `\n\t<bts-grp-filed label="${item.label}" ${isBaseType?_model:''}>${tpl.byType(isBaseType,_model,item)}</bts-grp-filed>`
							},
							byType(isBaseType,_model,item){
								if (isBaseType) return "";
								return `\n\t\t<${item.type} ${_model} />\n\t`
							}
						};
                        var list = []
                        var _form = {};
						_.each(arg,(val,key)=>{
                            list.push(tpl.item(key,val));
                            _form[key]=key;
						})
                        return tpl.main(list,_form);
                    }
                }
            });
        },

        power_form_el_options(arg){
            if (_.isString(arg)){
                arg = {
                    template: `
                    <el-${arg}-group v-model="val">
                        <el-${arg} v-for="(item) in list" :label="item" :key="item" /> 
                    </el-${arg}-group>
                    `,
                }
            }
            var _vue = _.merge({
                inheritAttrs:false,
                props:{
                    value:{
                        type:[Object,Array,String]
                    },
                    ops:{
                        type:Object
                    }
                },
                computed:{
                    list(){
                        let {src=[]} = this.ops;
                        return src;
                    },
                    val:{
                        get(){
                            return this.value;
                        },
                        set(val){
                            this.$emit('input',val);
                        }
                    }
                }
            }
            ,arg) ;
            return _vue;
        },
        power_form_el_select(){
            var _vue =  _fn.power_form_el_options({
                template: `
                <el-select v-model="val" clearable placeholder="请选择">
                    <el-option
                        v-for="item in list"
                        :key="item"
                        :label="item"
                        :value="item" />
                </el-select>
                `,
            });
            //console.log(_vue);
            return _vue ;
        },
        power_form_el_input(){
            var _vue = {
                inheritAttrs:false,
                template:`
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="val">
                    </el-input>
                `,
                props:{
                    value:{
                        type:String
                    },
                },
                computed:{
                    val:{
                        get(){
                            return this.value;
                        },
                        set(val){
                            this.$emit('input',val);
                        }
                    }
                }
            };
            return _vue;
        },
        jqDataTables_def(useColumnDefs=false) {
            var _arg = {
                columns: [
                    { title: "工單編號", "data": "WO_SID" },
                    { title: "狀態", "data": "STATUS" },
                    { title: "產品", "data": "PRODUCT" },
                    { title: '料號', "data": 'PARTNO' },
                    { title: '流程', "data": 'ROUTE' },
                    { title: '數量', "data": 'QUANTITY' },
                    { title: '投產數量', "data": 'RELEASE_QUANTITY' },
                    { title: '未發放數量', "data": 'UNRELEASE_QUANTITY' },
                    { title: '建立日期', "data": 'CREATE_DATE', }
                ],
                responsive: true,
                searching: false,
            }
            if (useColumnDefs){
                _arg.columnDefs= [
                    {
                        className: 'e_click', "targets": [0, 4]
                        , createdCell(td, cellData, rowData, row, col) {
                            $(td).html(`<a href='javascript:void(0)'>${cellData}</a>`);
                        }
                    }
                ]
            }
            return _arg;
        },
        jqDataTables() {
            var _vue = {
                template: `
                    <div>
                        <table ref="jqDT" class="display" width="100%"></table>
                    </div>
                    `,
                data() {
                    return {
                        jqDT: {},
                        ops: {}
                    }
                },
                props: {
                    //jqDataTables 原生設定, 沒傳入採 jqDataTables_def()
                    jdt_set: {
                        type: Object,
                        default: null
                    },
                    //基本數據, 沒傳入採 _data.WO
                    jdt_data: {
                        type: Array,
                        default: null
                    },
                    //自動生成欄位 ['colA','colB'...] ,會依此自動產生欄位和數據,
                    // 但若 jdt_data !=null 則此參數不會作用
                    auto_col: {
                        type: Array,
                        default: null
                    }
                },
                mounted() {
                    var _self = this;
                    _self.ops =  {
                        data: _self.jdt_data,
                        set: _self.jdt_set,
                        auto: _self.auto_col != null
                    }
                    if (_self.ops.data == null) {
                        _self.ops.data = _data.WO;
                    }

                    if (_self.ops.set == null) {
                        _self.ops.set = _fn.jqDataTables_def(true);
                        if (_self.jdt_data != null && _self.jdt_data.lenth != 0) {
                            _self.ops.auto = false;
                            var _col = [];
                            _.each(_self.jdt_data[0], (val, key) => {
                                _col.push({ title: key, data: key });
                            })
                            _self.ops.set.columns = _col;
                        }
                    }
                    _self.jqDT = $(_self.$refs.jqDT);
                    _self.render(false);
                },
                watch:{
                    auto_col(){
                        this.fn_AutoCol();
                    }
                },
                methods:{
                    fn_AutoCol(){
                        debugger
                        if (this.auto_col == null) return ;
                        var _ops = _fn.jqDataTables_def();
                        var _col_count = _ops.columns.length-1;
                        var columns = [];
                        _.each(this.auto_col,(title,idx)=>{
                            var _idx = _.random(_col_count)
                            columns.push({title,data:_ops.columns[_idx].data})
                        });
                        this.ops.set = _.assign(_ops,{columns});
                        this.render();
                    },
                    fn_jdt_set(){
                        if (this.jdt_set == null) return;
                        this.ops.set = this.jdt_set;
                        this.render();
                    },
                    reset(){
                        this.jqDT
                            .DataTable()
                            .clear()
                            .destroy();
                        this.jqDT.empty();
                    },
                    render(need_reset = true){
                        if (need_reset) this.reset();

                        let {set,data} = this.ops;
                        var _set = Object.assign({},set);
                        this.jqDT
                            .DataTable(_set)
                            .clear()
                            .rows
                            .add(data)
                            .draw();
                    },
                    getOps(toString=false,ZipMode=false){
                        debugger
                        let {set=null} = this.ops;
                        if (set == null){
                            console.log('set 無資料!')
                            return ''
                        }
                        if (!toString) return set;
                        
                        var s = ZipMode 
							?JSON.stringify(set).replace(/\"/gi,"'")
							:JSON.stringify(set,null,'\t')
							;
						return s;
                    },
                    genCode(arg){
                        var _code =`
    var _set = ${JSON.stringify(arg,null,'\t')};
    var jqDT = $(this.$refs.jqDT);
    jqDT.DataTable(_set);

    <table ref="jqDT" class="display" width="100%"></table>
                        `;
                        return _code;
                    }

                }
            }
            return _vue;
        },
    }
    Vue.component('el-grp-filed', _fn.el_mode());
    Vue.component('bts-grp-filed', _fn.bts_mode());
    Vue.component('bts-options', _fn.bts4_options());
    Vue.component('power-form-bts', _fn.power_form_bts());
    Vue.component('power-form-el', _fn.power_form_el());
    Vue.component('el-radio-pw-ext', _fn.power_form_el_options('radio'));
    Vue.component('el-checkbox-pw-ext', _fn.power_form_el_options('checkbox'));
    Vue.component('el-select-pw-ext', _fn.power_form_el_select());
    Vue.component('el-input-pw-ext', _fn.power_form_el_input());
    Vue.component('demo-jq-dtable', _fn.jqDataTables());
}));
