(()=>{
    const _ = require('lodash');
    const fs = require('fs');
    
    let Txt_App = {
        AutoCopy(){
            document.querySelector();
            window.getSelection()
            document.execCommand('copy');
        },
        Replace(Target,Old,New){
            var reg = new RegExp(Old,'gi');
            return Target.replace(reg, New);
        },
        條件換行(Target,SplitWord,isKeepSplitWord=false){
            let arr = Target.split(SplitWord);
            let _join = `${isKeepSplitWord?SplitWord:""}\n`
            return arr.join(_join);
        },
        清前後空白(Target,isAutoJoin=true){
            let arr = Target.split('\n');
            let r = []
            arr.forEach(el => {
                r.push(el.trim());
            });
            if (isAutoJoin){
                return r.join('\n') ;
            }
            return r;
        },
        SplitByLine(Target,AutoTrim=true){
            let arr = AutoTrim 
                ? Txt_App.清前後空白(Target,false)
                : Target.split('\n');
            return arr;
        },
        字串集結(Target,LineSpan=-1,AutoTrim=true,JoinSplitWord=""){
            let arr = Txt_App.SplitByLine(Target,AutoTrim);
            if (LineSpan == -1){
                return arr.join(JoinSplitWord);
            }
        },
        字串補定長(Target,LineSpan = null ,AddWord=" ",AddAfter=true,AutoTrim=true,isAutoJoin=true){
            let arr = Txt_App.SplitByLine(Target,AutoTrim);
            let r = []
            arr.forEach(el => {
                if (LineSpan!=null){
                    if (AddAfter){
                        el = el.padEnd(LineSpan,AddWord);
                        
                    }else{
                        el = el.padStart(LineSpan,AddWord);
                    }
                } 
                r.push(el);
            });
            if (isAutoJoin){
                return r.join('\n') ;
            }
            return r;
        },
        FormatTab(Target,tabs,isAutoJoin=true){
            let _tab = _.repeat('\t',tabs);
            let r = []
            Target
            if (_.isString(Target)) Target = Target.split('\n');
            _.each(Target,(line)=>{
                r.push(`${_tab}${line}`);
            })
            if (isAutoJoin) return r.join('\n');
            return r;
        },
        

    }
    let UIUT = {
        save(data){
            fs.writeFileSync('./quka/Txt_App.txt',data,'utf-8');
        },
        formatTab(data,tabs){
            let _tab = _.repeat('\t',tabs);
            let r = []
            if (data instanceof String) data = data.split('\n')
            _.each(data,(line)=>{
                r.push(`${_tab}${line}`);
            })
            return r.join('\n');
        },
        ReplaceGrp(UiSet){
            let sets = {
                中線_底線:["-","_"],
                左斜_右斜:['\\',"/"],
            };
            let r = {};
            for(var key in sets){
                let [keyA,keyB] = key.split('_');
                let [valA,valB] = sets[key];
                UiSet[`${keyA}轉${keyB}`]={
                    Old:valA,
                    New:valB,
                    fn:Txt_App.Replace
                }
                UiSet[`${keyB}轉${keyA}`]={
                    Old:valB,
                    New:valA,
                    fn:Txt_App.Replace
                }
            }
            return r;
        },
        Exec(act){
            A= "A-_-\\- /--"
            act;
            //let B = act.fn(A);
            let B = act(A);
            //Copy()
            return B;
        },
        Exec1(act){
            A= "   A-_--\\- /   "
            act;
            if (act instanceof Function){
                return act(A);
            }
            let args = [];
            for (var key in act){
                args.push(act[key]);
            }
            let B = act.fn(A,...args);
            //let B = act.fn(A);
            //Copy()
            return B;
        }
        ,formatUI(UiSet){
            let r = {};
            for(var itemName in UiSet){
                let item = UiSet[itemName];
                let _item = {};
                for(var _name in item){
                    let Value = item[_name];
                    let _arg = {
                        ui:'el-input',
                        Value
                    }
                    if (_.isBoolean(Value)){
                        _arg.ui = 'el-checkbox';
                    }else if (Value instanceof Array){
                        
                    }else if (_.isPlainObject(Value)){

                    }else if (_.isFunction(Value)){
                        _arg.ui = 'el-button';
                    }
                    _item[_name] = _arg;
                }
                r[itemName] = _item;
            }
            return r ;
        },
        getUI(UiSet){
            let r = [];
            _.each(UiSet,(el,key)=>{
                let el_code = []
                _.each(el,(param,pname)=>{
                    if (_.isFunction(param.Value)) {
                        el_code.push(UIUT.genExec(param,[key,pname]));
                    }else{
                        el_code.push(UIUT.genParamObj(param,[key,pname]));
                    }
                })
                let z = UIUT.genForm(el_code.join('\n'),key);
                r.push(z);
            })
            return `<ul class="main">${r.join('\n')}</ul>`;
        },
        genParamObj(ParamObj,paths){
            let {ui} = ParamObj;
            let code = 
`<el-form-item label="${paths[1]}">
    <${ui} v-model="UiSet.${paths.join('.')}"></${ui}>
</el-form-item> `
            return code;
        },
        genExec(ParamObj,paths){
            let {ui} = ParamObj;
            let code = 
`<el-form-item>
    <${ui} type="primary" @click="Exec1(UiSet.${paths[0]})" >Exec</${ui}>
</el-form-item> `
            return code;
        },
        genForm(paramCode,key){
            let code = 
`<li><A href=#>
    <div><label>${key}</label>
    <el-form ref="form" size="mini" label-width="80px" class="form-area">
${Txt_App.FormatTab(paramCode,2)}
    </el-form></div></A></li>`
            
            return code;

        },
    }
    
     
    let UiSet = {
        置換文字:{
            Old:"",
            New:"",
            fn:Txt_App.Replace
        },
        FormatTab:{
            tabs:1,
            fn:Txt_App.FormatTab
        },
        條件換行:{
            SplitWord:'_',
            isKeepSplitWord:false,
            fn:Txt_App.條件換行
        },
        清前後空白:{
            isAutoJoin:true,
            fn:Txt_App.清前後空白
        }
        // test:{
        //     A:"",
        //     B:true,
        //     //C:[1,2,3],
        //     //D:{A:1}
            
        // }
    }

    //let ReplaceGrp = UIUT.ReplaceGrp(UiSet); 
    UiSet = UIUT.formatUI(UiSet);
    UiSet
    let code = UIUT.getUI(UiSet);
    code
    UIUT.save(code);
    let z 
        //= UIUT.Exec1(UiSet.右斜轉左斜);
        //= Txt_App.條件換行("1,\t2,3","\t")
        //= Txt_App.條件換行("1,\t2,3","\t")
        //= Txt_App.字串集結("1     \n 2     \n",-1,false,",")
        //= Txt_App.字串補定長("1     \n 2     \n",5,"-",false)
        //    = fn.Exec(fn.置換文字);
    z;
    let z1 = UIUT
        //.Exec1(ReplaceGrp.中線轉底線)
        //.Exec1(UiSet.條件換行)
    //z1

    
})()