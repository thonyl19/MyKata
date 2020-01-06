using System;
using System.Collections.Generic;

namespace CSharp.Linq
{
    public static class Expression
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