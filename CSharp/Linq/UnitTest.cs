using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.LinqEx
{
    [TestClass]
    public class UnitTest
    {

        [TestMethod]
        public void t_L01()
        {
            L01.Fn2();
        }

        class User { public string Name { get; set; } }

        /// <summary>
        /// [Ref]https://stackoverflow.com/questions/2455659/how-to-use-contains-or-like-in-a-dynamic-linq-query
        /// </summary>
        // [TestMethod]
        // public void t_L02(){
        //    IQueryable<User> query = db.Users;
        //    query = query.Where("@0.Contains(outerIt.Name)", list);
        // }


        /// <summary>
        /// [Ref]https://docs.microsoft.com/zh-tw/dotnet/csharp/programming-guide/concepts/expression-trees/how-to-use-expression-trees-to-build-dynamic-queries
        /// </summary>
        [TestMethod]
        public void t_運算式樹狀架構建立動態查詢(){
            /*
           string[] companies = { "Consolidated Messenger", "Alpine Ski House", "Southridge Video", "City Power & Light",  
                   "Coho Winery", "Wide World Importers", "Graphic Design Institute", "Adventure Works",  
                   "Humongous Insurance", "Woodgrove Bank", "Margie's Travel", "Northwind Traders",  
                   "Blue Yonder Airlines", "Trey Research", "The Phone Company",  
                   "Wingtip Toys", "Lucerne Publishing", "Fourth Coffee" };  
  
            // The IQueryable data to query.  
            IQueryable<String> queryableData = companies.AsQueryable<string>();  
            
            // Compose the expression tree that represents the parameter to the predicate.  
            ParameterExpression pe = Expression.Parameter(typeof(string), "company");  
            
            // ***** Where(company => (company.ToLower() == "coho winery" || company.Length > 16)) *****  
            // Create an expression tree that represents the expression 'company.ToLower() == "coho winery"'.  
            Expression left = Expression.Call(pe, typeof(string).GetMethod("ToLower", System.Type.EmptyTypes));  
            Expression right = Expression.Constant("coho winery");  
            Expression e1 = Expression.Equal(left, right);  
            
            // Create an expression tree that represents the expression 'company.Length > 16'.  
            left = Expression.Property(pe, typeof(string).GetProperty("Length"));  
            right = Expression.Constant(16, typeof(int));  
            Expression e2 = Expression.GreaterThan(left, right);  
            
            // Combine the expression trees to create an expression tree that represents the  
            // expression '(company.ToLower() == "coho winery" || company.Length > 16)'.  
            Expression predicateBody = Expression.OrElse(e1, e2);  
            
            // Create an expression tree that represents the expression  
            // 'queryableData.Where(company => (company.ToLower() == "coho winery" || company.Length > 16))'  
            MethodCallExpression whereCallExpression = Expression.Call(  
                typeof(Queryable),  
                "Where",  
                new Type[] { queryableData.ElementType },  
                queryableData.Expression,  
                Expression.Lambda<Func<string, bool>>(predicateBody, new ParameterExpression[] { pe }));  
            // ***** End Where *****  
            
            // ***** OrderBy(company => company) *****  
            // Create an expression tree that represents the expression  
            // 'whereCallExpression.OrderBy(company => company)'  
            MethodCallExpression orderByCallExpression = Expression.Call(  
                typeof(Queryable),  
                "OrderBy",  
                new Type[] { queryableData.ElementType, queryableData.ElementType },  
                whereCallExpression,  
                Expression.Lambda<Func<string, string>>(pe, new ParameterExpression[] { pe }));  
            // ***** End OrderBy *****  
            
            // Create an executable query from the expression tree.  
            IQueryable<string> results = queryableData.Provider.CreateQuery<string>(orderByCallExpression);  
            
            // Enumerate the results.  
            foreach (string company in results)  
                Console.WriteLine(company);  
                */
        }
        
 
        /*
        https://dotblogs.com.tw/willsublog/2018/05/30/104022
        */
        [TestMethod]
        public void t_FilterEndWith()
        {
            var list = new List<string>() {"ASUS_PC","Acer_PC","BenQ", "Toshiba", "IBM", "HP", "Dell", "PChome"};
            //var _filter = "Q";
            var s1 = list.Where(p => p.Contains("PC")).ToList();
            var s2 = list.Where(p => p.StartsWith("PC")).ToList();
            var s3 = list.Where(p => p.EndsWith("PC")).ToList();
            var s4 = list
                .Where(p => p.EndsWith("PC") || p.EndsWith("Q"))
                .ToList();
             
        }

        /// <summary>
        /// 工作應用的情境,需要將字串資料 轉為以下格式
        ///     [{"A":""},{"B":""},{"C":""}]
        /// 然後前端再用進個做回傳,由後端接收處理,
        ///     同樣是以 List<Dictionary<string, string>> 格式做接收即可
        /// </summary>
        [TestMethod]
		public void t_List_Dictionary()
		{
			//以下程序,只是用於演示如何簡化產生值的語法
			var z = new Dictionary<string, string>() { { "A", "" } };
        	var _data = new List<Dictionary<string, string>>
			{
				new Dictionary<string, string>() { { "Cat", "" } },
				new Dictionary<string, string>() { { "Owl", "" } },
				new Dictionary<string, string>() { { "Rat", "" } },
				new Dictionary<string, string>() { { "Bat", "" } },
			};
            
            
            var s = "A,B,C";
			var data = s.Split(',').Select(x =>{
				return new Dictionary<string, string>() { { x, "" } };
			}).ToList();


            /*
            以下這段 ,是承上接收後 ,要做解析處理的程序 , 也是需要一些眉角,
                故特此誌之.
                [{"A":""},{"B":""},{"C":""}]
            */
            List<object> valueList = new List<object>();
			foreach (var dItem in _data)
			{
				var keys = dItem.Keys;
				if (keys.Count == 0) continue;
				var inputVal = dItem[keys.First()];
				valueList.Add(inputVal);
			}

		}
 
    }
}
