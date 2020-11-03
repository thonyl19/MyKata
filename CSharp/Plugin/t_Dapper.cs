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
        private PersonValidator validator;

        /// <summary>
        /// 初始化設定
        /// </summary>
        [TestInitialize]
        public void Setup () {
            //validator = new PersonValidator ()
        }

 

        [TestMethod]
		public void T_新增資料(){
            var db_path = @"data source=.\MvcMovie.db;version=3;";
            //以下語法 不work
            //using (IDbConnection cnn = new MvcMovieContext())
            using (IDbConnection cnn = new SQLiteConnection(db_path))
			{
                //cnn.Open();
                string _sql = @"
                    select * from Movie
                ";
				var x = cnn.Query<Movie>(_sql).ToList();
			}
		}
 
        
    }
}