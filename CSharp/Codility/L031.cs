/**
[Ref]
    https://app.codility.com/programmers/lessons/3-time_complexity/frog_jmp/
[Ans]
    https://app.codility.com/demo/results/trainingJ2FXCF-BHH/
 */

using System;

namespace CSharp.Codility
{
    public class L031
    {
        public static int solution_0(int X_startLen, int Y_targetLen, int D_jumpLen) {
            if (X_startLen > Y_targetLen) return 0;
            int realLen = Y_targetLen-X_startLen;
            int oneMore 
                = (realLen % D_jumpLen) == 0 
                ? 0
                : 1;
            int lessjump = (realLen / D_jumpLen) + oneMore;
            return lessjump ;
        }
    }
}