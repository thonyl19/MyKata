using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CSharp.Linq {
    /// <summary>
    /// 
    /// </summary>
    [TestClass]
    public class t_Dynamic {

        /// <summary>
        /// [Ref]
        /// https://blog.darkthread.net/blog/json-linq-wo-declare-class/
        /// https://blog.darkthread.net/blog/json-net-and-dynamic/
        /// 演示如何不設物件,直接解析並取用 Json 資料
        /// </summary>
        [TestMethod]
        public void t_Json反序列化 () {
            dynamic[] data1 = JsonConvert.DeserializeObject<JObject[]>(
                    Sample_Json.Case2);

            var x = data1.First();
            var _s = $@"
                FirstName: {x.FirstName}
                LastName: {x.LastName}
                Age: {x.Age}";


            dynamic data = JsonConvert.DeserializeObject<JObject>(
                Sample_Json.Case1);


            JObject jo = JObject.Parse(Sample_Json.Case3);
            DateTime d = jo.Property("d").Value.Value<DateTime>();
            int n = jo["n"].Value<int>();
            string s = jo["s"].Value<string>();
            int[] ary = jo["a"].Value<JArray>()
                               .Select(o => o.Value<int>()).ToArray();

            
            dynamic dyna = jo as dynamic;
            var ary1 = ((JArray)jo["a"]).Cast<dynamic>().ToArray();
            Console.WriteLine("d:{0},n:{1},s:{2},a:{3}", dyna.d, dyna.n, dyna.s,
                string.Join("/", ary1));

        }    
        
        /// <summary>
        /// [Ref]
        /// </summary>
        [TestMethod]
        public void t_Json序列化 () {
            dynamic dyna = new JObject();
            dyna.d = new DateTime(2015, 1, 1);
            dyna.n = 32767;
            dyna.s = "darkthread";
            dyna.a = new JArray(1, 2, 3, 4, 5);
            Console.WriteLine("JSON:{0}", dyna.ToString(Formatting.None));
        }
        
    }
}