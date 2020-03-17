let Views = {
  "自定義 el-select 項目圖示"() {
    var _css = `
            img {
                width: 20px;
                height: 20px;
            }

            .prefix {
                margin-top: 10px;
            }
            `;
    var _vue = {
      template: `
                <el-select v-model="value" value-key="value" placeholder="Select">
                    <template slot="prefix"><img class="prefix" :src="value.photo" /></template>
                    <el-option v-for="item in outlet" :key="item.value" :label="item.label" :value="item">
                    <img :src="item.photo"> {{ item.label }}
                    </el-option>
                </el-select>
                `,
      data() {
        return {
          outlet: [
            {
              value: "mcd",
              label: "McDonald",
              photo:
                "https://upload.wikimedia.org/wikipedia/commons/5/50/McDonald%27s_SVG_logo.svg"
            },
            {
              value: "kfc",
              label: "KFC",
              photo:
                "http://www.kfcku.com/themes/kfc_indonesia/images/kfc-indonesia-logo.png"
            },
            {
              value: "pizzahut",
              label: "Pizza Hut",
              photo:
                "https://vignette.wikia.nocookie.net/logopedia/images/b/b3/Pizza_Hut_Logo_2.png/revision/latest?cb=20161129133747"
            }
          ],
          value: null
        };
      },
      created() {
        this.value = this.outlet[0];
      }
    };
    return { _vue, _css };
  },
  "dialog 自適高度"() {
    /*
            當在 el-dialog 的內容超過螢幕範圍時,原生的樣式不支援做內容捲動的呈現,
                而是整個 el-dialog 做整頁的捲動
            */
    var _obj = {
      _css: `
                .abow_dialog {
                    display: flex;
                    justify-content: center;
                    align-items: Center;
                    overflow: hidden;
                }
                .abow_dialog .el-dialog {
                    margin: 0 auto !important;
                    height: 90%;
                    overflow: hidden;
                    width: 85rem !important;
                    max-width: 95vw;
                }
                .abow_dialog .el-dialog__body {
                    position: absolute;
                    left: 0;
                    top: 54px;
                    bottom: 0;
                    right: 0;
                    padding: 1em 2.3em;
                    z-index: 1;
                    overflow: hidden;
                    overflow-y: auto;
                }
                `,
      _vue: {
        template: `
                    <div>
                        
                        <el-dialog title="搜尋" :visible.sync="visible" :class="[switch_model?'abow_dialog':'']">
                            <div>
                                <input type=checkbox v-model="switch_model" />content scroll
                            </div>
                            <iframe scrolling="no" src="element-ui-2.13.htm" style="height:120vh;"></iframe>
                        </el-dialog>
                    </div>`,
        data() {
          return {
            switch_model: true,
            visible: true
          };
        }
      }
    };
    return _obj;
  },
  std() {
    var _vue = {
      template: `
                <div>
                </div>`
    };
    return {_vue};
  },
};
let Case = {
  'bts.form-control'() {
    /*
    在套用 form-control 之後 , element UI 的樣式會出現跑版的問題,
      目前仍找不到比較好的解決方案
    */
    var _vue = {
      template: `
                <div>
                <div><input type="checkbox" v-model="isUse" />套用 form-control</div>
                <el-select :class="[isUse?'form-control':'']"  v-model="sel">
                  <el-option v-for="item in list_box_type"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
            </el-select>
                </div>`,
                data(){
                  return {
                    isUse:true,
                    sel:0,
                    list_box_type: [
                      {
                          value: 0,
                          label: 'ZGB'
                      }, {
                          value: 1,
                          label: 'Lens'
                      }, {
                          value: 2,
                          label: 'T-Spacer'
                      }
                  ],
                  }
                }
    };
    return {_vue};
  },
  'el-checkbox Tab控制'(){
      /*
      情境需求:
      1.基本的輸入,是以 [備註記錄],[位置碼] 為主
      2.因為[備註記錄] 大多都重覆,為了增加建檔效率,所以,設 Keep 功能,
        讓[備註記錄] 可以保留,直接輸入下筆[位置碼]
      3.總合 1,2 的需求,輸入操作的控制為以下模式
      A:第一次輸入
        tab依序為[備註記錄][Keep][位置碼]

      需求變更,此段己不必要,先保留
      */
      var _vue = {
        template: `
          <div>
            <el-input ref="errCode" placeholder="请输入内容" size="mini" style="width:50rem;" tabindex="1">
              <template slot="prepend">
                  備註記錄
              </template>
              <template slot="append">
                  <el-checkbox v-model="isKeep" @@click="isKeep=!isKeep"> Keep</el-checkbox>
              </template>
            </el-input>
      
            <el-input placeholder="请输入内容" size="mini" @@keyup.enter.native="mapCode_input($event)" v-model="mapCode" style="width:30rem;" tabindex="3">
                <template slot="prepend">
                    位置碼
                </template>
            </el-input>
        </div>`,
        data(){
          return {
            isKeep: false,
            mapCode: "",
            errCode: "",
            
          }
        },
        methods: {
          isKeepErrCode(isErrCodeFocus) {
              if (this.isKeep == false) {
                  this.errCode = ""
                  if (isErrCodeFocus) this.$refs.errCode.focus();
              };
          },
        },
      };
      return {_vue};
  }

};
window.sample = {Views,Case};
