/*
https://v3.bootcss.com/getting-started/
http://w3c.3306.biz/bootstrap_input_groups/show-35-123-1.html
*/
let Views = {
  Form1() {
    var _vue = {
      template: `
<div class="container-fluid">
	<form class="row">
		<div class="form-group">
			<label class="col-lg-2 col-xs-4 control-label">Email</label>
			<div class="col-lg-4  col-xs-8">
				<p class="form-control-static">email@example.com</p>
			</div>
		</div>
		<div class="form-group">
         <label for="inputPassword" class="col-lg-2  col-xs-4 control-label">Password</label>
         <div class="col-lg-4  col-xs-8">
            <input type="password" class="form-control" id="inputPassword" placeholder="Password">
         </div>
		</div>
	</form>
</div>
`,
    };
    return { _vue };
  },
  Form2() {
    var _vue = {
      template: `
                    <div class="container-fluid">
                        <div class="row">
                            <div class="form-group col-lg-6">
                                <label class="col-sm-3 control-label">Email</label>
                                <div class="col-sm-9">
                                    <p class="form-control-static">email@example.com</p>
                                </div>
                            </div>
                            <div class="form-group col-lg-6">
                                <label for="inputPassword" class="col-sm-3 control-label">Password</label>
                                <div class="col-sm-9">
                                    <input type="password" class="form-control" id="inputPassword" placeholder="Password">
                                </div>
                            </div>
                            <div class="form-group col-lg-6">
                                <label class="col-sm-3 control-label">Email</label>
                                <div class="col-sm-9">
                                    <p class="form-control-static">email@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `,
    };
    return { _vue };
  },
  panel_1() {
    var _css = `
                .b{
                    border: 1px solid rgba(0, 0, 0, 0.12);
                }
                /* ========================================================================
                Component: slim-scroll.less
                ========================================================================== */
                [data-scrollable] {
                    display: block;
                }

                .slimScrollBar {
                    opacity: 1 !important;
                    background-color: rgba(0, 0, 0, 0.35) !important;
                    border: 0 !important;
                    border-radius: 1px !important;
                }

                .slimScrollRail {
                    opacity: 1 !important;
                    background-color: rgba(0, 0, 0, 0.15) !important;
                    border: 0 !important;
                    border-radius: 0 !important;
                    bottom: 0;
                }
                .sty_img{
                    content:url("../img/head.png");
                }
                `;
    var _vue = {
      template: `
                    <div class="panel b">
         <div class="panel-heading">
            <div class="pull-right label label-danger">5</div>
            <div class="pull-right label label-success">12</div>
            <div class="panel-title">Team messages</div>
         </div>
         <!-- START list group-->
         <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 180px;"><div data-height="180" data-scrollable="" class="list-group" style="overflow: hidden; width: auto; height: 180px;">
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                     <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">2h</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-success circle-lg text-left"></span>Catherine Ellis</strong>
                     <p class="mb-sm">
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                     <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">3h</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-success circle-lg text-left"></span>Jessica Silva</strong>
                     <p class="mb-sm">
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla facilisi.</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                  <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">4h</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-danger circle-lg text-left"></span>Jessie Wells</strong>
                     <p class="mb-sm">
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                  <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">1d</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-danger circle-lg text-left"></span>Rosa Burke</strong>
                     <p class="mb-sm">
                        <small>Cras sit amet nibh libero, in gravida nulla. Nulla...</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
            <!-- START list group item-->
            <a href="#" class="list-group-item">
               <div class="media-box">
                  <div class="pull-left">
                  <img  alt="Image" class="media-box-object img-circle thumb32 sty_img">
                  </div>
                  <div class="media-box-body clearfix">
                     <small class="pull-right">2d</small>
                     <strong class="media-box-heading text-primary">
                        <span class="circle circle-danger circle-lg text-left"></span>Michelle Lane</strong>
                     <p class="mb-sm">
                        <small>Mauris eleifend, libero nec cursus lacinia...</small>
                     </p>
                  </div>
               </div>
            </a>
            <!-- END list group item-->
         </div><div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 34px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 104.18px;"></div><div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
         <!-- END list group-->
         <!-- START panel footer-->
         <div class="panel-footer clearfix">
            <div class="input-group">
               <input type="text" placeholder="Type message .." class="form-control input-sm">
               <span class="input-group-btn">
                  <button type="button" class="btn btn-default btn-sm"><i class="fa fa-paperclip"></i>
                  </button>
               </span>
            </div>
         </div>
         <!-- END panel-footer-->
      </div>
`,
    };
    return { _vue, _css };
  },
  panel_label() {
    /*
                1.變動 頁籤 色調風格
                2.radio 套用 vue 
                3.class 搭配 vue 動態變更樣式的方法
                */
    var _obj = {
      _css: `
                        .panel-heading-1{
                            margin:0px;
                            padding:3px 10px 0 15px;
                            border       : 1px solid #ccc;
                            border-radius: 3em 1em 0 0 ;
                            border-bottom:0px !important;
                            background:linear-gradient(130deg, transparent 30% , #557777 50%);
                        }
                        .panel-heading-2{
                            margin:0px;
                            padding:3px 10px 0 15px;
                            border       : 1px solid #ccc;
                            border-radius: 3em 1em 0 0 ;
                            border-bottom:0px !important;
                            background:linear-gradient(top,white,#0099FF);
                            background:-moz-linear-gradient(top,white,#0099FF);
                            background:-webkit-linear-gradient(top,white,#0099FF);
                        }
                        `,
      _vue: {
        template: `
                <div>{{sel}}
                    <ul>
                        <li v-for="(idx) in list">
                        <input type=radio v-model.number="sel" :value="idx" />
                        {{idx}}</li>
                    </ul>
                    <label class="panel-heading">Head</label>
                    <div class="panel panel-default" v-bind:class="[sel == 1 ? 'panel-heading-1' : 'panel-heading-2']" >
                        Panel content
                    </div>
                    <div class="panel panel-default" v-bind:class="['panel-heading-'+sel]" >
                        Panel content
                    </div>
                    
                </div>
                `,
        data() {
          return {
            sel: 1,
            list: [1, 2],
          };
        },
      },
    };
    return _obj;
  },

  ".row 兩欄式"() {
    var _vue = {
      template: `
      <div class="row">
      <div class="col-lg-2 col-xs-4">
          <label class=" control-label">Email</label>
      </div>
      <div class="col-lg-4  col-xs-8">
          <input ref="LOT" class="form-control col-lg-4  col-xs-8" type="text" 
/>
      </div>
      <div class="col-lg-2 col-xs-4">
          <label class=" control-label">Email</label>
      </div>
      <div class="col-lg-4  col-xs-8">
          <input ref="LOT" class="form-control col-lg-4  col-xs-8" type="text" 
           />
      </div>
      <div class="col-lg-2 col-xs-4">
          <label class=" control-label">Email</label>
      </div>
      <div class="col-lg-4  col-xs-8">
          <input ref="LOT" class="form-control col-lg-4  col-xs-8" type="text" 
           />
      </div>
  </div>
`,
    };
    return { _vue };
  },
  ".form-horizontal"() {
    var _note = `
        <pre>
        </pre>
        `;
    var _obj = {
      _css: `
            .form-horizontal .form-group {
               margin-left: 0px !important; 
               
            }
            .col-lg-8 , .col-sm-8 ,
            .col-lg-4 , .col-sm-4 ,
            .col-lg-6 , .col-sm-12 {
               padding-right: 7px !important;
               padding-left: 0px !important;
            }
         `,
      _vue: {
        template: `
              <div>
                 ${_note}
                 <form class="form-horizontal">
                  <div class="form-group col-lg-6 col-sm-12">
                     <label for="inputEmail3" class="col-lg-4 col-sm-4 control-label">Email</label>
                     <div class="col-lg-8 col-sm-8">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                     </div>
                  </div>
                  <div class="form-group col-lg-6 col-xs-12">
                     <label for="inputEmail3" class="col-lg-4 col-xs-4 control-label">Email</label>
                     <div class="col-lg-8 col-xs-8">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
                     </div>
                  </div>
               </form>
              </div>
              `,
      },
    };
    return _obj;
  },
};
var Tool = {
  std11() {
    var _note = `
         <pre>
         </pre>
         `;
    var _obj = {
      _vue: {
        template: `
               <div>
                  ${_note}
                  <textarea style="height:5em;" v-model="tpl_code">
                  </textarea>
                  <textarea style="height:3em;" v-model="sets" @change="on_change">
               </textarea>
               <div v-html="sample"></div>
               </div>
               `,
        data() {
          return {
            sets: `label
<input type="text" class="form-control" placeholder="" v-model="">`,
            tpl_code: `<div class="form-group col-lg-6 col-xs-12">
                           <label class="col-lg-4 col-xs-4 control-label">{label}</label>
                           <div class="col-lg-8 col-xs-8">{input}</div>
                        </div>`,
          };
        },
        computed: {
          sample() {
            let { sets } = this;
            if (sets == null) return;
            var arr = sets.split("\n");
            var _code = this.tpl_code;
            arr.forEach((el, idx) => {
              switch (idx) {
                case 0:
                  _code = _code.replace("{label}", el);
                  break;
                case 1:
                  _code = _code.replace("{input}", el);
                  break;
              }
            });
            return _code;
          },
        },
        methods: {
          on_change() {
            alert("test");
          },
        },
      },
    };
    return _obj;
  },
};
let Group = {
  Case1() {
    var _note = `
    <pre>公司UI 的需求 , 主要是將 做版本控制
    
    </pre>
            `;
    var _obj = {
      _css: `
            .switch .form-control {
               padding-top: 7px;
               margin-bottom: 0;
            }

            .switch * {
               cursor: pointer;
            }

            .switch input {
               opacity: 0;
               position: absolute;
               z-index: -1;
            }

            .switch span {
               position: relative;
               display: inline-block;
               width: 40px;
               height: 20px;
               background-color: #fff;
               border: 1px solid #ddd;
               border-radius: 100px;
               transition: all .5s;
               box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1) inset;
               vertical-align: middle;
            }

               .switch span:after {
                  content: "";
                  position: absolute;
                  background-color: #fff;
                  top: 0;
                  left: 0;
                  height: 18px;
                  width: 18px;
                  border: 1px solid #ddd;
                  border-radius: 400px;
                  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
                  -webkit-transition: all .2s;
               }

            .switch.switch-lg span {
               width: 50px;
               height: 25px;
            }

               .switch.switch-lg span:after {
                  height: 23px;
                  width: 23px;
               }

            .switch.switch-sm span {
               width: 30px;
               height: 15px;
            }

               .switch.switch-sm span:after {
                  height: 13px;
                  width: 13px;
               }

            .switch input:checked + span {
               background-color: #5d9cec;
               border-color: #5d9cec;
               transition: all .5s;
            }

               .switch input:checked + span:after {
                  left: 50%;
                  transition: all .2s;
               }

            .switch input:disabled + span {
               background-color: #f1f1f1;
               cursor: not-allowed;
            }

         `,
      _vue: {
        template: `
            <div >
                ${_note}
                <div class="input-group" style="width:30em;">
                  <span class="input-group-addon">@</span>
                  <input type="text" class="form-control" placeholder="Username" aria-describedby="sizing-addon1">
                  <span class="input-group-btn">
                     <button class="btn btn-default" type="button">Go!</button>
                     <span class="btn btn-default">
                        <i class="fa fa-flag"></i>
                     </span>
                     <span class="btn btn-default">
                        <span class="switch" title="啟用/停用">
                           <input type="checkbox" checked="checked" />
                           <span></span>
                        </span>
                     </span>
                  </span>
               </div>
            </div>
            `,
      },
    };
    return _obj;
  },
  官方範例() {
    var _obj = {
      _vue: {
        template: `
            <div>
            <form class="form-inline">
  <div class="form-group has-success has-feedback">
    <label class="control-label" for="inputSuccess4">Input with success</label>
    <input type="text" class="form-control" id="inputSuccess4" aria-describedby="inputSuccess4Status">
    <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
    <span id="inputSuccess4Status" class="sr-only">(success)</span>
  </div>
</form>
<form class="form-inline">
<div class="form-group has-success has-feedback">
  <label class="control-label" for="inputGroupSuccess3">Input group with success</label>
  <div class="input-group">
    <span class="input-group-addon">@</span>
    <input type="text" class="form-control" id="inputGroupSuccess3" aria-describedby="inputGroupSuccess3Status">
  </div>
  <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
  <span id="inputGroupSuccess3Status" class="sr-only">(success)</span>
</div>
</form>
------
<div class="input-group">
  <span class="input-group-addon" id="basic-addon1">@</span>
  <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2">
  <span class="input-group-addon" id="basic-addon2">@example.com</span>
</div>

<div class="input-group">
  <span class="input-group-addon">$</span>
  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
  <span class="input-group-addon">.00</span>
</div>

<label for="basic-url">Your vanity URL</label>
<div class="input-group">
  <span class="input-group-addon" id="basic-addon3">https://example.com/users/</span>
  <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
</div>
            </div>
            `,
      },
    };
    return _obj;
  },
  ".form-group"() {
    var _note = `
         <pre>
         </pre>
         `;
    var dynamic = {
      props: {
        title: String,
        value: {
          type: [String, Object],
          default() {
            return null;
          },
        },
        placeholder: {
          type: String,
          default: "123",
        },
      },
      template: `<div class="form-group col-lg-6 col-sm-12">
                     <slot name="lable" >
                         <label class="col-lg-4 col-sm-4 control-label">{{title}}</label>
                     </slot>
                     <div class="col-lg-8 col-sm-8">
                         <slot>
                             <input type="text" class="form-control" :placeholder="placeholder" v-model="c_val" />
                         </slot>
                     </div>
                   </div>`,
      computed: {
        c_val: {
          get() {
            return this.value;
          },
          set(val) {
            this.$emit("update:value", val);
          },
        },
      },
    };
    var _obj = {
      _css: `
            .form-horizontal .form-group {
               margin-left: 0px !important; 
               
            }
            .col-lg-8 , .col-sm-8 ,
            .col-lg-4 , .col-sm-4 ,
            .col-lg-6 , .col-sm-12 {
               padding-right: 7px !important;
               padding-left: 0px !important;
            }
         `,
      _vue: {
        template: `
               <div>
                  ${_note}
                  <div>[form]{{form}}</div>
                  <div class="row">
                        <dynamic title="批號" :value.sync="form.value_1"></dynamic>
                        <dynamic title="批號">
                           <input type="password" class="form-control" v-model="form.value_2" />
                        </dynamic>
                  </div>
               </div>
               `,
        components: { dynamic },
        data() {
          return {
            form: { value_1: "", value_2: "" },
          };
        },
      },
    };
    return _obj;
  },
  ".btn-group"(_note=null) {
   _note = _note?? `
    <pre>
    因為工作需求的情境,需要想辦法讓 input.text 可以融入 group ,
      所以特別試出這個方法來達成需求. 
    但需要補充一些樣式設定,原本是用 .btn-grp 來處理,
      不過改成以直接綁定的方式效果一樣.
    </pre>
            `;
   var _obj = {
     _css:`
      .btn-grp1,
      input[type='text'].btn
      {
        text-align:left;
        border: 1px solid #ccc;
        width:5em;
      }
      
     `,
     _vue: {
       template: `
        <div>
            ${_note}
          <div class="btn-group" role="group" aria-label="...">
            <input type="text" class="btn btn-grp" />
            <button type="button" class="btn btn-default">Left</button>
            <input type="text" class="btn" />
            <button type="button" class="btn btn-default">Right</button>
            <input type="text" class="btn" />
          </div>
        </div>
        `,
       data() {
         return {};
       },
     },
   };
   return _obj;
 },
 
 ".input-group"() {
   var _note = `
          <pre>
          1.input-group-addon 不適用 button , input.text 之類的 tag ,
            只適用 label span 之類的 tag , 但是可以使用 btn 的樣式,
            以 擬 btn 的方式做應用 
          2. form-control 的樣式只能存在一個 ,不然就產生錯置的情形
          </pre>
           `;
   var _obj = {
     _vue: {
      //  <span class="input-group-addon" id="basic-addon1">@</span>
      //  <span class="input-group-addon btn"  >@</span>
       template: `
                 <div>
                    ${_note}
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1" />
                    </div>
                 </div>
                 `,
       data() {
         return {};
       },
     },
   };
   return _obj;
 },
 ".input-group-btn"() {
   var _note = `
            <pre>
            參考自 http://jsfiddle.net/yLvk5mn1/31/
            但試著做成兩個 input 連在一起,發現不可行....
            </pre>
            `;
   var _obj = {
      
     _vue: {
       template: `
                  <div>
                     ${_note}
                     <div class="input-group" style="margin: 10px;">
                       <span class="input-group-addon">Between</span>
                       <input type="text" class="form-control" placeholder="Type something..." />
                       <input type="text" class="form-control" placeholder="Type something..." />
                       <span class="input-group-addon" style="border-left: 0; border-right: 0;">
                        ----
                       </span>
                       <input type="text" class="form-control" placeholder="Type something..." />
                       </div>
                  </div>
                  `,
       data() {
         return {};
       },
     },
   };
   return _obj;
 },
  std1() {
    var _note = `
         <pre>
         </pre>
         `;
    var _obj = {
      _vue: {
        template: `
               <div>
                  ${_note}
                  <div class="input-group">
                     <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{display}}  <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                           <li v-for="(el,key) in list" @click="selected(el,key)" :class="[sel_key==key?'active':'']" ><a href="#">{{el}}-{{key}}</a></li>
                        </ul>
                     </div>
                  </div>
               </div>
               `,
        data() {
          return {
            list: ["Action", "Another action", "Something else here"],
            sel_key: 0,
            display: "",
          };
        },
        methods: {
          selected(el, key) {
            this.sel_key = key;
            this.display = el;
          },
        },
      },
    };
    return _obj;
  },
 
};
 
let Fail = {
  "input-group"() {
    var _obj = {
      _vue: {
        template: `
             <div>
               <pre>原本主要目的,是要 使用 input-group 將控件形成 group,
               但指定 label 寛度時,就會出現破版的問題</pre>
               <span width="200px" class="area-mk">
                  <div class="form-group input-group">
                        <label class="input-group-addon col-sm-4">label</label>
                        <div class="col-sm-8">
                           <input class="form-control"   required="required" type="text" readonly="readonly">
                        </div>
                  </div>
               </span>
             </div>
             `,
      },
    };
    return _obj;
  },
};
let Vue_Prd = {
  '*std1'() {
      var _note = `
         <pre>bts-grp-filed 的用例
         1.基本型
         2.應用型 - 混搭其他 基本物件 
         3.應用型 - .btn-group 用法,不過,這裡在 RWD 呈現沒,沒有自適應的效果 
         </pre>
         `;
      let {_vue,_css} = Group['.btn-group']('')
      var _obj = {
          _css:``,
         _vue: {
            template: `
               <div>
                  ${_note}
                  <div>[input value]{{value}}</div>
                  <bts-grp-filed 
                    label="基本型" 
                    v-model="value"
                    placeholder="test"
                    ></bts-grp-filed>
                  <bts-grp-filed 
                    label="應用型" 
                    >
                      <input type="checkbox" v-model="_check_value"/>
                    </bts-grp-filed>
                  <bts-grp-filed 
                    label="搭配 .btn-group" 
                    >
                      <dyn class="input-group-btn"/>
                    </bts-grp-filed>
               </div>
               `,
            components:{dyn:_vue},
            data(){
               return {
                value:''
              }
            },
            computed: {
              _check_value:{
                get(){
                  if (typeof(this.value)!='boolean') return true;
                  return this.value;
                },
                set(val){
                  this.value=val;
                }
              }
            }, 
         }
      };
      return _obj;
   },
}
window.sample = { Views, Tool, Group, Fail, Vue_Prd};
