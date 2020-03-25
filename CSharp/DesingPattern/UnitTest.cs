using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.DesingPattern
{
    [TestClass]
    public class UnitTest
    {
 
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
