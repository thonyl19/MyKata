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
    public class t_STD {

        [TestMethod]
        public void t_Base () {
            var _data = Sample.Case1().persons;
            var _r = (from t in _data
                select new Dictionary<string,string>(){{t.Name,t.Addres}}
            ).ToList();
        }    
    }
}