using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;
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
		public void t_(){
			using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook)){
				var qb = t_DynamicLinqQueryBuilder.Query_SQLite();
				var _list = cnn.Query(sql).
					.BuildQuery(qb)
					.ToList();
			}
		}
	}
}