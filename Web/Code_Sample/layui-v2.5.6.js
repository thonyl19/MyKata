/*
https://www.layuicdn.com/api.html
*/
let Views = {
  Base() {
      var _obj = {
         _vue:{
            template: `
            <div>
              <button @click="Case1">Case1</button>
            </div>
            `
            ,methods: {
              Case1(){
                layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element'], function() {
                  var laydate = layui.laydate //日期
                  ,laypage = layui.laypage //分页
                  ,layer = layui.layer //弹层
                  ,table = layui.table //表格
                  ,carousel = layui.carousel //轮播
                  ,upload = layui.upload //上传
                  ,element = layui.element; //元素操作 等等...
            
                  /*layer弹出一个示例*/
                  layer.msg('Hello World');
                });
              }
            }
         }};
      return _obj;
   },
   std1() {
       var _obj = {
          _vue:{
             template: `
             <div class="layui-tab">
  <ul class="layui-tab-title">
    <li class="layui-this">标题一</li>
    <li>标题二</li>
    <li>标题三</li>
  </ul>
  <div class="layui-tab-content">
    <div class="layui-tab-item layui-show">内容1</div>
    <div class="layui-tab-item">内容2</div>
    <div class="layui-tab-item">内容3</div>
  </div>
</div>
             `
          }};
       return _obj;
    }
};

window.sample = { 
  Views 
  ,def:'std1' 
};
