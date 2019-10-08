/*
[SPEC]
    给定一个非空数组 A，包含有 N 个整数，起始下标为 0。
    数组包含有奇数个元素，其中除了唯一一个元素之外，
        其他每个元素都可以与数组中另一个有相同值的元素配对。
[Ref]
    https://codesays.com/2014/solution-to-perm-missing-elem-by-codility/#comment-199
    摘錄：因為x + a – a = x。在這裡，我使用了XOR操作，
    其中x XOR a XOR a = x。
    XOR優於加法和減法的一大優勢是，XOR不會導致溢出.
    
    但 XOR 解法有個問題點,如果 數字 的重覆數為奇數 
        Ex:[1,7,7,7,9,9,9]
    即便數組總長度為奇數,得到的值一樣是錯誤

    所謂古早味版本,是對自己Old Scholl 式解題技法的自嘲,
        但在 local UT 時,確實可以有效解決 前述的 issue 
        執行效能實測  Parallel(2x) < linq (4x) < foreach (12x)
    只是上 Codility 實測時發現, 平行運算版會出現 以下的錯誤而無法運行
        [MONITOR] syscall clock_nanosleep was blocked!
    而 linq 版的則怎麼改,都一定會出現 3 個測試不通過..... ,
        但我懷疑可能是 前述 XOR issuse 惹的禍,
        雖然沒辦法拿到測試樣本的情形下,
        只能是猜測而無法證實.....
    本來,我也是一度懷疑,如果前述推論為真,那是不是題目有註明,
        例如：成對的數組,其總數一定為偶數,
        反覆檢查確認過,並沒有疑似的條件.
        但是 ,用 可以跑 100 %的 solution_A ,
        在 local 執行前述簡單的測例 , 其結果就是錯的 ,
        由此,我合理的推論,網站上的測試,其實是會故意跑出 XOR issue 的案例,
        以此來驗証程式是不是用 XOR 來做解題方法.
 */

using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CSharp_2019;

namespace CSharp.Codility
{
    public class L021
    {
        static System.Random rnd = new System.Random();
        static object _lock = new object();
        static int x = 0 ;
        
        /// <summary>
        /// 古早味解法,利用平行運算
        /// </summary>
        /// <param name="A"></param>
        /// <param name="isDebug"></param>
        /// <returns></returns>
        public static dynamic solution_0_Parallel(int[] A,bool isDebug = false){
            
            var DC = new ConcurrentDictionary<int, int>();
            Parallel.ForEach(A,(int el)=>{
                DC.GetOrAdd(el, 0);
                // [Ref]https://chrisstclair.co.uk/multithreading-made-easy-parallel-foreach/
                // 新式 用法,經測試效率最高
                Interlocked.Increment(ref x);
                DC[el]++;

                // 舊式 用法,經測試較為耗時,
                // lock(_lock){
                //     DC[el]++;
                // }
            });
            var _DC = DC.OrderBy(e=>e.Value)
                .ToList();
            var Ans = _DC[0].Key;
            
            if (isDebug){
                return new {DC=_DC,Ans};
            }
            return Ans;
        }

        /// <summary>
        /// 古早味解法
        /// </summary>
        /// <param name="A"></param>
        /// <param name="isDebug"></param>
        /// <returns></returns>
        public static dynamic solution_0(int[] A,bool isDebug = false){
            
            var DC = new SortedDictionary<int, int>();
            foreach(int el in A){
                if (DC.ContainsKey(el)==false) DC.Add(el,0);
                DC[el]++;
            };
            var _DC = DC.OrderBy(e=>e.Value)
                .ToList();
            var Ans = _DC[0].Key;
            
            if (isDebug){
                return new {DC=_DC,Ans};
            }
            return Ans;
        }

        

        /// <summary>
        /// 古早味解法,使用 linq 解法
        /// </summary>
        /// <param name="A"></param>
        /// <param name="isDebug"></param>
        /// <returns></returns>
        public static dynamic solution_0_linq(int[] A,bool isDebug = false){
            int len = A.Length;
            var DC = A.GroupBy(e=>e)
                    .OrderBy(e=>e.Count())
                    .Select(e=>new {Key = e.Key,Count = e.Count()})
                    .ToList();
            var Ans = DC[0].Key;
            if (isDebug){
                return new {DC,Ans};
            }
            return Ans;
        }

        /// <summary>
        /// 100 分的解法
        /// 參考自 [https://codesays.com/2014/solution-to-perm-missing-elem-by-codility/#comment-199]
        /// </summary>
        /// <param name="A"></param>
        /// <returns></returns>
        public static dynamic solution_A(int[] A,bool isDebug = false){
            int Ans = A[0];
            //List<dynamic> DC = new System.Collections.Generic.List<dynamic>();
            for (int i = 1; i < A.Length; i++)
            {
                var x = new {
                    Ans,
                    Next = A[i],
                    New = Ans ^ A[i]
                };
                //DC.Add(x);
                Ans = x.New;
            }
            if (isDebug){
                return new {Ans
                //DC
                };
            }
            return Ans;
        }

 

        /// <summary>
        /// 使用 linq 的解決方案,速度最快的解法
        /// 參考自 [https://codesays.com/2014/solution-to-perm-missing-elem-by-codility/#comment-199]
        /// </summary>
        /// <param name="A"></param>
        /// <param name="isDebug"></param>
        /// <returns></returns>
        public static dynamic solution_A_linq(int[] A,bool isDebug = false){
            int Ans = A.Aggregate((x, y) => x ^ y);;
            if (isDebug){
                return new {Ans
                };
            }
            return Ans;
        }

        
        /// <summary>
        /// 測試資料生成程序
        /// </summary>
        /// <param name="oddNum"></param>
        /// <returns></returns>
        /// SPEC>
        /// 1.產生 一奇數長度的陣列
        /// 2.陣列內數值只能有 一個唯值 ,其餘數必須有一個以上 
        /// 3.亂數排序
        public static dynamic GenTest(int oddNum,bool isSuffle=true,int MaxVal=100){
            List<int> dataBase = new List<int>();
            int one =  rnd.Next(1,MaxVal);
            dataBase.Add(one);
            int _rndTimes =  oddNum/2;
            for (int i = 0; i < _rndTimes; i++)
            {
                int n =  rnd.Next(1,MaxVal);
                if (n == one){
                    n = n == 1
                        ? n+1
                        : n-1;
                }
                dataBase.Add(n);
                dataBase.Add(n);
            }
            var r = new {
                one,
                list = isSuffle ?B01.KnuthShuffle(dataBase.ToArray()):dataBase.ToArray()
            };
            return r;
        }
    }
}
