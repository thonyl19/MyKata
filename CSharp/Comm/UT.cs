using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace CSharp.Comm
{
    public class UT
    {
        static System.Random rnd = new System.Random();

        public static dynamic Timer(Func<dynamic> fn){
            Stopwatch sw = new Stopwatch();  
            sw.Start();  
            var r = fn();
            sw.Stop();  
            TimeSpan ts2 = sw.Elapsed;  
            Console.WriteLine($"Stopwatch總共花費{ts2.TotalMilliseconds}ms.");  
            return r;
        }

        /// <summary>
        /// 測試資料生成程序
        /// </summary>
        public static int[] rndIntArray(int arrLenth,int Min,int Max,bool isSuffle=true){
            List<int> arr = new List<int>();
            for (int i = 0; i < arrLenth; i++)
            {
                arr.Add(rnd.Next(Min,Max));
            }
            return arr.ToArray();
        }
    }
}