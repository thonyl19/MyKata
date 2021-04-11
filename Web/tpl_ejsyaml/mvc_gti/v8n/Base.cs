<%
    Src.ut.fn_inc = include;
_%>
using BLL.DataViews.Res;
using BLL.InterFace;
using FluentValidation;
using FluentValidation.Results;
using System;
using System.Dynamic;
using System.Linq;
using mdl = MDL.MES;

namespace BLL.MES.FluentValidation
{
	public class <%= Src.TableName%> : AbstractValidator<mdl.<%= Src.TableName%>>
	{
		public <%= Src.TableName%>()
		{	
			<%_ Src.ut.echo_file('./~RuleFor.cs',(el)=>{ _%>
			<%- el %><% }) %>
		}

		public static Result Check(mdl.<%= Src.TableName%> mainObj)
		{
			var _v8n = new FluentValidation.<%=Src.TableName%>().Validate(mainObj);
			var _result = Result.CheckFluentValidation(_v8n);
			return _result;
		}
	}
}
