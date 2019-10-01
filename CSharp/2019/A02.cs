/*
https://www.rosettacode.org/wiki/Knuth_shuffle#C.23
 */
namespace CSharp_2019
{
    public class A02
    {
        public static void KnuthShuffle<T>(T[] array)
        {
            System.Random random = new System.Random();
            for (int i = 0; i < array.Length; i++)
            {
                int j = random.Next(i, array.Length); 
                // Don't select from the entire array on subsequent loops
                T temp 
                    = array[i]; array[i] 
                    = array[j]; array[j] 
                    = temp;
            }
        }
    }
}