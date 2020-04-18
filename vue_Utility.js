(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //AMD
        define(['jquery', 'Vue'], factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory(require('jquery'), require('Vue'));
    } else {
        //浏览器全局变量(root 即 window)
        factory(root.jQuery, root.Vue);
    }
}(this, function ($, Vue) {
    var _i18n = {
        Face: {
            close: 'Close',
            ACTION_REASON: 'AppReason',
            No: 'No',
            Yes: 'Yes',
        },
        i18n_Message: {
            FieldRequired: '{0} is required.'
        }
    }

    var fn = {
        init_Alert(ops, type) {
            if (typeof (ops) === "string") {
                ops = Alert.genOps({ title: ops });
            }
            ops.type = type;
            Swal.fire(ops);
        },
        i18n_Face: null,
        i18n_Message: null,
        _face() {
            if (fn.i18n_Face == null) {
                if (fn.getgUTApp('i18n_Face') == false) return _i18n.Face;
            }
            return fn.i18n_Face;
        },
        _message() {
            if (fn.i18n_Message == null) {
                if (fn.getgUTApp('i18n_Message') == false) return _i18n.Message;
            }
            return fn.i18n_Message;
        }
        , getgUTApp(objName) {
            if (window['gUTApp'] != null) {
                var obj = window['gUTApp'][objName];
                if (obj != null) {
                    fn[objName] = obj;
                    return true;
                }
            };
            return false;
        }
    }

    var Alert = {
        genConfirm(ops = {}) {
            var _o = {
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: fn._face().No,
                showConfirmButton: true,
                confirmButtonText: fn._face().Yes
            }
            return Object.assign(_o, ops);
        },
        genOps(ops) {
            var _o = {
                type: 'info',
                timer: 1000 * 10,
                showConfirmButton: true,
                confirmButtonText: fn._face().close
            }
            return Object.assign(_o, ops);
        },
        Success(ops) {
            var _ops = fn.init_Alert(ops, 'success');
        },
        Err(ops) {
            var _ops = fn.init_Alert(ops, 'error');
        },
        Info(ops) {
            var _ops = fn.init_Alert(ops, 'info');
        },
        Warning(ops) {
            var _ops = fn.init_Alert(ops, 'warning');
        },

    }

    var PropDef = {
        FunVisable() {
            return {
                type: [Boolean, Function],
                default: false
            };
        },
        Fun() {
            return {
                type: Function,
                default(cb) {
                    if (typeof (cb) == "function") cb();
                }
            };
        }
    }

    var _URL = {
        get baseURL() {
            if (window['gUTApp'] != null) {
                let { baseURL } = window['gUTApp'];
                return baseURL;
            }
            return "";
        },
        /**
         * @param {any} newPath
         * @param {any} newParams 
         * 以3態模式設計 , 0-boolean)預設,保留當前 url 的參數 
         * , 1-null)回傳值不包含 params 
         * , 2-PlanObject)以 PlanObject 模式,傳回新的 params
         */
        chg_Path(newPath, newParams = false) {
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



    if (Vue != null) {
        Vue.prototype.$i18n_Face = fn._face;
        Vue.prototype.$i18n_Message = fn._message;
        Vue.prototype.$Alert = Alert;
        Vue.prototype.$PropDef = PropDef;
        Vue.prototype.$URL = _URL;
    }
    return { Alert };
}));
