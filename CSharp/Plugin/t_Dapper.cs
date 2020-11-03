using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using FluentValidation;
using FluentValidation.TestHelper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Dapper;
using System.Data;
using System.Data.SQLite;

namespace CSharp.Plugin {
    [TestClass]
    public class t_Dapper {
        
        IDbConnection cnn  {
            get{
                //以下語法 不work
                //using (IDbConnection cnn = new MvcMovieContext())
                var db_path = @"data source=.\MvcMovie.db;version=3;";
                return new SQLiteConnection(db_path);
            }
        }

        /// <summary>
        /// 初始化設定
        /// </summary>
        [TestInitialize]
        public void Setup () {
            //validator = new PersonValidator ()
        }

 

        [TestMethod]
		public void T_Query(){
            using (var cnn = this.cnn)
			{
                //cnn.Open();
                string _sql = @"
                    select * from Movie
                ";
				var x = cnn.Query<Movie>(_sql).ToList();
			}
		}
 
        /// <summary>
        /// [https://docs.microsoft.com/zh-tw/dotnet/standard/data/sqlite/dapper-limitations]
        /// Dapper 也預期參數會使用@前置詞。 其他首碼將無法使用。
        /// </summary>
        [TestMethod]
		public void T_ExecuteScalar(){
            using (var cnn = this.cnn)
			{
                var result = cnn.ExecuteScalar(
                    "SELECT @Value",
                    new { Value = 1 });
			}
		}
 
        
    }
}