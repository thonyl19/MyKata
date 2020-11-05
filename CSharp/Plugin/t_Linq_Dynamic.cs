

using System.Data;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System;
using Microsoft.EntityFrameworkCore;

namespace CSharp.Plugin
{
	[TestClass]
    public class t_Linq_Dynamic {
 
        /// <summary>
        /// https://ithelp.ithome.com.tw/questions/10194647
        /// </summary>
        [TestMethod]
		public void t_001(){
            var datas = new[] { new { id = 1, value = "001" }, new { id = 2, value = "002" } };
			var result = datas
                .AsQueryable()
                .Where("id=@0", 1);
            
		}

        /// <summary>
        /// https://dotnetfiddle.net/xz6pr2
        /// </summary>
        [TestMethod]
		public void t_Page(){
            using (var cnn = new MvcMovieContext())
			{
                var example1 = cnn.Movie
                    .Page(1,2)
                    .ToList();
            }
        }

        /// <summary>
        /// https://dynamic-linq.net/
        /// </summary>
        [TestMethod]
		public void t_Base(){
            using (var cnn = new MvcMovieContext())
			{
                //Genre = "Comedy"
                var query =  cnn.Movie
                    .Where("Genre = @0",  "Comedy")
                    .ToList();
            }
        }

        /// <summary>
        /// https://dynamic-linq.net/
        /// </summary>
        [TestMethod]
		public void t_ParseLambdaMethod(){
            using (var cnn = new MvcMovieContext())
			{
                var e1 = DynamicExpressionParser
                    .ParseLambda<Movie, bool>
                    (new ParsingConfig()
                    , true
                    , "Genre = @0", "Comedy");
   
                //重點是那個 (it)  沒有加 ,就會報錯
                var query =  cnn.Movie
                    .Where("@0(it)",  e1)
                    .ToList();
                
            }
        }

        /// <summary>
        /// 
        /// </summary>
        [TestMethod]
		public void t_ExpressionLanguage(){
            var baseQuery = new int[] { 1, 2, 3, 4, 5 }.AsQueryable();
    		var result1 = baseQuery.Select("it * $");
        	var result2 = baseQuery.Where("it % 2 = 0");
        }

        /// <summary>
        /// 
        /// </summary>
        [TestMethod]
		public void t_null(){
            var baseQuery = new int?[] { 1, null, 3, null, 5 }.AsQueryable();
    		var result1 = baseQuery.Where("it == null ");
        	var result2 = baseQuery.Where("it != null ");
        }


        /// <summary>
        /// https://dotnetfiddle.net/dy4vkE
        /// </summary>
        [TestMethod]
		public void t_like(){
            using (var cnn = new MvcMovieContext())
			{
                //傳統用法
                var example1 = cnn.Movie
                    //.Where("Genre like %@0%",  "C")
                    .Where(c => EF.Functions.Like(c.Genre,"%C%"))
                    .ToList();
                /*
                以下語法不 work
                var example2 = cnn.Movie
                    //.Where("Genre like %@0%",  "C")
                    .Where("DynamicFunctions.Like(Genre, \"%C%\")")
                    .ToList();
                */
            }
        }

        /// <summary>
        /// https://dotnetfiddle.net/dy4vkE
        /// </summary>
        [TestMethod]
		public void t_And(){
            using (var cnn = new MvcMovieContext())
			{
                //傳統用法
                var example1 = cnn.Movie
                    //.Where("Genre == @0 and Price > @1","Comedy",100)
                    .Where("Genre == @0 && Price > @1","Comedy",100)
                    .ToList();

                var example2 = cnn.Movie
                    .Where(c => c.Genre == "Paris" && c.Price > 50)
                    .ToList();
                
                var example3 = cnn.Movie
                    .Where("c => c.Genre == \"Paris\" && c.Price > 50")
                    .ToList();
            }
        }

        /// <summary>
        /// https://dynamic-linq.net/basic-simple-query
        /// https://dotnetfiddle.net/b464OO
        /// </summary>
        [TestMethod]
        public void t_PageResult(){
            using (var cnn = new MvcMovieContext())
			{
                var example1 = cnn.Movie
                    .Where(c=>EF.Functions.Like(c.Genre,"%C%"))
                    .OrderBy(c=>c.Id) 
                    .PageResult(1,2)
                    ;
                var example2 = example1.Queryable.ToList();
            }
        }


        /// <summary>
        /// https://dotnetfiddle.net/xz6pr2
        /// </summary>
        [TestMethod]
		public void t_OrderBy(){
            using (var cnn = new MvcMovieContext())
			{
                //傳統用法
                var example1 = cnn.Movie
                    .OrderBy(c => c.Id).ThenBy(c => c.Genre)
                    .ToList();
                // Example 2: Dynamic
                var example2 = cnn.Movie
                    .OrderBy("Id, Genre desc")
			        .ToList();
                // Example 3: Dynamic
                var example3 = cnn.Movie
                    .OrderBy("Id").ThenBy("Genre desc")
			        .ToList();

                // Example 3: Dynamic
                var example4 = cnn.Movie
                    .OrderBy("Id, Genre desc")
			        .ToList();
			}
		}

	}
 
}