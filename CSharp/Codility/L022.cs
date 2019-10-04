/*
[SPEC]
    給出了由N個整數組成的數組A。旋轉數組意味著將每個元素右移一個索引，
        並將數組的最後一個元素移到第一位。
    例如，數組A = [3、8、9、7、6]的旋轉為[6、3、8、9、7]（元素右移一個索引，而6移到第一位）。
        目標是旋轉陣列AK次；也就是說，A的每個元素將向右移K次。
[SA]
    1.當一個循環後(陣列內的元素都搬過一次),陣列就回復初始順序.
    2.在前一點的基礎上,長度為 5 的陣列,在以下搬動次數( 6 , 11 , 16) 下,
        其結果與搬動 1 次的結果都是一樣的. 
    3.所以 搬動計算可以 化簡為 
        搬動的次數/陣列長度 => 實際要搬動的次數
    4.公式可以定義為
        [實際要搬動的元素]+[未搬動元素]

*/
using System.Collections.Generic;
using System.Linq;

namespace CSharp.Codility
{
    public class L022
    {

        public static int[] solution_0(int[] A,int K){
            List<int> _new = new List<int>();
            int len = A.Length;
            if (K == 0 || len == 0 ) return A;
            int realMove = K % len;
            int point = len - realMove;
            for(int i = 0 ; i < len ;i++){
                if (point-len == 0){
                    point = 0;
                }
                _new.Add(A[point]);
                point++;
            }
            return _new.ToArray();
        }

        /// <summary>
        /// Linq 版解法
        /// </summary>
        /// <param name="A"></param>
        /// <param name="K"></param>
        /// <returns></returns>
        public static int[] solution_0_Linq(int[] A,int K){
            List<int> _new = new List<int>();
            int len = A.Length;
            if (K == 0 || len == 0 ) return A;
            int realMove = K % len;
            int point = len - realMove;
            var idx_list = A.Select((el,idx)=>new {el,idx});
            _new.AddRange(idx_list.Where(el=>el.idx >= point).Select(e=>e.el).ToList());
            _new.AddRange(idx_list.Where(el=>el.idx < point).Select(e=>e.el).ToList());
             return _new.ToArray();
        }


        public static int[] genArray(int[] A,int len ){
            List<int> _new = new List<int>();
            _new.AddRange(A);
            for(int i = len -1 ; i > -1 ;i--){
                _new.Add(A[i]);
            }
            return _new.ToArray();
        }

        
    }
}