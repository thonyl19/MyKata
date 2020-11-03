using System.Data;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq.Dynamic.Core;

namespace CSharp.Plugin
{
	[TestClass]
    public class t_Linq_Dynamic {
 
        /// <summary>
        /// https://ithelp.ithome.com.tw/questions/10194647
        /// </summary>
        [TestMethod]
		public void T_001(){
            var datas = new[] { new { id = 1, value = "001" }, new { id = 2, value = "002" } };
			var result = datas
                .AsQueryable()
                .Where("id=@0", 1);
            
		}

        /// <summary>
        /// https://dotnetfiddle.net/xz6pr2
        /// </summary>
        [TestMethod]
		public void T_Page(){
            using (var cnn = new MvcMovieContext())
			{
                var example1 = cnn.Movie
                    .Page(1,2)
                    .ToList();
            }
        }


        /// <summary>
        /// https://dotnetfiddle.net/xz6pr2
        /// </summary>
        [TestMethod]
		public void T_OrderBy(){
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