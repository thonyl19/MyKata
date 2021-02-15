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
using System.Linq.Dynamic.Core;
using MyKata.Lib;
using System.Dynamic;
using Dapper.Transaction;

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
            using (var cnn =  new SQLiteConnection(t_SQLite.db_MvcMovie))
			{
                //cnn.Open();
                string _sql = @"
                    select * from Movie
                ";
				var x = cnn.Query<Movie>(_sql).ToList();
			}
		}

        /// <summary>
        /// </summary>
        [TestMethod]
		public void t_Query_動態物件(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook))
			{
                try
                {
                    var sql 
                        = @"SELECT A.*  
                        FROM    albums A  
                        ";
                    var _r = cnn.Query(sql)
                        .ToList();
                    
                }
                catch (System.Exception ex)
                {
                    
                    
                }
			}
		}
 
        /// <summary>
        /// [https://docs.microsoft.com/zh-tw/dotnet/standard/data/sqlite/dapper-limitations]
        /// Dapper 也預期參數會使用@前置詞。 其他首碼將無法使用。
        /// </summary>
        [TestMethod]
		public void T_ExecuteScalar(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_MvcMovie))
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
            using (var cnn = new SQLiteConnection(t_SQLite.db_MvcMovie))
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
            using (var cnn = new SQLiteConnection(t_SQLite.db_MvcMovie))
			{
                var sql = "SELECT * FROM Movie WHERE Genre IN @Kind;";
                var Kind = new[] {"Comedy"
                    , "Romantic Comedy"};
                var invoices1 = cnn.Query<Movie>(sql,   new {Kind})
                        .ToList();

                var arg = new {Kind = new string[]{"Comedy"
                    , "Romantic Comedy"}};
                var invoices2 = cnn.Query<Movie>(sql,  arg)
                        .ToList();
			}
		}

        /// <summary>
        /// https://dapper-tutorial.net/parameter-string
        /// can't work
        /// </summary>
        [TestMethod]
		public void t_Parameter_String(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_MvcMovie))
			{
                try
                {
                    var sql 
                        //= "SELECT A.* FROM Movie A WHERE A.Genre = @Genre;";
                        = "SELECT * FROM Movie  WHERE Genre = @Genre ;";
                    var Genre = new {Genre = new DbString {Value = "Comedy", IsFixedLength = false, IsAnsi = true}};
                    var invoices = cnn.Query<Movie>(sql, 
                        new {Genre}).ToList();
                }
                catch (System.Exception ex)
                {
                }

			}
		}
        

        /// <summary>
        /// https://dapper-tutorial.net/parameter-string
        /// can't work
        /// </summary>
        [TestMethod]
		public void t_Parameter_Dynamic(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_MvcMovie))
			{
                try
                {
                    var sql 
                        //= "SELECT A.* FROM Movie A WHERE A.Genre = @Genre;";
                        = "SELECT * FROM Movie  WHERE Genre = @Genre ;";
                    var parameter = new DynamicParameters();
                    parameter.Add("@Genre","Comedy",DbType.String,ParameterDirection.Input);
                    //var Genre = new {Genre = new DbString {Value = "Comedy", IsFixedLength = false, IsAnsi = true}};
                    var invoices = cnn.Query<Movie>(sql, 
                        parameter).ToList();
                }
                catch (System.Exception ex)
                {
                }

			}
		}

        /// <summary>
        /// https://ithelp.ithome.com.tw/articles/10229915
        /// </summary>
        [TestMethod]
        public void t_Parameter_Dynamic_簡式(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook)){
                string _sql = @"
                    SELECT  A.* , B.Name 
                    FROM    albums A 
                            INNER JOIN artists B 
                                ON A.ArtistId = B.ArtistId
                            --: 跟 @ 用法等價
                    WHERE   A.Title = :Title";
                
                var args = new { Title = "Big Ones"};
                var _list = cnn.Query(_sql , args)
                        .ToList();
            }
        }
        

        /// <summary>
        /// </summary>
        [TestMethod]
		public void t_混搭DynLinq(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook))
			{
                try
                {
                    var sql 
                        = @"SELECT A.* , B.Name 
                        FROM    albums A 
                                INNER JOIN artists B 
                                    ON A.ArtistId = B.ArtistId
                        WHERE   A.Title = @Title
                        ";
                    var parameter = new DynamicParameters();
                    parameter.Add("@Title","Big Ones",DbType.String,ParameterDirection.Input);
                    var _r = cnn.Query<albums_ext>(sql, 
                        parameter)
                        .AsQueryable()
                        .OrderBy(c=>c.ArtistId)
                        .PageResult(1,5)
                        .Queryable
                        .ToList();
                    FileApp.Write_SerializeJson(_r,FileApp.getRelatePath(@"Plugin_ex\t_Dapper.json"));
                    
                }
                catch (System.Exception ex)
                {
                    
                    
                }
			}
		}
        /// <summary>
        /// </summary>
        [TestMethod]
		public void t_混搭DynLinq_like(){
            using (var cnn =new SQLiteConnection(t_SQLite.db_Chinook))
			{
                try
                {
                    var sql 
                        //= "SELECT * FROM Movie WHERE Genre = @Genre;";
                        = @"SELECT B.Name , A.* 
                        FROM    albums A 
                                INNER JOIN artists B 
                                    ON A.ArtistId = B.ArtistId
                        WHERE   A.Title like @Title
                        ";
                    /*
                    經測試,只能使用 A% 的語法,如果是直接 在 sql 中,
                        使用 like @Title'%' 則會報錯
                    */
                    var parameter = new DynamicParameters();
                    parameter.Add("@Title","A%",DbType.String,ParameterDirection.Input);
                    var _r = cnn.Query(sql, 
                        parameter)
                        .AsQueryable()
                        .OrderBy("ArtistId desc")
                        .PageResult(1,5)
                        .Queryable
                        .ToList();
                    FileApp.Write_SerializeJson(_r,FileApp.getRelatePath(@"Plugin_ex\t_Dapper.json"));
                }
                catch (System.Exception ex)
                {
                    
                    
                }
			}
		}

   
        
        /// <summary>
        /// https://ithelp.ithome.com.tw/articles/10229915
        /// https://dapper-tutorial.net/result-multi-mapping
        /// </summary>
        [TestMethod]
        public void t_MultiMapping(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook)){
                string _sql = @"
                    SELECT  A.* , B.Name 
                    FROM    albums A 
                            INNER JOIN artists B 
                                ON A.ArtistId = B.ArtistId
                            --: 跟 @ 用法等價
                    WHERE   A.Title = :Title"
                    ;
                
                var args = new { Title = "Big Ones"};
                var _list = cnn.Query<albums_ext,artists,albums_ext>
                    (_sql ,
                    (A,B)=>{
                        A.Name = B.Name;
                        return A;
                    }
                    ,args
                    ,splitOn: "ArtistId")
                    .ToList();
            }
        }


        
        
        /// <summary>
        /// 
        /// </summary>
        [TestMethod]
        public void t_Transaction(){
            using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook)){
                string sql = "INSERT INTO artists (Name) Values (@Name);";
                cnn.Open();
                using (var transaction = cnn.BeginTransaction())  {
                        var args =  new {Name = "Mark"};
                        //使用 Dapper 
                        var affectedRows = cnn.Execute
                            (sql
                            , args
                            , transaction);

                        //使用 Dapper.Transaction
                        var affectedRows_1 = transaction.Execute
                            (sql
                            , args
                            );
                        transaction.Rollback();
                        
                    }
            }
        }

        	/// <summary>
            /// https://dapper-tutorial.net/stored-procedure
            /// 未完成
            /// </summary>
            [TestMethod]
            public void _StoredProcedure(){
                using (var cnn = new SQLiteConnection(t_SQLite.db_Chinook)){
                    var sql = "Invoice_Insert";
                    cnn.Open();
                    using (var transaction = cnn.BeginTransaction())  {
                    	// var affectedRows = connection.Execute(sql,
                        // new {Kind = InvoiceKind.WebInvoice, Code = "Single_Insert_1"},
                        // commandType: CommandType.StoredProcedure);
                    }
                }
 
            }
        
    }
}