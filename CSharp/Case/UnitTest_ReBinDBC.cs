using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Reflection;
using System;

namespace CSharp
{
    [TestClass]
	public class UnitTest_ReBinDBC
	{
		/// <summary>
		/// obj.dbc 為 private 的物件變數,透過如下方法,可以將 值做變更
		/// </summary>
		/// <param name="obj"></param>
		[TestMethod]
		public void T01(object obj)
		{
			Type _src = obj.GetType();
			FieldInfo dbc_PInfo = _src.GetField
				("dbc"
				, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
			//dbc_PInfo.SetValue(obj, dbc);
		}
	}
}
