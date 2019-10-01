using System;
using System.Collections.Generic;
using System.Linq;

namespace CSharp_2019
{
    public class B01
    {
        static System.Random  random = new System.Random();
        public static T[] KnuthShuffle<T>(T[] array)
        {
            for (int i = 0; i < array.Length; i++)
            {
                int j = random.Next(i, array.Length); 
                // Don't select from the entire array on subsequent loops
                T temp 
                    = array[i]; array[i] 
                    = array[j]; array[j] 
                    = temp;
            }
            return array;
        }

        public static Dictionary<string, int>  Test(int count = 6){
            Dictionary<string, int> DC = 
                new Dictionary<string, int>()
            {
                 {"123",0},
                 {"132",0},
                 {"213",0},
                 {"231",0},
                 {"312",0},
                 {"321",0},
            };

            for (int i = 0 ; i < count ; i++){
                var arr = KnuthShuffle(new int[]{1,2,3})
                    .Select(el=>el.ToString())
                    .ToArray();
                DC[String.Join("",arr)]++;
            }
            return DC;
        }
    }
}