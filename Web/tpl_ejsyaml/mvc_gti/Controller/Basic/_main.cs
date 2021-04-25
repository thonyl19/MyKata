﻿<%#
/*
[Ref]
H:\SSMES_Dev\Genesis_MVC\Areas\ADM\Controllers\DefectCategoryController.cs
H:\SSMES_Dev\Genesis_MVC\Areas\ADM\Controllers\OperationController.cs
H:\SSMES_Dev\Genesis_MVC\Areas\ADM\ControlleCheckDataRulers\OperationTypeController.cs
*/
_%>
using MDL.MES;
using BLL.MES;
using BLL.MES.DataViews;
using Frame.Code;
using Frame.Code.Web.Select;
using Genesis.Common;
using Genesis.Library.BLL.MES;
using Genesis.Library.Frame.Code.Web.TableQuery;
using System.Dynamic;
using System.Linq;
using System.Web.Mvc;
using BLL.InterFace;
using System;

namespace Genesis.Areas.<%= Src.Areas%>.Controllers
{
	public class <%= Src.FunctionName%>Controller : BaseController
	{
		public <%= Src.FunctionName%>Services serv  { get; set; }
		//<%= Src.Areas%>Services _serv = new <%= Src.Areas%>Services()
		
		#region == Page ==
		public ActionResult <%= Src.FunctionName%>()
		{
			return View();
		}
		public ActionResult <%= Src.FunctionName%>_Item(string SID, bool SingleMode = true)
		{
			/*
			dynamic data = new ExpandoObject();
			//處理基本的選項資料
			var EncodeFormatType = TableQueryService
				.AD_PARAMETER("EncodeFormatType", MDL.SearchKey.No)
				.FirstOrDefault()?.PARAMETER_VALUE;
			if (string.IsNullOrEmpty(EncodeFormatType) == false)
			{
				data.EncodeFormatType = (
					from x in EncodeFormatType.Split(',')
					select new SelectModel
					{
						No = x,
						Display = x,
						Value = x,
					}
					).ToList();
			}
			//依據 SID 判別新增 OR 讀取 ,再各別處理
			if (string.IsNullOrWhiteSpace(SID) == false)
			{
				var _data = _svc.<%= Src.FunctionName%>_Read(SID);
				if (_data == null)
				{
					data.Msg = RES.BLL.Message.NoDataFound;
				}
				else {
					data.main = _data.main;
					data.items = _data.items;
					data.ctrl_items = _data.ctrl_items;
				}
			} 
			ViewData["result"] = ((object)data).ToJson(true);
			*/

			/*
			QC_DEFECTCODE model = null;
            if (keyVal != null)
                model = _service.GetEntityByKey(keyVal);

            var result = new Result(true) { Data = new ExpandoObject() };
            result.Data.form = model ?? new QC_DEFECTCODE();
            result.Data.DefectTypes = _service.GetDefectTypes();
            result.Data.DefectCategories = _service.GetDefectCategories();

            ViewData["result"] = result.ToJson(true);
			*/

			ViewData["SingleModel"] = SingleMode;
			return View();
		}
		#endregion
		#region == API ==
		[HttpPost]
		public ActionResult ListData(PagerQuery obj)
		{
			//var Result = serv.QueryList(obj);
			//return Content(Result.ToJson(true));
			return Content(obj.ToJson(true));
		}

		[HttpPost]
		public ActionResult Save(<%=Src.TableName%> entity)
		{
			IResult result;
            try
            {
				<%=Src.CheckDataRule%>
				result //= serv.<%= Src.FunctionName%>_Save(post,true);
					= new Result(true) { Data = entity };
				//_serv.UOW.Save();
            }
            catch (Exception ex)
            {
                result = new Result(ex.Message);
            }
			return Content(result.ToJson(true));
		}


		[HttpPost]
        [Common.HandlerAjaxOnly]
        [ValidateAntiForgeryToken]
        public ActionResult Insert(<%=Src.TableName%> entity)
        {
			IResult result;
            try
            {
				<%=Src.CheckDataRule%>
				result //= serv.InsertData(entity);
						= new Result(true) { Data = entity };
				//_serv.UOW.Save();
            }
            catch (Exception ex)
            {
                result = new Result(ex.Message);
            }
			
            return Content(result.ToJson(true));
        }

        [HttpPost]
        [Common.HandlerAjaxOnly]
        [ValidateAntiForgeryToken]
		public ActionResult Update(<%= Src.TableName%> entity)
		{
			IResult result;
            try
            {
				<%=Src.CheckDataRule%>
				result //= serv.Update(entity);
						= new Result(true) { Data = entity };
				//_serv.UOW.Save();
            }
            catch (Exception ex)
            {
                result = new Result(ex.Message);
            }
			return Content(result.ToJson(true));
		}



		[HttpPost]
		public ActionResult Delete(string SID)
		{
			IResult result;
            try
            {
				/*
				有疑問,先 mark
				<%=Src.CheckDataRule%>
				result //= serv.InsertData(entity);
						= new Result(true) { Data = entity };
				//_serv.UOW.Save();
				*/
            }
            catch (Exception ex)
            {
                result = new Result(ex.Message);
            }

			return Content(result.ToJson(true));
		}

		<%- API.join('\n\t\t')%>
 		#endregion
	}
}