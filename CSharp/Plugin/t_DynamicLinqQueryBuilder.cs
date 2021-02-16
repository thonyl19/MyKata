using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Dynamic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Net;
using Castle.DynamicLinqQueryBuilder;
using CSharp.Linq;
using Dapper;
using FluentValidation.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Plugin
{
	[TestClass]
    public class t_DynamicLinqQueryBuilder{
		public static QueryBuilderFilterRule Query_SamplePersons(){
			var contentIdFilter = new QueryBuilderFilterRule
            {
                Condition = "and",
                Rules = new List<QueryBuilderFilterRule>
                {
                    new QueryBuilderFilterRule
                    {
                        Condition = "and",
                        Field = "Addres",
                        //Id = "LastModified",
                        //Input = "NA",
                        Operator = "equal",
                        Type = "string",
                        Value = new[] { "C" }
                    }
                }
            };
			return contentIdFilter;
		}

		public static QueryBuilderFilterRule Query_SQLite(){
			var contentIdFilter = new QueryBuilderFilterRule
            {
                Condition = "and",
                Rules = new List<QueryBuilderFilterRule>
                {
                    new QueryBuilderFilterRule
                    {
                        Condition = "and",
                        Field = "Title",
                        //Id = "LastModified",
                        //Input = "NA",
                        Operator = "begins_with",
                        Type = "string",
                        Value = new[] { "C" }
                    }
                }
            };
			return contentIdFilter;
		}

		/// <summary>
		/// 
		/// </summary>
		[TestMethod]
		public void t_基本應用(){
            var sampe = Sample.Case1();
			var qb = t_DynamicLinqQueryBuilder.Query_SamplePersons();
			var _list = sampe.persons
				.BuildQuery(qb)
				.ToList();
			 
		}

		
		/// <summary>
		/// 
		/// </summary>
		[TestMethod]
		public void t_使用SqlCmd(){
			using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook)){
                try
                {
                    var qb = t_DynamicLinqQueryBuilder.Query_SQLite();
                    /*使用 自定SQL 有個重點 ,就是必須搭配 物件去承接,
                        才能讓 BuildQuery 有效作用
                    */
                    var _list = cnn.Query<albums>("select * from albums")
                        .BuildQuery(qb)
                        .ToList();
                }
                catch (System.Exception ex)
                {
                    
                    throw;
                }

			}
        }
        /// <summary>
        /// 
        /// </summary>
        [TestMethod]
        public void t_使用SqlCmd_混搭DapperAndDynLinq(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook)){
                try
                {
                    var qb = t_DynamicLinqQueryBuilder.Query_SQLite();
                    /*使用 自定SQL 有個重點 ,就是必須搭配 物件去承接,
                        BuildQuery 才能有效作用, 就像此案例,
                        必須要設一個 albums_ext 來承接兩個表 join 後的結果,
                        就可以正常的 work 
                    */
                    var sql = @"SELECT A.* , B.Name 
                                FROM    albums A 
                                        INNER JOIN artists B 
                                            ON A.ArtistId = B.ArtistId";
                                
                    var _list = cnn.Query<albums_ext>(sql)
                        .BuildQuery(qb)
                        .OrderBy(c=>c.AlbumId)
                        .PageResult(1,10)
                        .Queryable.ToList()
                        ;
                }
                catch (System.Exception ex)
                {
                    
                    throw;
                }

            }
        }
	
    
        /// <summary>
        /// 以下是工作上 碰到的實際 案例,需求情境如下
        /// 1.利用 BuildQuery 完成查詢、排序處理
        /// 2.因為 原始資料中,缺少了 REPORT ,所以需要再後補.
        /// 而這個案例的重點就在下方註記中,處理 join 補資料的那一段 
        /// </summary>
        public void t_案例_Join(){
            /*
            public static Result QueryWORKT(PagerQuery PQuery)
            {
                var _result = PQuery.chk();
                if (_result.Success)
                {
                    using (var dbContext = new MDL.MESContext())
                    {
                        try
                        {
                            var _query = dbContext.ZZ_OPER_WORKT_SUMMARY.BuildQuery(PQuery.Conditions);

                            if (PQuery?.Sort?.Code != "")
                            {
                                _query = _query.OrderBy(PQuery.Sort.Code);
                            }
                            if (PQuery.Page == null)
                            {
                                _result.Data = new { Queryable = _query.ToList() };
                            }
                            else
                            {
                                //先取得 要補資料的清單
                                var Params = DDLServices.get_PARAMETERS("WorkingTimeType");
                                var PageInfo = _query.PageResult(PQuery.Page.Index, PQuery.Page.Size);
                                //需要先把 原始資料做 ToList()
                                var _list = PageInfo.Queryable.ToList();
                                //以下兩個清單,都需要做 AsQueryable() ,才能做處理
                                var Queryable = (
                                        from A0 in _list.AsQueryable()
                                        join A1 in Params.AsQueryable()
                                            on A0.REPORT_TYPE equals A1.PARAMETER_NO
                                        select new
                                        {
                                            #region [ A0.* ] 
                                            A0.SID,
                                            ......
                                            A0.UPDATE_USER,
                                            A0.UPDATE_DATE,
                                            #endregion
                                            REPORT = A1.PARAMETER_NAME
                                        }
                                    )
                                    .ToList();

                                _result.Data = new { Queryable, PageInfo = PQuery.parsePagedResult(PageInfo) };

                            }
                        }
                        catch (Exception Ex)
                        {
                            _result = new Result(ErrCode.GenericErrorMessage, ErrCode.False);
                        }

                    }
                }
                return _result;

            }
            
            */
        }
    }


    public static class QueryBuilderFilterRule_ext
	{
		/// <summary>
		/// 簡化 轉換的操作方式
		/// </summary>
		/// <param name="rule"></param>
		/// <param name="sql"></param>
		/// <param name="arg"></param>
		/// <returns></returns>
		public static string parseSQL(this QueryBuilderFilterRule rule, IDictionary<string, object> arg, string sql = null)
		{
			switch (rule.Operator)
			{
				case "in":
					arg[rule.Field] = rule.Value;
					break;
				default://equal
					arg[rule.Field] = rule.Value[0];
					break;
			}
			return sql?.Replace($"--[{rule.Field}]--", "");
		}
	}
	public class SortRule
	{
		/// <summary>
		/// 欄位名稱
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// 是否升幂(F:降幂
		/// </summary>
		public bool isAsc { get; set; } = true;

		public string Code
		{
			get
			{
				var _r = "";
				try
				{
					var _asc = this.isAsc ? "" : " desc";
					_r = $"{this.Name}{_asc}";
				}
				catch
				{
				}
				return _r;
			}
		}
	}
	public class PageRule
	{
		/// <summary>
		///	指定頁次 , 起始值為1
		/// </summary>
		public int Index { get; set; } = 1;

		/// <summary>
		/// 分頁大小
		/// </summary>
		public int Size { get; set; }
	}
public class PagerQuery
	{
		public QueryBuilderFilterRule Conditions { get; set; }
		//public List<SortRule> Sort { get; set; }
		public SortRule Sort { get; set; }
		public PageRule Page { get; set; }

		public Result chk()
		{
			if (this.Conditions == null)
			{
				return new Result("條件查詢式不得為空值!", ErrCode.False);
			}
			return new Result(true);
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="as_PR"></param>
		/// <returns></returns>
		///	SPEC)Anthony - 2020.11.10
		///	因為試了很多方式,都無法直接 取得 PagedResult 的完整資料,所以只要先轉這一手,
		///		把資料先轉到這邊後,再做後續處理
		public dynamic parsePagedResult(PagedResult as_PR)
		{
			return new
			{
				CurrentPage = as_PR.CurrentPage,
				PageCount = as_PR.PageCount,
				PageSize = as_PR.PageSize,
				RowCount = as_PR.RowCount,
			};
		}

		public dynamic genQueryArg(ref string _sql)
		{
			var arg = new ExpandoObject() as IDictionary<string, object>;
			foreach (var Rule in this.Conditions.Rules)
			{
				_sql = Rule.parseSQL(arg,_sql);
			}
			return arg;
		}
	}
	public class Result  
	{
		public Guid ID
		{
			get;
			private set;
		}

		public bool Success
		{
			get;
			set;
		}

		public string Message
		{
			get;
			set;
		}

		public List<string> MessageList
		{
			get;
			set;
		}

		public string Redirect
		{
			get;
			set;
		}

		public dynamic Data
		{
			get;
			set;
		}

		public Exception Exception
		{
			get;
			set;
		}

		// public List<IResult> InnerResults
		// {
		// 	get;
		// 	protected set;
		// }

		/// <summary>
		/// 錯誤識別代碼
		/// </summary>
		public string Code
		{
			get;
			set;
		}


		public Result(bool success, string message = null, string code = null)
		{
			ID = Guid.NewGuid();
			Success = success;
			//InnerResults = new List<IResult>();
			Message = message;
			MessageList = new List<string>();
			Code = (code != null)
				? code
				: (success ? ErrCode.Success : ErrCode.False);
		}
		public Result()
			: this(false) { }


		public Result(string message, string code = null)
			: this(false, message, code) { }

		/// <summary>
		/// 搭配 HttpStatusCode
		/// https://docs.microsoft.com/zh-tw/dotnet/api/system.net.httpstatuscode?view=netcore-3.1
		/// https://blog.miniasp.com/post/2009/01/16/Web-developer-should-know-about-HTTP-Status-Code
		/// </summary>
		/// <param name="message"></param>
		/// <param name="httpErr"></param>
		public Result(string message, HttpStatusCode httpErr)
			: this(false, message, ((int)httpErr).ToString()) { }


		// Anthony(2020/9/10 - 原本是想偷懶省工,但實務上會造成 
		//	引用 Result的 子專案都要把 ValidationResult 加入 ,
		//  考慮到這樣的成本過高,只好先擱置,再尋求更好的解法
		// Anthony(2020/9/17 - 經過多方嘗試,暫時先以此方法緩解需求 
		public static Result v8n(ValidationResult v8n, string code = "999")
		{
			var result = new Result(v8n.IsValid);
			if (!result.Success)
			{
				result.Code = ErrCode.False;
				result.Message = string.Join("\r\n", v8n.Errors.Select(e => e.ErrorMessage));
			}
			return result;
		}

		/// <summary>
		/// 簡化檢核處理程序
		/// </summary>
		/// <param name="funs"></param>
		/// <returns></returns>
		public static Result chk(params Func<string>[] funs)
		{

			Result r = new Result(true);
			foreach (Func<string> fn in funs)
			{
				r.Message = fn();
				if (r.Message != "")
				{
					r.Success = false;
					return r;
				}
			}
			//GtiFramework.js 預設 Success == true ,且 msg !=null ,就會產生個處理訊息 ,
			// 因此,如果成功 而不想產生訊息 ,就需要設為 null 
			r.Message = null;
			return r;
		}

		/// <summary>
		/// 簡化檢核 舊資料是否存在的程序
		/// </summary>
		/// <param name="OldRow"></param>
		/// <returns></returns>
		public static Result chk_OldRec(object OldRow)
		{
            var msg = "NoDataFound";//RES.BLL.Message.NoDataFound;
			if (OldRow == null) return new Result(msg, ErrCode.DB.NoData);
			return new Result()
			{
				Success = true,
				Data = OldRow
			};
		}
	}

	public static class ErrCode
	{
		public static string Success = "000";
		/// <summary>
		/// 無法歸類時,統一使用
		/// </summary>
		public static string False = "999";




		public static class DB
		{
			/// <summary>
			/// 查無對應資料
			/// </summary>
			public static string NoData = "901";
			/// <summary>
			/// 資料重覆(適用於 Creat 前確認資料是否己建立檢查
			/// </summary>
			public static string DataRepeat = "902";
			public static string TransactionErr = "903";
		}

		public static class Authority
		{
			//public static string E = "999";

		}

		//TODO-i18n:
		/// <summary>
		/// 此欄位是為了配合 v8n 檢查機制而建立,
		/// 目的是為了避免 API 揭漏錯誤訊息而產生可攻撃的漏洞
		/// </summary>
		public static string MustHaveInput = "必填欄位不得為空值";

		//TODO-i18n:
		public static string MustInput(string filed = "必填欄位")
		{
            var tpl = "{0} must input";//RES.BLL.Message.MustInput;
			return string.Format(tpl, filed);
		}

		/// <summary>
		/// 通用錯誤訊息
		/// </summary>
		public static string GenericErrorMessage = "執行錯誤,請洽詢資訊單位.";
	}
}