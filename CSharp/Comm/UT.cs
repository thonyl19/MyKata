using System;
using System.Diagnostics;

namespace CSharp.Comm
{
    public class UT
    {
        public static dynamic Timer(Func<dynamic> fn){
            Stopwatch sw = new Stopwatch();  
            sw.Start();  
            var r = fn();
            sw.Stop();  
            TimeSpan ts2 = sw.Elapsed;  
            Console.WriteLine($"Stopwatch總共花費{ts2.TotalMilliseconds}ms.");  
            return r;
        }
    }
}