let { debounce, cloneDeep, defaultsDeep } = _;
/*
參考自 https://gist.github.com/vinicius73/d08d775b184c02097e5eca0a7bea2eda
*/
var c3char = {
  //<vue-c3 :handler="handler"></vue-c3>
  template: `
    <div ref="root" class="chart-root"></div>
     `,
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: "bar",
    },
  },
  watch: {
    data: {
      handler: "reload",
      deep: true,
    },
    type: "transform",
  },
  methods: {
    getArgs() {
      const data = this.getData();
      const config = this.getConfig();
      return defaultsDeep({ data }, config);
    },
    getData() {
      const { type } = this;
      const data = cloneDeep(this.data);
      return defaultsDeep({ type }, data);
    },
    getConfig() {
      const config = cloneDeep(this.config);
      const color = {
        pattern: [
          "#0a4f8a",
          "#0a88c2",
          "#75bcdd",
          "#E0E1E2",
          "#21BA45",
          "#DB2828",
          "#31CCEC",
          "#F2C037",
        ],
      };
      const axis = {
        x: {
          type: "category",
          padding: {
            left: 0,
            right: 0,
          },
          tick: {
            multiline: true,
          },
        },
      };
      return defaultsDeep({ axis, color }, config);
    },
    update: debounce(function update() {
      const data = this.getData();
      this.$chart.load(data);
      this.$emit("update", data);
    }, 500),
    transform: debounce(function transform(...args) {
      this.$chart.transform(...args);
    }, 100),
    reload: debounce(function reload() {
      this.$emit("reloading");
      this.$chart.unload();
      this.$nextTick(() => {
        this.update();
      });
    }, 700),
  },
  mounted() {
    const args = this.getArgs();
    this.$chart = c3.generate({
      bindto: this.$refs.root,
      ...args,
    });
    this.$emit("init", args);
  },
  beforeDestroy() {
    this.$chart = this.$chart.destroy();
  },
};
let Views = {
  "base"() {
    var _note = `
         <pre>
         </pre>
         `;
    var _obj = {
      _vue: {
        //<vue-c3 :handler="handler"></vue-c3>
        template: `
              <div>
                <c3char :config="config" :data="data" ></c3char>
              </div>
               `,
              data(){
                return {
                  config:{},
                  data:{
                    columns: [
                        ['data1', 30, 200, 100, 400, 150, 250],
                        ['data2', 50, 20, 10, 40, 15, 25]
                    ]
                },
                }
              },
        components: { c3char },
      },
    };
    return _obj;
  },
};

window.sample = {
  Views,
};
