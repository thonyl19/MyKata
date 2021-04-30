ENABLE_FLAG(val) {
	if (!this.isLock) {
		this.isLock = true;
		this.e_enable(val);
	}
},