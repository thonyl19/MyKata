import * as _ from 'lodash';
import path from "path";
let ejs = require('ejs');
let moment = require('moment');
var part = {
	parse(Src,_){
		let {toolbar} = Src;
		var Html_Code = [],
			Vue_Computed = [],
			Vue_Methods=[]
			;
		_.each(toolbar,(val,key)=>{
			switch(key){
				case "Cfg":
					Html_Code.push(val);
					break;
				default:
					var fun = `${key}`;
					if (val==1){
						Vue_Computed.push(key);
						fun = `v_${key.substr(2)}`;
					}
					var _method 
						= _.isString(val)
						? `${key}${val}`
						: `${key}(){}`
						;
					_method
					Html_Code.push(`:${key}="${fun}"`);
					Vue_Methods.push(_method); 
					break;
			}
		})
		_.set(Src, 'toolbar.Html_Code', Html_Code);
		_.set(Src, 'toolbar.Vue_Computed', Vue_Computed);
		_.set(Src, 'toolbar.Vue_Methods', Vue_Methods);
		return Src;
	}
}

var _test = {
    x:{
        "工單編號": {
            "$": {
                "_prevClass": "label-horizontal col-lg-4 col-sm-3"
            },
            "label": {
                "$": {
                    "0": {
                        "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                    },
                    "length": 1
                },
                "html": "<label class=\"label-horizontal col-lg-4 col-sm-3\"><!----> \n                                工單編號\n                        </label>"
            },
            "filed": {
                "$": {
                    "0": {
                        "_prevClass": "col-lg-8 col-sm-9 col-xs-12"
                    },
                    "length": 1,
                    "prevObject": {
                        "0": {
                            "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                        },
                        "length": 1
                    }
                },
                "html": "<input placeholder=\"Please Input\" type=\"input\" col_styl=\"\" class=\"form-control\">"
            }
        },
        "狀態": {
            "$": {
                "_prevClass": "label-horizontal col-lg-4 col-sm-3"
            },
            "label": {
                "$": {
                    "0": {
                        "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                    },
                    "length": 1
                },
                "html": "<label class=\"label-horizontal col-lg-4 col-sm-3\"><!----> \n                                狀態\n                        </label>"
            },
            "filed": {
                "$": {
                    "0": {
                        "_prevClass": "col-lg-8 col-sm-9 col-xs-12"
                    },
                    "length": 1,
                    "prevObject": {
                        "0": {
                            "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                        },
                        "length": 1
                    }
                },
                "html": "<div class=\"gt-vue-selectize\"><select placeholder=\"請選擇\" multiple=\"multiple\" tabindex=\"-1\" class=\"selectized\" style=\"display: none;\"></select><div class=\"selectize-control multi\"><div class=\"selectize-input items not-full has-options form-control\" style=\"display: block !important\"><input type=\"text\" autocomplete=\"off\" tabindex=\"\" placeholder=\"請選擇\" style=\"width: 49px;\"></div></div></div> <!----> <!---->"
            }
        },
        "優先順序": {
            "$": {
                "_prevClass": "label-horizontal col-lg-4 col-sm-3"
            },
            "label": {
                "$": {
                    "0": {
                        "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                    },
                    "length": 1
                },
                "html": "<label class=\"label-horizontal col-lg-4 col-sm-3\"><!----> \n                                優先順序\n                        </label>"
            },
            "filed": {
                "$": {
                    "0": {
                        "_prevClass": "col-lg-8 col-sm-9 col-xs-12"
                    },
                    "length": 1,
                    "prevObject": {
                        "0": {
                            "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                        },
                        "length": 1
                    }
                },
                "html": "<!----> <!----> <div class=\"vue-selectize-group-para input-group bd-fix\" style=\"display: block !important;\"><!----> <!----> <span><select tabindex=\"-1\" class=\"selectized\" style=\"display: none;\"><option value=\"\" selected=\"selected\"></option></select><div class=\"selectize-control single\"><div class=\"selectize-input items not-full form-control\" style=\"display: block !important\"><input type=\"text\" autocomplete=\"off\" tabindex=\"\" style=\"width: 4px;\"></div></div></span></div>"
            }
        },
        "料號": {
            "$": {
                "_prevClass": "label-horizontal col-lg-4 col-sm-3"
            },
            "label": {
                "$": {
                    "0": {
                        "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                    },
                    "length": 1
                },
                "html": "<label class=\"label-horizontal col-lg-4 col-sm-3\"><!----> \n                                料號\n                        </label>"
            },
            "filed": {
                "$": {
                    "0": {
                        "_prevClass": "col-lg-8 col-sm-9 col-xs-12"
                    },
                    "length": 1,
                    "prevObject": {
                        "0": {
                            "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                        },
                        "length": 1
                    }
                },
                "html": "<!----> <div class=\"x-vue-selectize-grp input-group bd-fix\"><div class=\"input-group-addon btn\"><i aria-hidden=\"true\" class=\"fa fa-search\"></i></div> <select placeholder=\"請選擇\" tabindex=\"-1\" class=\"selectized\" style=\"display: none;\"><option value=\"\" selected=\"selected\"></option></select><div class=\"selectize-control single\"><div class=\"selectize-input items not-full form-control\" style=\"display: block !important\"><input type=\"text\" autocomplete=\"off\" tabindex=\"\" placeholder=\"請選擇\" style=\"width: 49px;\"></div></div> <!----></div> <!---->"
            }
        },
        "流程": {
            "$": {
                "_prevClass": "label-horizontal col-lg-4 col-sm-3"
            },
            "label": {
                "$": {
                    "0": {
                        "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                    },
                    "length": 1
                },
                "html": "<label class=\"label-horizontal col-lg-4 col-sm-3\"><!----> \n                                流程\n                        </label>"
            },
            "filed": {
                "$": {
                    "0": {
                        "_prevClass": "col-lg-8 col-sm-9 col-xs-12"
                    },
                    "length": 1,
                    "prevObject": {
                        "0": {
                            "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                        },
                        "length": 1
                    }
                },
                "html": "<!----> <div class=\"x-vue-selectize-grp input-group bd-fix\"><div class=\"input-group-addon btn\"><i aria-hidden=\"true\" class=\"fa fa-search\"></i></div> <select placeholder=\"請選擇\" tabindex=\"-1\" class=\"selectized\" style=\"display: none;\"><option value=\"\" selected=\"selected\"></option></select><div class=\"selectize-control single\"><div class=\"selectize-input items not-full form-control\" style=\"display: block !important\"><input type=\"text\" autocomplete=\"off\" tabindex=\"\" placeholder=\"請選擇\" style=\"width: 49px;\"></div></div> <!----></div> <!---->"
            }
        },
        "線別名稱": {
            "$": {
                "_prevClass": "label-horizontal col-lg-4 col-sm-3"
            },
            "label": {
                "$": {
                    "0": {
                        "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                    },
                    "length": 1
                },
                "html": "<label class=\"label-horizontal col-lg-4 col-sm-3\"><!----> \n                                線別名稱\n                        </label>"
            },
            "filed": {
                "$": {
                    "0": {
                        "_prevClass": "col-lg-8 col-sm-9 col-xs-12"
                    },
                    "length": 1,
                    "prevObject": {
                        "0": {
                            "_prevClass": "label-horizontal col-lg-4 col-sm-3"
                        },
                        "length": 1
                    }
                },
                "html": "<!----> <div class=\"x-vue-selectize-grp input-group bd-fix\"><div class=\"input-group-addon btn\"><i aria-hidden=\"true\" class=\"fa fa-search\"></i></div> <select placeholder=\"請選擇\" multiple=\"multiple\" tabindex=\"-1\" class=\"selectized\" style=\"display: none;\"></select><div class=\"selectize-control multi\"><div class=\"selectize-input items not-full form-control\" style=\"display: block !important\"><input type=\"text\" autocomplete=\"off\" tabindex=\"\" placeholder=\"請選擇\" style=\"width: 49px;\"></div></div> <!----></div> <!---->"
            }
        }
    },
    QueryForm:{
        input: new RegExp(`(\<input)(.)+(type\=\\"input\\")(.)+(\>)`),
        gt_vue_selectize: new RegExp(`\<div class=\\"gt-vue-selectize\\"\>`),

        
    },
    xx(object){
        /*
        判斷 特定名稱 , 再判斷 物件類型
        */

    },
    '*'(){
        _.each(_test.x,(v,k)=>{
            var _html = v.filed.html;
            var z = _test.QueryForm.gt_vue_selectize.test(_html);
            z
        })
    }
}


_.each([_test],(_fn)=>{
    _.each(_fn,(e,k)=>{
        if (k.substr(0,1)=="*"){
            e();
        }
    })
})