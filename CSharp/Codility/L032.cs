/*
[Ref]
    https://app.codility.com/programmers/lessons/3-time_complexity/perm_missing_elem/

[SA]
    1.數組中的元素為 1 到 N+1 的等差級數(不重覆,亂序)
    2.數組其中,有個元素M 丟失,需找出這個 元素M 值為何

 */
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace CSharp.Codility
{
    public class L032
    {
        public static int solution_0(int [] A){
            return 0;
        }

        public static int solution_0_linq(int [] A){
            var x = A
                .GroupBy(i=>i)
                .OrderByDescending(i=>i.Count())
                .Select(i=>new {Key=i,Count=i.Count()})
                .ToList();

            return 0;
        }

        // public int solution(int[] A) {
        //     // write your code in C# 6.0 with .NET 4.5 (Mono)
        //     IEnumerable N = Enumerable.Range(1, A.Length + 1);
        //     int missingNumber = N.Except(A).FirstOrDefault();
        //     return missingNumber;
        // }

        public static int solution_A(int[] A)
        {
            for (int i = 0; i < A.Length; i++)
            {
                if (A[i] == 0)
                {
                    continue;
                }
                int n = A[i] - 1;
                while (n != -1 && n < A.Length)
                {
                    int next = A[n] - 1;
                    A[n] = 0;
                    n = next;
                }
            }
            for (int i = 0; i < A.Length; i++)
            {
                if (A[i] != 0)
                {
                    return i + 1;
                }
            }
            return A.Length + 1;
        }
    }
}