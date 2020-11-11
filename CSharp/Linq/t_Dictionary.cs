using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Linq {
    
    /// <summary>
    /// 
    /// </summary>
    [TestClass]
    public class t_Dictionary {

        /*
        由linq 取資料後,直接做成 Dictionary 格式
        */
        [TestMethod]
        public void t_Base () {
            var _data = Sample.Case1().persons;
            var _r = (from t in _data
                select new Dictionary<string,string>(){{t.Name,t.Addres}}
            ).ToList();

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
    

        /// <summary>
        /// https://stackoverflow.com/questions/43570178/how-to-convert-dictionarystring-object-to-listt
        /// 如何將Dictionary <string，object>轉換為List <T>
        /// </summary>
        [TestMethod]
        public void t_Case1(){
            var _data = Sample.Case1().persons;

            /*這一段,先模擬案例中的需求,做出類似的資料
                {"Users[0].Id", 1},
                {"Users[0].Name", "Rajib"},
                {"Users[0].Email", "rajib@azr.com"},
                {"Users[1].Id", 2},
                {"Users[1].Name", "Ashiq"},
            */
            var _dc = new Dictionary<string, object>();
            var idx = 0;
            foreach (var item in _data)
            {
                var _Properties = item.GetType().GetProperties();
                foreach (var item1 in _Properties)
                {
                    var _key = $"Person[{idx}].{item1.Name}";
                    var _val = item1.GetValue(item);
                    _dc.Add(_key,_val);
                }
                idx++;
            }
        
            var data = _dc.GroupBy(item => item.Key.Substring(0, item.Key.IndexOf(".")))
                .Select(group => group.Aggregate(new Person(), (_obj, item) =>
                {
                    var _name = item.Key.Substring(item.Key.IndexOf(".") + 1);
                    var propertyInfo = _obj.GetType().GetProperty(_name);
                    var _val = Convert.ChangeType(item.Value, propertyInfo.PropertyType);
                    propertyInfo.SetValue(_obj, _val, null);
                    return _obj;
                })).ToList();
        }
    
    }
}