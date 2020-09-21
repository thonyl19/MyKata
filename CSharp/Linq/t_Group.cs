using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Linq
{
    [TestClass]
    public class t_Group
    {  
		List<Product> sample1(){
			List<Product> pList = new List<Product>();
			pList.Add(new Product() { Code = "A", Name = "A1", QTY = 3 });
			pList.Add(new Product() { Code = "A", Name = "A2", QTY = 3 });
			pList.Add(new Product() { Code = "A", Name = "A1", QTY = 4 });
			pList.Add(new Product() { Code = "A", Name = "A3", QTY = 1 });
			pList.Add(new Product() { Code = "A", Name = "A2", QTY = 8 });
			return pList;
		}
		/*
		https://dotblogs.com.tw/chhuang/2008/05/01/3772
		SELECT   Code, Name, sum(QTY)
		FORM     Product
		GROUP BY Code, Name
		*/
        [TestMethod]
        public void t_L01()
        {
			var linqStament = (from p in sample1() 
                          group p by new { p.Code, p.Name } into g
                          select new 
						  	{ Code = g.Key.Code
							  , Name = g.Key.Name
							  , QTY = g.Sum(p => p.QTY) })
							  .ToList();
						  
			//linqStament;			
        }

		 
		[TestMethod]
        /// <summary>
        /// 以群組化的語法組合成 json 格式的資料
        /// </summary>
		public void t_L02()
        {
			var x = sample1() ;
			var linqStament = (from p in x
						group p by new { p.Name ,p.Code} into g
						select new 
						  	{ Name = g.Key.Name
							  , GRP = (from p1 in x
							  			where p1.Name == g.Key.Name
										select new {p1.Code,p1.QTY})
										.ToList()})
						.ToList();
			MyKata.Lib.FileApp.Write_SerializeJson
				(linqStament,
				MyKata.Lib.FileApp.ts_Log("test.json")
				);			  
			
        }
		
    }

	public class Product
    {
        public string Code{ get; set; }
        public string Name{ get; set; }
        public int QTY{ get; set; }
    }
}
