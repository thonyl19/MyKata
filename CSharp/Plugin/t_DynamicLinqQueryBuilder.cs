using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
using System.Linq.Dynamic.Core;
using Castle.DynamicLinqQueryBuilder;
using CSharp.Linq;
using Dapper;
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
                        才能讓 BuildQuery 有效作用, 如此案例,
                        只要設一個 albums_ext 來承接兩個表 join 後的結果,
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
}