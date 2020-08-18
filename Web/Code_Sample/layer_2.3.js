let Views = {
	'Base'() {
		var _obj = {
			_vue: {
				template: `
            <div>
            <button @click="Case1">Case1</button>
            <button @click="Case2">Case2</button>
            <button @click="Case3">詢問框</button>
            <button @click="Case4">全屏視窗</button>

            </div>
            `,
				mounted() {
				},
				methods: {
					Case1() {
						layer.alert('内容');
					},
					Case2() {
						layer.alert('内容', {
							icon: 1,
							skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
						})
					},
					Case3() {
						layer.confirm('您是如何看待前端开发？', {
							btn: ['重要', '奇葩'] //按钮
						}, function () {
							layer.msg('的确很重要', { icon: 1 });
						}, function () {
							layer.msg('也可以这样', {
								time: 20000, //20s后自动关闭
								btn: ['明白了', '知道了']
							});
						});
					},
					Case4() {
						var index = layer.open({
							type: 2,
							content: 'http://layim.layui.com',
							area: ['320px', '195px'],
							maxmin: true
						});
						layer.full(index);

					}
				},
			}
		};
		return _obj;
	},
	'?hadeClose'() {
		//https://www.layui.com/doc/modules/layer.html
		//shadeClose - 是否点击遮罩关闭
		//控制 是否可以點撃遮罩 就造成layer 關閉
		var _obj = {
			_vue: {
				template: `
             <div>
             </div>
             `
			}
		};
		return _obj;
	}
};

window.sample = {
	Views
};
