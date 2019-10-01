/*
Ref
    https://carsonwah.github.io/factory-design-pattern.html
SPEC>
    1.將物件功能 規劃出通用,一致的 abstract class
    2.各別的物件都是 extends 自  abstract class ,再實作各自的處理程序
    3.所有的物件都是透過 Factory 產生
EX>飲料店 訂購系統
    1.規劃 abstract class
        1-1.將飲料功能做抽像規劃,例如:售價,杯數,總價計算 
    2.實作 各別飲料
        2-1.綠茶,咖啡...
    3.實作 Factory
        3-1.實作新訂單功能
        3-2.實作訂單功能
        3-3.實作訂單金額計算 
 */
using System.Collections.Generic;

namespace CSharp.DesingPattern
{
    public class SimpleFactory
    {
        List<Drinks> Orders;
        public SimpleFactory()
        {
        }

        public SimpleFactory NewOrder(){
            Orders = new List<Drinks>();
            return this;
        }

        public SimpleFactory Order(eDrinks eDrinks,int cups=1) {
            Drinks _prd = null;
            switch(eDrinks) {
                case eDrinks.GreenTea:
                    _prd = new GreenTea(cups);
                    break;
                case eDrinks.Coffee:
                    _prd = new Coffee(cups);
                    break;
            }
            this.Orders.Add(_prd);
            return this;
        }

        public int Checkout(){
            int TotalPrice = 0;
            foreach(Drinks _prd in Orders){
                TotalPrice+=_prd.TotalPrice;
            }
            return TotalPrice;
        }

    }

     
    public enum eDrinks{
        GreenTea,Coffee
    }
    public abstract class Drinks {
        public int Price;
        public int Cpus = 1 ;
        public int TotalPrice {
            get {return this.Price * this.Cpus;}
        }
    }

    public class GreenTea : Drinks
    {
        public GreenTea(int cpus=1)
        {
            this.Price = 15;
            this.Cpus = cpus;
        }
    }

    public class Coffee : Drinks
    {
        public Coffee(int cpus=1)
        {
            this.Price = 20;
            this.Cpus = cpus;
        }
    }
}