using System;

namespace CSharp_Codility
{
    public class L01
    {
        public static int Test(int val){
            return BinaryGap(val);
        }

        static int BinaryGap(int N){
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