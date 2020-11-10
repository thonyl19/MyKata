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
        /// [Ref]https://blog.darkthread.net/blog/json-linq-wo-declare-class/
        /// </summary>
        [TestMethod]
        public void t_反序列化Json () {
            dynamic data = JsonConvert.DeserializeObject<JObject>(
                Sample_Json.Case1);

            dynamic[] data1 = JsonConvert.DeserializeObject<JObject[]>(
                    Sample_Json.Case2);

            var x = data1.First();
            var s = $@"
                FirstName: {x.FirstName}
                LastName: {x.LastName}
                Age: {x.Age}";
        }    
    }
}