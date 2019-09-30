

using System;

public class A01
 {
    public static void Test(){
        var x = fn(4);
        Console.WriteLine(x);
    }

    static int fn(int val){
        if (val == 0) return 0 ;
        return (val%2 == 0? val*-1 : val) + fn(val-1);

    }
     
 }