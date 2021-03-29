<%
	var isAct = arg.ut._.get(arg,'gt_toolbar.Vue_Methods');
	if (isAct!=null){

	
_%>
/// #region [gt_toolbar.Vue_Computed] 
<%_ for(var el of arg.gt_toolbar.Vue_Computed){ _%>
v_<%=el%>() {
	return {
		//TODO:
		visable: true,
		enable: true,
		fn: this.e_<%=el%>
	}
},
<%_ }_%>
/// #endregion [gt_toolbar.Vue_Computed] <%}_%>