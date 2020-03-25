using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Reflection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CSharp
{
	public static class _ext
	{
		public static T TransTo<T>(this object src, bool IgnoreErr = true) where T : new()
		{
			Type _src = src.GetType();
			T targetObj = new T();
			Type _target = targetObj.GetType();

			Dictionary<string, object> _srcDC
					= _src
					.GetProperties(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance)
					.ToLookup(t => t.Name, t => t)
					.ToDictionary(p => p.Key, p =>
					{
						try
						{
							return p.First().GetValue(src);
						}
						catch (Exception Ex)
						{
							if (!IgnoreErr) throw Ex;
						}
						return null;
					});

			PropertyInfo[] _targetFileds
					= _target
					.GetProperties(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
			Parallel.ForEach(_targetFileds, (field) =>
			{
				object _val = null;
				if (_srcDC.TryGetValue(field.Name, out _val))
				{
					try
					{
						field.SetValue(targetObj, _val);
					}
					catch (Exception Ex)
					{
						if (!IgnoreErr) throw Ex;
					}
				}
			});
			return targetObj;
		}
	}

	[TestClass]
	public class UnitTest_TransTo
	{
		/// <summary>
		/// obj.dbc 為 private 的物件變數,透過如下方法,可以將 值做變更
		/// </summary>
		/// <param name="obj"></param>
		[TestMethod]
		public void T01(object obj)
		{
			//_lot.TransTo<MDL.MES.WP_LOT>();
		}
	}
}
