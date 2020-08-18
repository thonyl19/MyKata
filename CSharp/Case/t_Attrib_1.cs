using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Case {

    /// <summary>
    /// [Ref]
    /// https://blog.poychang.net/retrieve-data-annotations-from-model/
    /// https://stackoverflow.com/questions/7027613/how-to-retrieve-data-annotations-from-code-programmatically
    /// </summary>
    [TestClass]
    public class t_Attrib_1 {
        [TestMethod]
        public void t_L01 () {
            var obj = new Student () {
                Name = "王大明",
                Birthday = DateTime.Now
            };

            Console.WriteLine (obj.GetAttributeFrom<DisplayAttribute> (nameof (Student.Name)).Name);
            Console.WriteLine (obj.Name);
            Console.WriteLine (obj.GetAttributeFrom<DisplayAttribute> (nameof (Student.Birthday)).Name);
            Console.WriteLine (obj.Birthday);
        }

    }

    public class Student {
        [Display (Name = "姓名")]
        public string Name { get; set; }

        [Display (Name = "生日")]
        public DateTime Birthday { get; set; }
    }

    public static class ObjectExtension
    {
        public static T GetAttributeFrom<T>(this object instance, string propertyName) where T : Attribute
        {
            var attributeType = typeof(T);
            var property = instance.GetType().GetProperty(propertyName);
            if (property == null) return default(T);
            return (T) property.GetCustomAttributes(attributeType, false).FirstOrDefault();
        }

        public static IEnumerable<T> GetAttributeFrom<T>(this object instance) where T : Attribute
        {
            var attributeType = typeof(T);
            var properties = instance.GetType().GetProperties();
            if (properties != null && properties.Length == 0) return default(IEnumerable<T>);
            return properties?.Select(property =>
                (T) property.GetCustomAttributes(attributeType, false).FirstOrDefault());
        }

        
    }

    public static class TypeExtension
    {
        public static T GetAttributeFrom<T>(this Type instance, string propertyName) where T : Attribute
        {
            var attributeType = typeof(T);
            var property = instance.GetProperty(propertyName);
            if (property == null) return default(T);
            return (T) property.GetCustomAttributes(attributeType, false).FirstOrDefault();
        }

        public static IEnumerable<T> GetAttributeFrom<T>(this Type instance) where T : Attribute
        {
            var attributeType = typeof(T);
            var properties = instance.GetProperties();
            if (properties != null && properties.Length == 0) return default(IEnumerable<T>);
            return properties?.Select(property =>
                (T) property.GetCustomAttributes(attributeType, false).FirstOrDefault());
        }
    }
}