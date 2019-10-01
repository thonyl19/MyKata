using System.Collections.Generic;
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
    }
}
