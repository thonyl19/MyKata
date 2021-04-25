var part = {
	parse(Src,_){
		let {toolbar} = Src;
		var Html_Code = [],
			Vue_Computed = [],
			Vue_Methods=[]
			;
		_.each(toolbar,(val,key)=>{
			switch(key){
				case "Cfg":
					Html_Code.push(val);
					break;
				default:
					var fun = `${key}`;
					if (val==1){
						Vue_Computed.push(key);
						fun = `v_${key.substr(2)}`;
					}
					var _method 
						= _.isString(val)
						? `${key}${val}`
						: `${key}(){}`
						;
					_method
					Html_Code.push(`:${key}="${fun}"`);
					Vue_Methods.push(_method); 
					break;
			}
		})
		_.set(Src, 'toolbar.Html_Code', Html_Code);
		_.set(Src, 'toolbar.Vue_Computed', Vue_Computed);
		_.set(Src, 'toolbar.Vue_Methods', Vue_Methods);
		return Src;
	}
}