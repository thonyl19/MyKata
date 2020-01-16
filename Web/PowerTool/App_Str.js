(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'));
    } else {
        //浏览器全局变量(root 即 window)
        root['App_Str'] = factory(root.jQuery);
    }
}(this, function ($) {
    String.prototype.format = function (args) {
        var str = this;
        return str.replace(String.prototype.format.regex, function (item) {
            var intVal = parseInt(item.substring(1, item.length - 1));
            var replace;
            if (intVal >= 0) {
                replace = args[intVal];
            } else if (intVal === -1) {
                replace = "{";
            } else if (intVal === -2) {
                replace = "}";
            } else {
                replace = "";
            }
            return replace;
        });
    };
    String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

    let Txt_App = {
        Replace(Target, Old, New) {
            var reg = new RegExp(Old, 'gi');
            return Target.replace(reg, New);
        },
        條件換行(Target, SplitWord, isKeepSplitWord = false) {
            let arr = Target.split(SplitWord);
            let _join = `${isKeepSplitWord ? SplitWord : ""}\n`
            return arr.join(_join);
        },
        清前後空白(Target, isAutoJoin = true) {
            let arr = Target.split('\n');
            let r = []
            arr.forEach(el => {
                r.push(el.trim());
            });
            if (isAutoJoin) {
                return r.join('\n');
            }
            return r;
        },
        SplitByLine(Target, AutoTrim = true) {
            let arr = AutoTrim
                ? Txt_App.清前後空白(Target, false)
                : Target.split('\n');
            return arr;
        },
        字串集結(Target, AutoTrim = true, JoinSplitWord = null) {
            let arr = Txt_App.SplitByLine(Target, AutoTrim);
            if (JoinSplitWord != null) {
                return arr.join(JoinSplitWord);
            }
            return arr;
        },
        字串補定長(Target, LineSpan, AddWord = " ", AddAfter = true, AutoTrim = true, isAutoJoin = true) {
            let arr = Txt_App.SplitByLine(Target, AutoTrim);
            let r = []
            arr.forEach(el => {
                if (LineSpan != null) {
                    if (AddAfter) {
                        el = el.padEnd(LineSpan, AddWord);

                    } else {
                        el = el.padStart(LineSpan, AddWord);
                    }
                }
                r.push(el);
            });
            if (isAutoJoin) {
                return r.join('\n');
            }
            return r;
        },
        FormatTab(Target, tabs, isAutoJoin = true) {
            let _tab = _.repeat('\t', tabs);
            let r = []
            if (_.isString(Target)) Target = Target.split('\n');
            Target.forEach((line) => {
                r.push(`${_tab}${line}`);
            });
            if (isAutoJoin) return r.join('\n');
            return r;
        },
        _ts_escaped(val){
            var s1 = "{}[]-/\\()*+?.%$|".replace(RegExp(".", "g"), "\\$&");
            var s2 = RegExp(`[${s1}]`,'g');
            var s3 = val.replace(s2, "\\$&");
            return new RegExp(s3);
        },
        _tpl_RegEx(idx) {
            return new RegExp(`({)?\\{${idx}\\}(?!})`, 'gm')
        },
        Tpl_ByLine(Target, tpl, col_split = ",", AutoTrim = true, isAutoJoin = true) {
            debugger
            let arr = Txt_App.SplitByLine(Target, AutoTrim);
            var _reg = new RegExp(col_split);//Txt_App._ts_escaped(col_split);
            var r = [];
            arr.forEach((line) => {
                debugger
                let _arr = line.split(_reg);
                r.push(tpl.format(_arr));
            });
            if (isAutoJoin) return r.join('\n');
            return r;
        }
    };
    return Txt_App;
}));
