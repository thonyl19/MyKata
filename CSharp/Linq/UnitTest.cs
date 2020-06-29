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
 
    }
}
