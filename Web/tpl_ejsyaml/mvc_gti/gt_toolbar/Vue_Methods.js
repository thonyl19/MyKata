﻿<%
	var isAct = arg.ut._.get(arg,'gt_toolbar.Vue_Methods');
	if (isAct!=null){

	
_%>
/// #region [gt_toolbar.Vue_Computed] 
<%_ for(var el of arg.gt_toolbar.Vue_Methods){ _%>
<%=el%>(){},
<%_ }_%>
/// #endregion [gt_toolbar.Vue_Computed] <%}_%>~Vue_Watch