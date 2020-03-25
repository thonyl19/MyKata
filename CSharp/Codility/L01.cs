/*
SPEC>
    1.將整數轉成 二進位值
    2.計算二進位值中,連續零(間隔)最長長度
    3.連續零結尾的下一位數如果不為1,則不列計該連續零長度
    4.如果不包含間隔則函數應返回 0.
*/

using System;

namespace CSharp.Codility
{
    public class L01
    {
        public static int Test(int val){
            return fn(val);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="N"></param>
        /// <returns></returns>
        /// SPEC>
        /// 1.將整數轉成 二進位值
        /// 2.計算二進位值中,連續零(間隔)最長長度
        /// 3.連續零結尾的下一位數如果不為1,則不列計該連續零長度
        /// 4.如果不包含間隔則函數應返回 0.
        static int fn(int N){
            string x = Convert.ToString(N,2);
            string[] arr = x.Split("1");
            int maxGap = 0;
            for(var p = 0 ; p < arr.Length-1; p++){
                if (arr[p] != "" && arr[p+1] ==""){
                    int len = arr[p].Length;
                    maxGap = maxGap > len
                        ? maxGap 
                        : len
                        ;
                }
            }
            Console.WriteLine($"{x} -- {maxGap.ToString()}");
            return maxGap;
        }
    }
}