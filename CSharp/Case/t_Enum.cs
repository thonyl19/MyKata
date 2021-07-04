using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using CSharp.Linq;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

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

        public enum EUnitOfMeasure
        {
            [EnumMember(Value = "KM")]
            Kilometer,
            [EnumMember(Value = "MI")]
            Miles
        }

        
        public struct MyEnumClass
        {
            public const string 
                MyValue1 = "My value 1",
                MyValue2 = "My value 2";
        }

        /// <summary>
        /// Nameof 式的應用法
        /// </summary>
        public static class Colours
        {
            public static string Red => nameof(Red);
            public static string Green => nameof(Green);
            public static string Blue => nameof(Blue);
        }

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
            var zz =((TypeB) TypeA.A1);

        }
        
        /// <summary>
        /// [Ref]https://stackoverflow.com/questions/8588384/how-to-define-an-enum-with-string-value
        /// </summary>
        [TestMethod]
        public void t_MyEnumClass(){
            string A1 = MyEnumClass.MyValue1;

        }

        /// <summary>
        /// [Ref]https://stackoverflow.com/questions/8588384/how-to-define-an-enum-with-string-value
        /// 這個方法 不符合需求 ,但 因為是是可以在 序列化時派上用場 ,故特此誌之
        /// </summary>
        [TestMethod]
        public void t_EUnitOfMeasure(){
            var A1 = EUnitOfMeasure.Kilometer;
            var A2 = JsonConvert.SerializeObject(EUnitOfMeasure.Kilometer, new StringEnumConverter());
            
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
