import XLSX from 'xlsx';
import * as _ from 'lodash';
import path from "path";


(()=>{
    var _filePath = path.join(__dirname,'./_demo.xlsx');
    const workbook = XLSX.readFile(_filePath);//q, opts);

    var fn = {
        讀取sheets(){
            const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
            return sheetNames;
        },
        getSheet1(){
            let sheets = fn.讀取sheets();
            var _sht = workbook.Sheets[sheets[0]];
            return _sht;
        },
        '讀取A1'(){
            // 獲取 A1 中的值
            let a1 = fn.getSheet1()['A1'];
            a1;
        },
        '_test'(){
            //https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/234185/
            let worksheet = fn.getSheet1();
            var t = {
                A:worksheet['!ref'],
                B:worksheet['!range'],
                C:worksheet['!merges'] 
            } 
            t            
        },
        '_'(){ },
        '_'(){ },
    }

    _.each(fn,(e,k)=>{
        if (k.substr(0,1)=="_"){
            e();
        }
    })
})()