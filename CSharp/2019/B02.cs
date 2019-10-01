namespace CSharp_2019
{
    public class B02
    {
        public static int[] BubbleSort(int[] arr){
            int idx = arr.Length;
            for (var i = 0 ; i < idx ;i++){
                for(var p = 0 ; p < idx-1 ; p++ ){
                    var tmpMax = arr[p];
                    var isBegerThenNext = tmpMax > arr[p+1];
                    if (isBegerThenNext){
                        arr[p] = arr[p+1];
                        arr[p+1] = tmpMax;
                    }
                }
            }
            return arr;
        }
        public static int[] Test(int[] arr = null){
            if (arr == null) arr = new int[]{12,13,1,6,2,9,4,1,1};
            return BubbleSort(arr);
        }
    }
}