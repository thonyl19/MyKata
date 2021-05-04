var _app = {
	ssplit(){
		let {split_Cfg} = $.data;
		$.ext_ut.chkDirPath(split_Cfg.ExpPath);
		var _baseCode = include(split_Cfg.Src);
		var _list = _baseCode.match(/##(\s\S|[^##])+@#/g);
		var _cfg = {}
		_.each(_list,(el,idx)=>{
			let [key] = el.match(/##.+/);
			key = key.replace("##","");
			_baseCode = _baseCode.replace(el,split_Cfg._tpl(key));
			var _fileName = `${split_Cfg.ExpPath}${key}.ejs`;
			var _arr = el.split('\n');
			_arr.shift();
			_arr.pop();
			el = _arr.join('\n');
			$.ext_ut.writeFile(`${_fileName}`,el);
			_cfg[key]=el;
		})
		$.ext_ut.writeFile(`${split_Cfg.ExpPath}Main.ejs`,_baseCode);
		//$.ext_ut.writeFile(_cfg,`${split_Cfg.ExpPath}~Cfg.json`);
		return _cfg;
	},
	parsePoint(include,$,Src){
		let _self = this;
		let {part=[]} = Src;
		var _part= {};
		var point = {};
		part.map(el=>{
			var s = _self.ts_BasePath(el);
			var s1 = JSON.parse(include(s,{Src}));
			_part[el] = s1;
		})
		$._.each(_part,(el)=>{
			//point.push(el);
			$._.each(el,(v,k)=>{
				//point.push(v);
				var _map = point[k];
				if (Array.isArray(v)){
					v=v.join('\r\n');
				}
				var arr = v.split('\r\n');
				point[k] = _map == null
					? arr
					: $._.concat(point[k],arr)
					;
			})
		})
		$._.set(Src,'part',_part);
		$._.set(Src,'point',point);
		return Src;
	}
}