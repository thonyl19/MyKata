isAddMode() {
	var url = new URL(location);
	var SID = url.searchParams.get('SID') ?? "";
	var isAddMode = (SID == "");
	return isAddMode;
},