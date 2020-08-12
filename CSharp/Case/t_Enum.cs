using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Case
{
    [TestClass]
    public class t_Enum
    {
        enum TypeA {
            A1,
            A2,
            A3
        }
        enum TypeB {
            B1,
            B2,
            B3
        }

        enum Colors { Red, Green, Blue, Yellow };
    enum Styles { Plaid = 0, Striped = 23, Tartan = 65, Corduroy = 78 };

        [TestMethod]
        public void t_L01()
        {
            var arr = new List<string>();
            foreach(int i in Enum.GetValues(typeof(Colors))){
                 arr.Add(string.Format("{0,3} - {1}",(int) i, ((Colors) i)));
            }
            x(TypeA.A1);
            x(TypeB.B1);

            // 測試,直接將 TypeA.A1 轉成 B 並取值
            var z =((TypeB) TypeA.A1);

        }
        
        public void x(object t1){
            var enumTypes = t1.GetType();//.GetNestedTypes(BindingFlags.Public);
            //var pubEnums = enumTypes.Where(t => t.IsEnum);
            List<string> arr = new List<string>();
            var enumNames = enumTypes.GetEnumNames();
            foreach(var name in enumNames)
                arr.Add($"EnumName:{name}");
            
            Console.Write(arr);
        }
    }
}
