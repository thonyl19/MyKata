/*
[Ref]
https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F
https://regex101.com/codegen?language=csharp
https://regexr.com/
*/

import * as _ from 'lodash';

var fn = {
    'Base'(){
        let githubURL = new URL('https://github.com/search?test=1');
        githubURL
        var searchParams1 = new URLSearchParams('q=react&type=Code');
        githubURL
        var g1 = githubURL.searchParams.get('test');
        
        g1
        


        console.log(searchParams1.has('q'))
        console.log(searchParams1.has('q1'))
        // 方法二：代入陣列
        var searchParams2 = new URLSearchParams([['q', 'react'], ['type', 'Code']]);

        // 方法三：代入物件
        var searchParams3 = new URLSearchParams({q: 'react', type: 'Code'});

        // 都會得到一樣的結果
        var c = searchParams1.toString();
        c
        var r = {searchParams1,searchParams2,searchParams3};
        r
        githubURL.pathname = "/MES/WorkOrder/GroupPara";
        //searchParams 為 get only ,所以沒辦法直接用
        //githubURL.searchParams = searchParams3;
        
        //必須得用這樣方式來處理 
        githubURL.search = `?${searchParams1.toString()}`

        githubURL
        var r1 = githubURL.toString();
        r1
        var g = typeof({});
        g
    }, 
    '_'(){
        let githubURL = new URL('https://github.com/');
        //產生 #exa
        githubURL.hash = "exa";
        githubURL
        
        // const state = { 'page_id': 1, 'user_id': 5 }
        // const title = ''
        // const url = 'hello-world.html'

        // history.pushState(state, title, url)
       
    },
    'MVC 中的應用程序'(){
        var _URL = {
            get baseURL() {
                /*
                    這是在 MVC 的頁面中,找一處執行以下的語法 ,
                    讓相對 RootUrl 可以直接寫進去 
                    window['gUTApp'] = {baseURL :'@Url.Content("~/")'};
                */
                if (window['gUTApp'] != null) {
                    let { baseURL } = window['gUTApp'];
                    return baseURL;
                }
                return "";
            },
            /**
             * @param {any} newPath
             * @param {any} newParams 
             * 以3態模式設計 
             *   0-boolean)預設,保留當前 url 的參數 
             *   1-null)回傳值不包含 params 
             *   2-PlanObject)以 PlanObject 模式,傳回新的 params
             */
            chg_Path(newPath, newParams = false) {
                debugger
                var _url = new URL(location);
                _url.pathname = `${_URL.baseURL}${newPath}`;
                switch (typeof (newParams)) {
                    case "boolean":
                        _url.search = "";
                        break;
                    case "object":
                        if (newParams == null) {
                            return `${_url.origin}${_url.pathname}`
                        } else {
                            var _params = new URLSearchParams(newParams);
                            _url.search = `?${_params.toString()}`
                        }
                        break;
                }
                return _url.toString();
            }
        }

    }
}

_.each(fn,(e,k)=>{
    if (k.substr(0,1)=="_"){
        e();
    }
})