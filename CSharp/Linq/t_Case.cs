using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Linq {
    
    /// <summary>
    /// https://zh.wikipedia.org/wiki/%E8%AF%AD%E8%A8%80%E9%9B%86%E6%88%90%E6%9F%A5%E8%AF%A2
    /// </summary>
    [TestClass]
    public class t_Case {
        [TestMethod]
        public void t_L01 () {
            // try {
            //     string CategoryName = "CategoryName";
            //     var param = new ObjectParameter[] { 
            //             new ObjectParameter ("Name", CategoryName)
            //     };
            //     var query = base.CurrentDataSource.Categories
            //         .Where("it.CategoryName = @Name"
            //             , param }
            //         );
            // } catch (Exception) {
            //     throw;
            // }
            // return query;
        }

        [TestMethod]
        public void t_02(){
            int[] array = { 1, 5, 2, 10, 7 };  
            // Select squares of all odd numbers in the array sorted in descending order
            var results = from x in array
                where x % 2 == 1
                orderby x descending
                select x * x;
        }

        void t_03(){
            var sample1 = Sample.Case1();
            var _linq寫法 =  
                from A0 in sample1.persons 
                    join A1 in sample1.phones 
                        on A0.Name equals A1.Person.Name
                select new {Name = A0.Name,phoneNumber = A1.PhoneNumber}
                ;

            var _lambda寫法 = sample1.persons.Join(
                sample1.phones, 
                person => person,
                phone => phone.Person,
                (person,phone) => 
                    new { name = person.Name , phoneNumber = phone.PhoneNumber }
            );

            var _x = 
                from c in sample1.phones
                from o in c.PhoneNumber
                select o
                ;
        }

        [TestMethod]
        public void t04(){
            var _x = 
                from o in "PhoneNumber"
                select o
                ;

            ///其結果,會 PhoneNumber 拆解成字元列表
            var _r = _x.ToList();
        }

        /// <summary>
        /// https://github.com/dotnet/try-samples/blob/master/101-linq-samples/src/SetOperations.cs
        /// </summary>
        [TestMethod]
        public void t_Except_剔除兩個集合中重覆的資料(){
            int[] numbersA = { 0, 2, 4, 5, 6, 8, 9 };
            int[] numbersB = { 1, 3, 5, 7, 8 };
            IEnumerable<int> aOnlyNumbers = numbersA.Except(numbersB);
            //結果為 剔除 numbersA 中,與  numbersB 重覆的項目值
            var _r = aOnlyNumbers.ToArray();
        }

        /// <summary>
        /// https://github.com/dotnet/try-samples/blob/master/101-linq-samples/src/SetOperations.cs
        /// </summary>
        [TestMethod]
        public void t_DifferenceOfQueries(){
            var _x = Sample.Case1();
            var _A = from p in _x.phones
                                    select p.Person.Name[0];
            var _B = from c in _x.persons
                                     select c.Name[0];
            var aOnlyNumbers = _A.Except(_B);
            // 沒測出原本 範例中,想要表達出來的效果
            var _r = aOnlyNumbers.ToArray();
        }

        /// <summary>
        /// https://dotblogs.com.tw/invercent914/2016/01/14/175006
        /// </summary>
        [TestMethod]
        public void t_空值判斷寫法(){
            var _x = Sample.Case1().phones;
            var  firstItemValue = _x.FirstOrDefault()?.Person?.Name?? "替代值";
        }

         
        
    }


    

    /*
    [Ref]
    https://blog.darkthread.net/blog/linq-except-for-custom-class/
    https://gist.github.com/s1495k043/9e192daa00c752e1d77b4e0bd5153062
    */
    public static class LinqExtension
    {
        // 這一段 有錯 不 work ,先留註.
        // public static IEnumerable<T> Except<T, TValue>(this IEnumerable<T> list, IEnumerable<T> second, Func<T, TValue> selector)
        // {
        //     return list.Except(second, new CommonComparer(selector));
        // }

        class CommonComparer<T, TValue> : IEqualityComparer<T>
        {
            public Func<T, TValue> selector;

            public CommonComparer(Func<T, TValue> selector)
            {
                this.selector = selector;
            }

            public CommonComparer()
            {
            }

            public bool Equals(T x, T y)
            {
                var a = selector(x);
                var b = selector(y);
                return a.Equals(b);
            }

            public int GetHashCode(T obj)
            {
                var v = selector(obj);
                return v.GetHashCode();
            }
        }
    }
}
