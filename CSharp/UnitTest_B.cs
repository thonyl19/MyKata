using System.Collections.Generic;
using CSharp_2019;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp
{
    [TestClass]
    public class UnitTest_B
    {

        [TestMethod]
        public void t_B01()
        {
            string Key1 = "ABCDEF";
            string Key2 = string.Join("", B01.KnuthShuffle(Key1.ToCharArray()));
            Assert.AreNotEqual(Key1,Key2);
        }
 
        [TestMethod]
        public void t_B02()
        {
            var arr = new int[]{12,13,1,6,2,9,4,1,1};
            var Key1 = "11124691213";
            string Key2 = string.Join("", B02.BubbleSort(arr));
            Assert.AreEqual(Key1,Key2);
        }
 
    }
}
