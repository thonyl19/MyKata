using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
 

namespace CSharp.Linq
{
    [TestClass]
    public class t_Expression
    {
        /// <summary>
        /// https://docs.microsoft.com/zh-tw/dotnet/csharp/expression-classes
        /// </summary>
        [TestMethod]
        public void t_基本概念()
        {
            var one = Expression.Constant(1, typeof(int));
            var two = Expression.Constant(2, typeof(int));
            //最終結果,addition => "1 + 2"
            var addition = Expression.Add(one, two);

            Expression<Func<int>> add = () => 1 + 2;
            var func = add.Compile(); // Create Delegate
            var a1 = func(); // Invoke Delegate

            //根據前一式的演化
            Expression<Func<int,int>> add1 = (i1) => 1 + 2 +i1;
            var func1 = add1.Compile(); // Create Delegate
            var a2 = func1(10); // Invoke Delegate
             
        }

        /// <summary>
        /// https://docs.microsoft.com/zh-tw/dotnet/csharp/expression-trees-interpreting
        /// </summary>
        [TestMethod]
        public void t_基本概念1()
        {
            var constant = Expression.Constant(24, typeof(int));
            var arr = new string[]{
                $"This is a/an {constant.NodeType} expression type",
                $"The type of the constant value is {constant.Type}",
                $"The value of the constant value is {constant.Value}"
            };

        }

        /// <summary>
        /// https://docs.microsoft.com/zh-tw/dotnet/csharp/expression-trees-building
        /// </summary>
        [TestMethod]
        public void t_組建運算式樹狀架構()
        {
            var one = Expression.Constant(1, typeof(int));
            var two = Expression.Constant(2, typeof(int));

            var addition = Expression.Add(one, two);
            var lambda = Expression.Lambda(
                Expression.Add(
                    Expression.Constant(1, typeof(int)),
                    Expression.Constant(2, typeof(int))
                )
            );
        }

    }
    
    public static class t_Expression_1
    {
        /// <summary>
        /// [Ref]https://stackoverflow.com/questions/2471588/how-to-get-index-using-linq/20239513
        /// </summary>
        /// <param name="items"></param>
        /// <param name="predicate"></param>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public static int FindIndex<T>(this IEnumerable<T> items, Predicate<T> predicate) {
            int index = 0;
            foreach (var item in items) {
                if (predicate(item)) break;
                index++;
            }
            return index;
        }
        
    }
    
}

