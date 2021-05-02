var part = {
	ts_BasePath(relPath){
		return `../${relPath}`
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