/*
https://www.rosettacode.org/wiki/Knuth_shuffle#C.23
 */
using System.Collections.Generic;

namespace CSharp_2019
{
    /// <summary>
    /// 亂數洗牌
    /// </summary>
    public class A02
    {
        public static string[] GenArray(){
            List<string> arr = new List<string>();
            foreach(char el in "ABCD".ToCharArray()){
                for(int i = 1 ;i<14 ;i++){
                    arr.Add($"{el+i.ToString()}");
                }
            }
            return arr.ToArray();
        }
        public static T[] Shuffle<T>(T[] list){
            return B01.KnuthShuffle(list);
        }

        
    }
}