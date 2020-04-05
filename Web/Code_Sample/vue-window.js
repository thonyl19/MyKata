/*
雖然是可以使用 cdn 做為來源,但必須使用 以下 路徑的檔案,才能正常執行
  vue-window@2.4.2/standalone/dist/vue-window-standalone.js
*/
WINDOW_STYLE_KEY = '@hscmap/vue-window/windowStyle';
function StyleFactory(windowStyle) {
    return {
        provide: function () {
            var _a;
            return _a = {}, _a[WINDOW_STYLE_KEY] = windowStyle, _a;
        },
        render: function (h) {
            return h('div', this.$slots.default);
        },
    };
}
StyleBlack = StyleFactory({
    window: {
        color: '#fff',
        boxShadow: '0 0 6pt rgba(255, 255, 255, 0.75)',
        backgroundColor: 'rgba(31, 31, 31, 0.9)'
    },
    titlebar: {
        backgroundColor: 'rgba(63, 63, 63, 0.9)'
    },
    content: {},
    button: {
        color: 'white'
    },
    buttonHover: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)'
    },
    buttonActive: {
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
});
StyleWhite = StyleFactory({
    window: {
        color: '#000',
        boxShadow: '0 2pt 4pt rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(239, 239, 239, 0.95)'
    },
    titlebar: {
        backgroundColor: 'rgba(191, 191, 191, 0.9)'
    },
    content: {},
    button: {
        color: '#000'
    },
    buttonHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    buttonActive: {
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});
StyleMetal = StyleFactory({
    window: {
        color: '#000',
        boxShadow: '0 4pt 8pt rgba(0, 0, 0, 0.5)',
        background: 'linear-gradient(to bottom, rgb(215, 215, 215), rgb(191, 191, 191))'
    },
    titlebar: {
        background: 'linear-gradient(to bottom, rgb(215, 215, 215), rgb(191, 191, 191))'
    },
    content: {},
    button: {
        color: '#000'
    },
    buttonHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    buttonActive: {
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});

let Views = {
  Base() {
    //Vue.use(require('@hscmap/vue-window'));
      var _obj = {
         _vue:{
            template: `
            <hsc-window-style-metal>

    <hsc-window title="Window 1">
      Parameters:
      <fieldset>
        <legend>&alpha;</legend>
        <input type="range" />
      </fieldset>
      <fieldset>
        <legend>&beta;</legend>
        <input type="range" />
      </fieldset>
    </hsc-window>

    <hsc-window title="Window 2">
      Parameters:
      <fieldset>
        <legend>&gamma;</legend>
        <input type="range" />
      </fieldset>
      <fieldset>
        <legend>&delta;</legend>
        <input type="range" />
      </fieldset>
    </hsc-window>

  </hsc-window-style-metal>
            `
         }};
      return _obj;
   },
   'Close Button'() {
       var _obj = {
          _vue:{
             template: `
             <hsc-window-style-metal>

              <hsc-window title="Window 1" :closeButton="true" :isOpen.sync="isOpen">
                Parameters:
                <fieldset>
                  <legend>&alpha;</legend>
                  <input type="range" />
                </fieldset>
                <fieldset>
                  <legend>&beta;</legend>
                  <input type="range" />
                </fieldset>
              </hsc-window>

              <button @click="isOpen = ! isOpen">Toggle Window 1</button>

            </hsc-window-style-metal>
             `,
             data() {
              return {
                isOpen: true,
              }
            },
          }};
       return _obj;
    },
    Themes() {
        var _note=`<pre>這個範例搞了很久才搞定,主要的問題是因為 ,
        1.範例程式本身是以於 file:// 架構在運行,所以無法避開 Cross-Origin 的問題
        2.因為本範例中,使用的 StyleFactory 本身是使用 Typescript 實作,
          在問題1的前題下,也沒辦法使用 babel 相關技術來解決.
        最後解決方法,就是用 devTools 把範例中轉譯好的 style.ts
          https://michitaro.github.io/vue-window/?Sample7
        直接複製相關的 code 到本範例中,這才讓 Code 得以正常運作</pre>`
        const StyleBluegreen = StyleFactory({
          button: {
            color: 'red'
          },
          buttonActive: {
            color: 'white'
          },
          buttonHover: {
            backgroundColor: 'rgba(255, 0, 0, 0.8)'
          },
          content: {
            backgroundColor: 'rgba(37, 61, 91, 0.8)'
          },
          titlebar: {
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.25), #436f7c)'
          },
          window: {
            border: '1px solid #f00',
            color: 'white',
            boxShadow: '0 2pt 8pt rgba(0, 0, 0, 0.5)'
          },
        });
        const styles = { StyleBlack, StyleWhite, StyleMetal, StyleBluegreen }
        var _obj = {
           _vue:{
              template: `
              <div>
                ${_note}
                <component v-for="(style, name) in styles" :is="style" :key="name">
                  <hsc-window :title="name" :closeButton="true" :isOpen.sync="isOpen[name]">
                    Parameters:
                    <fieldset>
                      <legend>&alpha;</legend>
                      <input type="range" />
                    </fieldset>
                    <fieldset>
                      <legend>&beta;</legend>
                      <input type="range" />
                    </fieldset>
                  </hsc-window>
                </component>
                <button @click="toggle">toggle</button>
              </div>
              `,
              data() {
                return {
                  styles,
                  isOpen: _.mapValues(styles, v => true)
                }
              },
              methods: {
                toggle() {
                  const self = this
                  for (const k of Object.keys(self.isOpen))
                    self.isOpen[k] = !self.isOpen[k]
                }
              }
           }};
        return _obj;
     },
     Resizable() {
        var _obj = {
          _css :`
          .radial-gradient-1 {
            width: 100%;
            height: 100%;
            background-image: radial-gradient(
              ellipse farthest-corner at 45px 45px,
              #00ffff 0%,
              rgba(0, 0, 255, 0) 50%,
              #0000ff 95%
            );
          }
          .radial-gradient-2 {
            width: 100%;
            height: 100%;
            background-image: radial-gradient(
              farthest-corner at 45px 45px,
              #ff0000 0%,
              #0000ff 100%
            );
          }
          table {
            border-collapse: collapse;
          }
          td {
            text-align: center;
            color: rgba(0, 0, 0, 0.25);
          }
          th {
            color: white;
            background-color: #000;
          }
          .blockPointerEvents {
            pointer-events: none;
          }
          `,
           _vue:{
              template: `
              <div>
              <hsc-window-style-metal>
                <hsc-window title="with {min,max}{Width,Height}" :resizable="true" :minWidth="200" :minHeight="200" :maxWidth="400" :maxHeight="400">
                  <div class="radial-gradient-1"></div>
                </hsc-window>
            
                <hsc-window title="without max{Width,Height}" :resizable="true" :minWidth="200" :minHeight="200">
                  <div class="radial-gradient-2"></div>
                </hsc-window>
                <hsc-window title="width,height" :resizable="true" :width.sync="width" :height.sync="height" overflow="hidden">
      <div style="padding: 1em;">
        <button>Cancel</button>
        <button>OK</button>
        <p>
          width={{width}}, height={{height}}
        </p>
      </div>
    </hsc-window>

    <hsc-window title="width,height (sync)" :resizable="true" :width.sync="width" :height.sync="height">
      <p style="padding: 1em;">
        width={{width}}, height={{height}}
      </p>
    </hsc-window>
    <hsc-window title="Scrollable" :resizable="true" :isScrollable="true" :minWidth="100" :minHeight="100" :maxWidth="200" :maxHeight="200">
    <table>
      <tr>
        <th>&times;</th>
        <th v-for="j in range(n)" :key="j" v-html="j"></th>
      </tr>
      <tr v-for="i in range(n)" :key="i">
        <th v-html="i" />
        <td v-for="j in range(n)" :key="j" v-html="hex(i/n * j/n)" :style="bind_sty(i,j,n)" />
      </tr>
      </table>
    </hsc-window>
    <hsc-window title="iframe" :resizable="true" @resize-start="blockPointerEvents = true" @resize-end="blockPointerEvents = false" @move-start="blockPointerEvents = true" @move-end="blockPointerEvents = false">
      <iframe :class="{ blockPointerEvents }" :src="iframeSrc" style="width: 100%; height: 100%; box-sizing: border-box; border-style: none;" />
    </hsc-window> 
  </hsc-window-style-metal>
              </div>
              `,
              data() {
                return {
                  n: 21,
                  width: 200,
                  height: 100,
                  blockPointerEvents: false,
                }
              },
              methods: {
                range: _.range,
                hex(x) {
                  let hex = Math.floor(255 * x).toString(16)
                  if (hex.length <= 1)
                    hex = `0${hex}`
                  return hex
                },
                bind_sty(i,j,n){
                  return `{backgroundColor: rgb(${Math.floor(255 * i / n)}, ${Math.floor(255 * j / n)}, 127)}`
                }
              },
              computed: {
                iframeSrc() {
                  return `data:text/html;base64,${Base64.encode(`<h1>iframe</h1>`)}` 
                }
              }
          }
        };
        return _obj;
     },
     'z-index Group'() {
         var _obj = {
            _vue:{
               template: `
               <div>
               <hsc-window-style-metal>
      <template v-for="i in [1, 2]" , :zGroup="0">
        <hsc-window :key="i" :title="gen_title('Base Layer',i)">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range" />
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-metal>

    <hsc-window-style-black>
      <template v-for="i in [1, 2]">
        <hsc-window :key="i" :title="gen_title('Floating Layer',i)" :zGroup="1">
          <fieldset>
            <legend>&alpha;</legend>
            <input type="range" />
          </fieldset>
        </hsc-window>
      </template>
    </hsc-window-style-black>
               </div>
               `,
               methods:{
                gen_title(base,no){
                  return `${base} #${no}`;
                }
               }
            }};
         return _obj;
      },
    std1() {
        var _obj = {
          _css:`
          .box {
            width: 100px;
            height: 40px;
            background-color: aqua;
            box-shadow: 0 0 4pt rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            cursor: grab;
          }
          `,
           _vue:{
              template: `
              <div>
              <hsc-window-style-metal>
              <hsc-window
                title="Drag Handle"
                :width="400"
                :height="300"
                :left.sync="left"
                :top.sync="top"
              >
                <div
                  ref="handle"
                  class="box"
                  @mousedown.stop.prevent="mousedown"
                ></div>
              </hsc-window>
            </hsc-window-style-metal>
              </div>
              `,
              data() {
                return {
                  left: undefined ,
                  top: undefined ,
                }
              },
              methods: {
                mousedown(e) {
                  const baseLeft = this.left
                  const baseTop = this.top
                  const mousemove = (e2) => {
                    this.left = baseLeft + e2.screenX - e.screenX
                    this.top = baseTop + e2.screenY - e.screenY
                  }
                  const mouseup = () => {
                    document.removeEventListener('mousemove', mousemove)
                    document.removeEventListener('mouseup', mouseup)
                  }
                  document.addEventListener('mousemove', mousemove)
                  document.addEventListener('mouseup', mouseup)
                }
              }
           }};
        return _obj;
     }

};

window.sample = { 
  Views 
  //,def:'std1' 
};
