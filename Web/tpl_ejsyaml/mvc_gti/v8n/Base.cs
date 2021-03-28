<%
    arg.ut.fn_inc = include;
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
	public class <%= arg.TableName%> : AbstractValidator<mdl.<%= arg.TableName%>>
	{
		public <%= arg.TableName%>()
		{	
			<%_ arg.ut.echo_file('./~RuleFor.cs',(el)=>{ _%>
			<%- el %><% }) %>
		}

		public static Result Check(mdl.<%= arg.TableName%> mainObj)
		{
			var _v8n = new FluentValidation.<%=arg.TableName%>().Validate(mainObj);
			var _result = Result.CheckFluentValidation(_v8n);
			return _result;
		}
	}
}
