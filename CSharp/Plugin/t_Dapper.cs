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
using System.IO;

namespace CSharp.Plugin {
    [TestClass]
    public class t_Dapper {
        
        /// <summary>
        /// 初始化設定
        /// </summary>
        [TestInitialize]
        public void Setup () {
            //validator = new PersonValidator ()
        }

 

        [TestMethod]
		public void T_Query(){
            using (var cnn =  new SQLiteConnection(t_SQLite.db_path))
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
            using (var cnn = new SQLiteConnection(t_SQLite.db_path))
			{
                var result = cnn.ExecuteScalar(
                    "SELECT @Value",
                    new { Value = 1 });
			}
		}
 
        /// <summary>
        /// https://dapper-tutorial.net/querymultiple
        /// 一次讀入多個資料表
        /// </summary>
        [TestMethod]
		public void t_QueryMultiple(){
            using (var cnn = t_SQLite.cnn)
			{
                //;
                var multi = cnn.QueryMultiple(
                    "select * from Movie;select Genre from Movie group by Genre;"
                    );
                var table_1 = multi.Read<Movie>().First();
                var table_2 = multi.Read().ToList();
			}
		}


        /// <summary>
        /// https://dapper-tutorial.net/parameter-list
        /// </summary>
        [TestMethod]
		public void t_Parameter_In(){
            using (var cnn = t_SQLite.cnn)
			{
                var sql = "SELECT * FROM Movie WHERE Genre IN @Kind;";
                var Kind = new[] {"Comedy"
                    , "Romantic Comedy"};
                var invoices = cnn.Query<Movie>(sql, 
                    new {Kind}).ToList();
			}
		}

        /// <summary>
        /// https://dapper-tutorial.net/parameter-string
        /// can't work
        /// </summary>
        [TestMethod]
		public void t_Parameter_String(){
            using (var cnn = t_SQLite.cnn)
			{
                var sql = "SELECT * FROM Movie WHERE Genre = @Genre;";
                var Genre = new {Genre = new DbString {Value = "Comedy", IsFixedLength = false, IsAnsi = true}};
                var invoices = cnn.Query<Movie>(sql, 
                    new {Genre}).ToList();
			}
		}

        /// <summary>
        ///https://dapper-tutorial.net/result-multi-mapping
        /// can't work
        /// </summary>
        [TestMethod]
		public void t_QueryMultiMapping(){
            using (var cnn = t_SQLite.cnn_chinook)
			{
                var sql = "SELECT * FROM albums";
                //var Genre = new {Genre = new DbString {Value = "Comedy", IsFixedLength = false, IsAnsi = true}};
                var _r = cnn.Query(sql).ToList();
			}
		}

        

        
        
        
    }
}