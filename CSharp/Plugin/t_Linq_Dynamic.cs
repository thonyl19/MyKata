

using System.Data;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System;
using Microsoft.EntityFrameworkCore;
using CSharp.Linq;

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
        /// https://dynamic-linq.net/expression-language
        /// </summary>
        [TestMethod]
		public void t_in(){
            var rangeOfNumbers = Enumerable.Range(1, 100).ToArray();
            var result1 = rangeOfNumbers.AsQueryable()
                .Where("it in (1,3,5,7, 101)").ToArray();

            var values = new int[] { 2, 4, 6, 8, 102};
            var result2 = rangeOfNumbers.AsQueryable()
                .Where("it in @0", values).ToArray();
        }

        /// <summary>
        /// https://dynamic-linq.net/expression-language
        /// 條件式轉換, 將值 判斷是否為偶數,並取得結果
        /// </summary>
        [TestMethod]
		public void t_Conditional_Operator(){
            var baseQuery = new int[] { 1, 2, 3, 4, 5 }.AsQueryable();
            //var result = baseQuery.Select(" it % 2 == 0 ? true : false");
            var result = baseQuery.Select("new (it)");
        }

        /// <summary>
        /// https://dynamic-linq.net/advanced-null-propagation
        /// 1.示範 null 判斷,和子項內容判斷
        /// 2.null to  default value
        /// </summary>
         [TestMethod]
		public void t_Null_Propagation(){
            var _Sample = Sample.Case1();
            var _r = _Sample.phones.AsQueryable()
                .Include(c => c.Person) 
                .Where("np(Person.Name) == \"Peter\"")
                .ToList();
            
            //模擬一個 null 項目
            var _item = new Phone(){
                PhoneNumber="null to  default value"
                ,Person = new Person(){Name=null}
                };
            _r.Add(_item);

            var _r1 = _r.AsQueryable()
                .Include(c => c.Person) 
                .Where("np(Person.Name,\"test\") == \"test\"")
                .ToList();

              
        }
        
        

        /// <summary>
        /// https://dynamic-linq.net/advanced-create-dynamic-class
        /// 使用DynamicClassFactory創建動態創建的類型具有兩個屬性的簡單的例子，
        /// Name和Birthday然後使用.NET反射來創建類和分配值的屬性的一個實例。
        /// </summary>
         [TestMethod]
		public void t_Create_Dynamic_Class(){
            var props = new DynamicProperty[]
            {
                new DynamicProperty("Name", typeof(string)),
                new DynamicProperty("Birthday", typeof(DateTime)) 
            };

            Type type = DynamicClassFactory.CreateType(props);

            var dynamicClass = Activator.CreateInstance(type) as DynamicClass;
            dynamicClass.SetDynamicPropertyValue("Name", "Albert");
            dynamicClass.SetDynamicPropertyValue("Birthday", new DateTime(1879, 3, 14));
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