let views = {
  "css-jss用例"() {
    /*
            Ref:
                https://cssinjs.org/jss-api?v=v10.0.3
                https://cssinjs.org/?v=v10.0.3
            */
    var styles = `{
                wrapper {
                    padding: 40px;
                    background: #f7df1e;
                    text-align: center;
                    color: "red";
                },
            }
            `;

    var _jss = jss.create();
    const { classes } = _jss.createStyleSheet(styles).attach();
    var _vue = {
      template: `
                <div>
                    <A class="${classes.wrapper}">test</A>
                </div>`
    };
    return { _vue };
  },
  "css-sc用例1"() {
    /*
            Ref: vue-styled-components
            */
    var Wrapper = styled.default.div`{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding: 50px;
                color: #444;
                border: 1px solid #1890ff;
            }
            `;
    Vue.component("Wrapper", Wrapper);

    var _vue = {
      template: `
                <div>
                    <Wrapper  >test</Wrapper>
                </div>`
    };
    return { _vue };
  },
  "css-sc用例2"() {
    var _css = `
                .wrapper {
                    padding: 50px;
                    color: red;
                    border: 1px solid #1890ff;
                }
                `;

    var _vue = {
      template: `
                <div>
                    <div class="wrapper">test</div>
                </div>`
    };
    return { _vue, _css };
  },
  FontAwesome() {
    var _vue = {
      template: `
                <dl class="flex f-col">
                    <dt>[旋轉範例]</dt>
                    <dd>
                        <i class="fa fa-spinner fa-spin"></i>
                        <i class="fa fa-refresh fa-spin"></i>
                        <i class="fa fa-cog fa-spin"></i>
                    </dd>
                    <dt>[觸發旋轉]</dt>
                    <dd>
                        <i class="fa fa-quote-left fa-2x pull-left fa-border" @click="case1"></i>
                    </dd>
                    <dt>[Stacked Icons(疊圖)]</dt>
                    <dd>
                        <span class="fa-stack fa-lg">
                                <i class="fa fa-square-o fa-stack-2x"></i>
                                <i class="fa fa-twitter fa-stack-1x"></i>
                        </span>
                        fa-twitter on fa-square-o<br>
                        <span class="fa-stack fa-lg">
                            <i class="fa fa-circle fa-stack-2x"></i>
                            <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
                        </span>
                        fa-flag on fa-circle<br>
                        <span class="fa-stack fa-lg">
                            <i class="fa fa-square fa-stack-2x"></i>
                            <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
                        </span>
                        fa-terminal on fa-square<br>
                        <span class="fa-stack fa-lg">
                            <i class="fa fa-camera fa-stack-1x"></i>
                            <i class="fa fa-ban fa-stack-2x text-danger"></i>
                        </span>
                        fa-ban on fa-camera
                    </dd>
                </dl>`,
      methods: {
        case1() {}
      }
    };
    return { _vue };
  },

  "text-shadow"() {
    /* 用例說明
            1.主要是動態呈現  text-shadow 的效果.
            2.應用 html5 input.type="range" 做數字控制
            3.應用 Vue :style 的動態樣式控制
            4.應用 Vue 的 dom style.cssText 處理
            5.應用 watch 機制
            */
    var _vue = {
      template: `
                <div>
                    {{range}}<input type="range" min="1" max="10" v-model="range" class="slider" id="myRange">
                    <div ref="styObj" :style="styleObject">text-shadow</div>
                    <div>{{styleObject}}</div>
                    <div>cssText:{{sty}}</div>
                </div>`,
      data() {
        return {
          range: 10,
          sty: ""
        };
      },
      computed: {
        styleObject() {
          return {
            "font-size": "30px",
            color: "rgba(0,0,0,0)",
            "text-shadow": `0 0 ${this.range}px rgba(255,0,0,1)`
          };
        }
      },
      watch: {
        styleObject() {
          let { styObj } = this.$refs;
          if (styObj != null) {
            this.sty = styObj.style.cssText;
          }
        }
      }
    };
    return { _vue };
  },
  "dl-flex"() {
    /* 用例說明
            1.dl 套用 flex 的呈現
            2.input.radio 的使用
            3.v-for 無法直接在 input 內使用,估計是因為 input 沒有 end tag ,
                所以只能利用 li 再隔一層   
 
            */
    var _css = `
                .case-dl-flex dt ,
                .case-dl-flex dd
                {
                    border:ridge red 1px;
                }
                `;
    var _vue = {
      template: `
                <div class="case-dl-flex">
                    <ul>
                       <li v-for="(item, idx) in list"><input type="radio" v-model="group" :value=idx />{{item}}</li>
                    </ul>
                    <dl :class="sty">
                        <dt>dt</dt>
                        <dt>dt</dt>
                        <dd><BR /><BR /><BR /><BR /><BR /></dd>
                    </dl>
                </div>`,
      data() {
        return {
          list: ["原始", "f-col", "f-row"],
          group: 0
        };
      },
      computed: {
        sty() {
          if (this.group == 0) return "";
          return `flex ${this.list[this.group]}`;
        }
      }
    };
    return { _vue, _css };
  },
  "fa-fw"() {
    /*
            Ref:https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons
            1.使用 fa-fw 設定, 讓 fa 的項目可以不被圖片大小影響 到 整個外圍的 tag
            2.學習使用 :stype :class 的動態設定方式
            */
    var _vue = {
      template: `
                <div>
                    <input type="checkbox" v-model="set" />fa-fw <br />
                    {{range}}<input type="range" min="1" max="10" v-model="range" class="slider" id="myRange">
                    <div  :style="{fontSize:range +'rem' }">
                        <div><i class="fa fa-edit" :class="{'fa-fw':set}" style="background:DodgerBlue"></i></div>
                        <div><i class="fa fa-remove" :class="{'fa-fw':set}" style="background:SkyBlue"></i></div>
                    </div>
                </div>
                `,
      data() {
        return {
          set: true,
          range: 1
        };
      }
    };
    return { _vue };
  },
  "linear-gradient"() {
    var _obj = {
      _vue: {
        template: `
                    <div class="lg">
                        [linear-gradient]{{myRange}}<input type="range" min="10" max="360" v-model="myRange" class="slider" >
                        <h1 ref="styObj">資料統計</h1>
                        <textarea  v-model="csstxt"></textarea>
                    </div>
                    `,
        data() {
          return {
            myRange: 10
          };
        },
        mounted() {
          this.$refs.styObj.style.cssText = this.csstxt;
        },

        computed: {
          csstxt() {
            debugger;
            let _css = `
                                margin: 1em;
                                border-radius: 10px;
                                box-sizing:border-box;
                                border-width:1px;
                                border-style:solid;
                                border-color:rgba(121, 121, 121, 1);
                                background:linear-gradient(${this.myRange}deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(0, 255, 153, 1) 100%, rgba(0, 255, 153, 1) 100%);
                            `;
            let { styObj } = this.$refs;
            if (styObj != null) {
              styObj.style.cssText = _css;
            }
            return _css;
          }
        }
        /*
                    //以下是經過簡化後, 不需要的方法,留存備忘
                    methods:{
                        bindCss(){
                            let {styObj} = this.$refs;
                            if (styObj != null){
                                styObj.style.cssText = this.csstxt;
                            }
                        }
                    },
                    watch:{
                        // csstxt(){
                        //     this.bindCss()
                        // },
                        
                        不 work
                        'this.$refs.styObj.style.cssText'(){
                            debugger
                        }
                        
                        原本的作用是希望在初始化時,就處理一次,但 因為 styObj 是 null,
                            所以不 work 留存備忘之
                        csstxt:{
                            immediate: true, // makes the watcher fire on first render, too.
                            handler() {
                                debugger
                                let {styObj} = this.$refs;
                                if (styObj != null){
                                    styObj.style.cssText = this.csstxt;
                                }
                            }
                        }
                    }
                    */
      }
    };
    return _obj;
  },
  animation() {
    /*
            Ref:
                https://www.oxxostudio.tw/articles/201803/css-animation.html
                https://www.gradient-animator.com/
            */
    var _obj = {
      _css: `
                .sample1{
                    position: relative;
                    left:0;
                    width:50px;
                    height:50px;
                    background:#f00;
                    animation-name:oxxo;
                    animation-duration:2s;
                    animation-iteration-count:infinite
                }
                @keyframes oxxo{
                    from{
                        left:0;
                    }
                    to{
                        left:100px;
                    }
                }

                .sample2{
                    margin: 1em;
                    border-radius: 10px;
                    box-sizing: border-box;
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgba(121, 121, 121, 1);
                    background: linear-gradient(var(--pos,10deg), rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%, rgba(0, 255, 153, 1) 100%, rgba(0, 255, 153, 1) 100%);
                    animation: gradient 2s linear infinite;
                    
                    
                }
                @keyframes gradient {
                    0% { 
                        --pos:10deg; 
                    } 
                    100% { 
                        --pos:360deg; 
                    }
                }
                `,
      // animation: gradient 2s infinite ;
      // animation-name:gradient;
      //     animation-duration:2s;
      //     animation-iteration-count:infinite;
      _vue: {
        template: `
                    <div>
                        <div class="sample1"></div>
                        <h1 class="sample2">sample2</h1>
                    </div>`
      }
    };
    return _obj;
  },
  animation_Case() {
    /*
            Ref:
                https://codepen.io/thebabydino/pen/BxxMwg
                https://codepen.io/thebabydino/pen/pVVYKL
                https://codepen.io/thebabydino/pen/bMMJWK
            */
    var _obj = {
      _vue: {
        template: `
                    <div>
                    </div>`
      }
    };
    return _obj;
  },
  
  scroll() {
    /*
    [Ref]
      http://webkit-scroll-gen.sourceforge.net/
      https://codepen.io/GhostRider/pen/GHaFw
     */

    var _obj = {
      _css:`
        :root {
          --webkit_scrollbar:7px;
          --webkit_scrollbar-button:3px;
        }
        @keyframes oxxo{
          0%{
          }
          100%{
              overflow-x: hidden !important;
              overflow-y: hidden !important;
          }
      }

        .sty-scroll {
          margin-bottom: .35em;
          overflow-y: auto;
          width:60rem;
          height:10rem;
        }
        .sty-scroll.hover:hover{
          overflow-x: scroll !important;
          overflow-y: scroll !important;
        }
        .sty-scroll.hover{
          -webkit-animation: oxxo 3s ease 1 normal;
          -moz-animation: oxxo 3s ease 1 normal;
            -o-animation: oxxo 3s ease 1 normal;
               animation: oxxo 3s ease 1 normal;
          overflow-x: hidden !important;
          overflow-y: hidden !important;
        }
        .sty-scroll::-webkit-scrollbar-track {
          border-radius: 10px;
          background: rgba(0,0,0,0.1);
          //border: 1px solid #62C905;
        }
        
        .sty-scroll::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          border-radius: 10px;
          background-color: #F5F5F5;
        }
        
        .sty-scroll::-webkit-scrollbar-thumb:hover {
          background: #fff;
        }
        
        .sty-scroll::-webkit-scrollbar-thumb:active {
          background: linear-gradient(left, #22ADD4, #1E98BA);
        }

        .sty-scroll::-webkit-scrollbar {
          width: var(--webkit_scrollbar); 
          height:var(--webkit_scrollbar); 
          background: rgba(0,0,0,0);
        }

        .sty-scroll::-webkit-scrollbar-button {
          width: var(--webkit_scrollbar_button); 
          height:var(--webkit_scrollbar_button); 
          background: rgba(0,0,0,0);
        }
      `,
      _vue: {
        template: `
          <div >
            <input type="checkbox" v-model="AutoHide" @click="AutoHide=!AutoHide" />[AutoHide]{{AutoHide}} <br/>
            <input type="range" v-model.num="webkit_scrollbar" min=3 max=20   />滑軌主體size[webkit-scrollbar]{{webkit_scrollbar}} <br/>
            <input type="range" v-model.num="webkit_scrollbar_button" min=0 max=30   />滑軌內部兩端保留空間size[webkit_scrollbar_button]{{webkit_scrollbar_button}} <br/>
            
            <div class="sty-scroll" :class="[AutoHide?'hover':'']">
              <iframe src="vue.htm" scrolling="no" style="width:150%;height:150%;"></iframe>
            </div>
          </div>`,
          data(){
            return {
              AutoHide : false,
              webkit_scrollbar:7,
              webkit_scrollbar_button:3,
              form:{
                webkit_scrollbar_track:{
                  radius:10
                }
              }
            }
          },
          methods:{
            setProp(key,val){
              document.documentElement.style.setProperty(key,val);
            }
          },
          watch:{
            webkit_scrollbar(){
              this.setProp('--webkit_scrollbar', this.webkit_scrollbar + 'px');
            },
            webkit_scrollbar_button(){
              this.setProp('--webkit_scrollbar_button', this.webkit_scrollbar_button + 'px');
            }

          }

      }
    };
    return _obj;
  },

  'margin 的問題'() {
    /*
    [Ref]
      https://css-tricks.com/box-sizing/

    使用 magin 需要注意, 在 width:100% 的情形下,無論 box-sizing 是那一種模式,
       margin 跟 width:100 會有衝突造成跑版的情形, 基本上 ,
       如果是要滿邊且內縮的需求, 單獨使用 margin 即可. 
       但高度的部份 就需要再找解法了,
    
    */
    var _obj = {
      _css:`
      .sty-div{
        margin:.5em;
        height:100%;
      }
      .border-box{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing:border-box;
      }
      .content-box{
        -webkit-box-sizing:content-box;
        -moz-box-sizing: content-box;
        box-sizing:content-box;
      }
      .width100{
        width:100%;
      }
      `,
      _vue: {
        template: `
          <div>
            <button @click="mode = mode=='border-box'?'content-box':'border-box'">{{mode}}</button>
            <div style="width:10em;height:10em" class="area-mk" :class=[mode]>
              <div class="sty-div area-mk" :class="[width100?'width100':'',mode]" @click="width100=!width100">[isWidth100]{{width100}}</div>
            </div>
          </div>
          `
        ,data(){
          return {
              mode:'border-box',
              width100:true
          }
        }
      }
    };
    return _obj;
  },
  iframe() {
    var _obj = {
      _css:`
      .sty-iframe{
        margin:.5em;
        height:100%;
      }
      `,
      _vue: {
        template: `
            <x-tpl-sample-range>
              <div class="sty-iframe area-mk"></div>
            </x-tpl-sample-range>
          `
        ,data(){
          return {
            width:10,
            height:10
          }
        }
      }
    };
    return _obj;
  },
  'PageFoot'() {
    /*
    [Ref]
      https://hongkiat.github.io/on-scroll-footer/
    */
    var _obj = {
      _vue: {
        template: `
                    <div>
                    </div>`
      }
    };
    return _obj;
  },
  std() {
    var _obj = {
      _vue: {
        template: `
                    <div>
                    </div>`
      }
    };
    return _obj;
  }
};

window.sample = { views ,def:'scroll' };
