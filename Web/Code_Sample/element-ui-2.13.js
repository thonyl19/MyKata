let views = {
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
    var _obj = {
      template: `
                <div>
                </div>`
    };
    return _obj;
  }
};
window.sample = {views};
