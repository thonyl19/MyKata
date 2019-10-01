using CSharp.DesingPattern;
using CSharp_2019;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp
{
    [TestClass]
    public class UnitTest1
    {
        // [TestMethod]
        // public void TestMethod1()
        // {
        //     var r = A03.Test(519);
        // }

        [TestMethod]
        public void SimpleFactory()
        {
            var store = new SimpleFactory();
            var total = store.NewOrder()
                .Order(eDrinks.GreenTea,2)
                .Order(eDrinks.Coffee,2)
                .Checkout();
            Assert.AreEqual(total,70);
        }
    }
}
