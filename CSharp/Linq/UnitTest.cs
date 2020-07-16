using System.Collections.Generic;
using System.Linq;
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
			var s = "A,B,C";
			var data = s.Split(',').Select(x =>{
				return new Dictionary<string, string>() { { x, "" } };
			}).ToList();

			var z = new Dictionary<string, string>() { { "A", "" } };

			var _data = new List<Dictionary<string, string>>
			{
				new Dictionary<string, string>() { { "Cat", "" } },
				new Dictionary<string, string>() { { "Owl", "" } },
				new Dictionary<string, string>() { { "Rat", "" } },
				new Dictionary<string, string>() { { "Bat", "" } },
			};
			//new FileApp().Write_SerializeJson(data, FileApp.ts_Log(@"t_.json"));

		}

    }
}
