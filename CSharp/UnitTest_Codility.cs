using System;
using System.Collections.Generic;
using System.Diagnostics;
using CSharp.Codility;
using CSharp.Comm;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp
{
    [TestClass]
    public class UnitTest_Codility
    {

        [TestMethod]
        public void t_L01()
        {
 
        }

        [TestMethod]
        public void t_L021()
        {
            for (var i=0 ; i < 100 ;i++){
                var r = 
                    L021.GenTest(100003,false,100003);
                    // new {
                    //     one =1 ,
                    //     list =  new int[]{1,7,7,7,9,9,9}
                    // };
                var t1_A = UT.Timer(()=>{return  L021.solution_0_linq(r.list,true);});
                Assert.AreEqual(t1_A.Ans,r.one);
            }
        }

        [TestMethod]
        public void t_L021_GenTest()
        {
            int _range = 11 ;
            var r = L021.GenTest(_range);
            Assert.AreEqual(r.list.Length,_range);
        }

        
 
 
    }
}
