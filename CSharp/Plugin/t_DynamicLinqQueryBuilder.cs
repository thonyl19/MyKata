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
        public void t_使用SqlCmd_Join(){
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
	}
}