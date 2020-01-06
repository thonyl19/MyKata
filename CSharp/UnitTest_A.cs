using System.Collections.Generic;
using System.Linq;
using CSharp.Comm;
using CSharp_2019;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp
{
    [TestClass]
    public class UnitTest_A
    {

        [TestMethod]
        public void t_A01()
        {
            Assert.AreEqual(A01.fn(4),-2);
            Assert.AreEqual(A01.fn(5),3);
        }

        [TestMethod]
        public void t_A02()
        {
            var arr = A02.GenArray();
            Assert.AreEqual(arr.Length,52,"檢核陣列是否為 52 張牌");
            var key1 = string.Join("",arr);
            A02.Shuffle(arr);
            var key2 = string.Join("",arr);
            Assert.AreNotEqual(key1 ,key2);
        }

        /// <summary>
        /// 找出數组中重復的數字
        /// </summary>
        [TestMethod]
        public void t_A03()
        {
            for (int i = 0; i < 10; i++)
            {
                var arr =  UT.seqIntArray(10,0,true);
                    //"4620381695".ToCharArray().Select(e=>int.Parse(e.ToString())).ToArray();
                int ans = arr[0];
                arr[9]=ans ;
                string z = string.Join("", arr.Select(e=>e.ToString()).ToArray());
                var a = A03.fn(arr);
                Assert.AreEqual(ans,a);
            }
        }
    }
}
