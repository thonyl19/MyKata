using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CSharp.Case
{
    /// <summary>
    /// [Ref]
    /// https://docs.microsoft.com/zh-tw/dotnet/standard/using-linq
    /// </summary>
    [TestClass]
    public class t_docs_microsoft
    {  
        int[] scores = new int[] { 97, 92, 81, 60 };

        [TestMethod]
        public void t_L01()
        {
            // Specify the data source.

            // Define the query expression.
            /*
                以下語法等價
                var scoreQuery =
            */
            IEnumerable<int> scoreQuery = 
                from t1 in scores
                where t1 > 80
                select t1;
            
 
            /* 不正確的用法
            IQueryable<int> scoreQuery1 =
                from t1 in scores
                where t1 > 80
                select t1;
            */  

            // 程序到這個階段 才會真正執行
            var arr = _ex1().ToArray();
        }


        public void t_L02(){

            // var t = from x1 in scores
            //     join x2 in scores on k1 equals k2
            //     select v;

        }
        
        /// <summary>
        /// https://docs.microsoft.com/zh-tw/dotnet/standard/using-linq
        /// </summary>
        public void t_ToDictionary(){
            //傳統寫法
            var sapm = Sample.Case1();
            var _Lookup = new Dictionary<string, Person>();
            foreach (var x in sapm.phones)
            {
                _Lookup.Add(x.PhoneNumber, x.Person);
            }

            var _linq寫法 = sapm.phones
                .ToDictionary(k => k.PhoneNumber,v=>v.Person);
        }

        /// <summary>
        /// https://docs.microsoft.com/zh-tw/dotnet/standard/using-linq#why-use-the-query-syntax
        /// </summary>
        public void t_語法類別(){
            /*
            就官網上的說法 , 這兩種分為 
                API Syntax =>後稱為 _styAPI
                Query Syntax =>後稱為 _styQry

            */
            var sapm = Sample.Case1();

            var _styAPI = sapm.persons.Where(item => item.Name == "");

            var _styQry = from item in sapm.persons
                    where  item.Name == ""
                    select item;
        }


        IEnumerable<int> _ex1(){
            return  from t1 in scores
                    where t1 > 80
                    select t1;
        }

        /// <summary>
        /// 試驗,把 persons 存成一個 IQueryable<Person> 
        /// ,丟給 _x2() 做二次處理 
        /// </summary>
        /// <returns></returns>
        IQueryable<Person> _x1(){
            var x = Sample.Case1();
            IQueryable<Person> q =  
                (from a0 in  x.persons
                where a0.Name !=""
                select a0).AsQueryable();
            return q;
        }       

        IEnumerable<Person> _x2(IQueryable<Person> _x1){
            var _r =  
                (from a0 in _x1
                where a0.Name !=""
                select a0).ToList();
            return _r;
        } 
        // IEnumerable<dynamic> _x21(){
        //     var _r =  
        //         (from a0 in _x1
        //         where a0.Name !=""
        //         select new{ name = a0.name()}).ToList();
        //     return _r;
        // } 

         [TestMethod]
        public void t02(){
            var sample1 = Sample.Case1();
            var persons = sample1.persons;
            var _list = persons.SelectMany(p=>p.Name);
            
        }

        [TestMethod]
        public void t03(){
            // List<int> list = new List<int> { 3, 5, 1 };
            // IQueryable<int> source = list.AsQueryable();
            // IQueryable<int> query = FakeQueryable.Where(source, x => x > 2);
            // var x = Sample.Case1();
            // List<string> _list = new List<string>{"01-5555555","03-5555555"};
            // IQueryable<string> source = _list.AsQueryable();
            // IQueryable<Person> query 
            //         = x.persons
            //             .AsQueryable()
            //             .Where(source, z => z !="");
            // foreach (int value in query)
            // {
            //     Console.WriteLine(value);
            // }
            
        }
        
        List<T> CreateEmptyGenericList<T>(T example) {
            return new List<T>();
        }

        /// <summary>
        /// https://stackoverflow.com/questions/612689/a-generic-list-of-anonymous-class
        /// </summary>
        [TestMethod]
        public void t04(){
            var o = new 
            {   Id=""
                , Int = 1
            };
            var _list = CreateEmptyGenericList(o);
            
            /// 但這樣的寫法更為簡練
            var _list1 = new int[0]
                .Select(x => new { Id = 0, Name = "" })
                .ToList();
            
        }
        
         
    }
}
