/*
[Ref]
    https://cyc2018.github.io/CS-Notes/#/notes/%E5%89%91%E6%8C%87%20Offer%20%E9%A2%98%E8%A7%A3%20-%203~9

[Demand]
    在一個長度為 n 的數組裏的所有數字都在 0 到 n-1 的範圍內。
    數組中某些數字是重覆的，但不知道有幾個數字是重覆的，也不知道每個數字重覆幾次。
    找出數組中"任意"一個重覆的數字。
[SA]
    1.因為,剛好是 0 ~ n-1 ,所以可以利用陣列 idx 當比對指標
    2.判斷 arr[0] == arr[arr[0]] 
        T)判斷是否為 idx = 0 , arr[idx] == 0 的情形
            F) 則判定為重覆數字
            T）則判定不相符
        F):兩者做置換 
    3.如果 置換過來的值 己 等同 idx ,則 idx 做加1 ,往下一個比對
 */

using System;

namespace CSharp_2019
{

    public class A03
    {
        internal static int fn(int[] arr)
        {
            int idx = 0;
            for (int i = 0; i < arr.Length; i++)
            {
                int cur = arr[idx]; 
                int switchTarge = arr[cur];
                if  (cur == switchTarge && cur != idx ) return cur;
                arr[cur] = cur;
                arr[idx]= switchTarge;
                if (idx == switchTarge) idx++;
            }
            return -1;
        }
    }
}