using System;
using System.Collections.Generic;
using System.Diagnostics;
using CSharp.Codility;
using CSharp.Comm;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Codility
{
    [TestClass]
    public class UnitTest
    {

        [TestMethod]
        public void t_L01()
        {
 
        }

        [TestMethod]
        public void t_L021()
        {
            Func<int[] ,bool,dynamic> fn =  L021.solution_A;
            for (var i=0 ; i < 100 ;i++){
                var r =  //L021.GenTest(100003,false,100003);
                    new {
                        one =1 ,
                        list =  new int[]{1,7,7,7,9,9,9}
                    };
                var t1_A = UT.Timer(()=>{return  fn(r.list,true);});
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


        [TestMethod]
        public void t_L022()
        {
            Func<int[],int,int[]> fn = L022.solution_0;
            int[] arr =  new int[]{1,2,3,4,5,6};
            Assert.AreEqual("123456",string.Join("",fn(arr,6)));
            Assert.AreEqual("612345",string.Join("",fn(arr,7)));
            Assert.AreEqual("561234",string.Join("",fn(arr,2)));
            Assert.AreEqual("345612",string.Join("",fn(arr,10)));
            Assert.AreEqual("234561",string.Join("",fn(arr,11)));
        }

        
        [TestMethod]
        public void t_L032()
        {
            Func<int,int,int,int> fn = L031.solution_0;
            Assert.AreEqual(3,fn(10,85,30));
        }
 
    }
}
