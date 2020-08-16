using System.Linq;

namespace CSharp.Linq
{
     
    public class L01
    {
        public static void Fn1(){
            Person Peter = new Person() { Name = "Peter" };
            Person Sunny = new Person() { Name = "Sunny" };
            Person Tim = new Person() { Name = "Tim" };
            Person May = new Person() { Name = "May" };

            Person[] persons = new Person[] { Peter, Sunny, Tim, May };

            Phone[] phones = new Phone[] { 
                new Phone() { PhoneNumber = "01-5555555", Person = Peter },
                new Phone() { PhoneNumber = "02-5555555", Person = Sunny },
                new Phone() { PhoneNumber = "03-5555555", Person = Tim },
                new Phone() { PhoneNumber = "05-5555555", Person = Peter },
            };

            var linq_1 = persons.Join(
                phones, 
                person => person,
                phone => phone.Person,
                (person,phone) => 
                    new { name = person.Name , phoneNumber = phone.PhoneNumber }
            );

            var linq_2 = from A0 in persons 
                join A1 in phones on A0.Name equals A1.Person.Name
                select new {Name = A0.Name,phoneNumber = A1.PhoneNumber}
                ;


            foreach (var result in linq_1)
            {
                System.Console.WriteLine($"{result.name}: {result.phoneNumber}");
            }
        }

        /// <summary>
        /// 參考自 http://robertsong.pixnet.net/blog/post/208632268-%5B%E7%A8%8B%E5%BC%8F%5D%5Bc%23%5D%5Blinq%5D-full-outer-join-%E7%9A%84%E7%AF%84%E4%BE%8B%E7%A8%8B%E5%BC%8F%E7%A2%BC-%28.net-
        /// </summary>
        public static void Fn2(){
            var firstNames = new[]
            {
                new { ID = 1, Name = "John" },
                new { ID = 2, Name = "Sue" },
                new { ID = 5, Name = "Andy" },
            };
            var lastNames = new[]
            {
                new { ID = 1, Name = "Doe" },
                new { ID = 3, Name = "Smith" },
            };
             
            var A = from A0 in firstNames
                    join A1 in lastNames
                    on A0.ID equals A1.ID
                    into temp
                    from A2 in temp.DefaultIfEmpty( new { A0.ID, Name = default( string ) } )
                    select new
                    {
                        A0.ID,
                        FirstName = A0.Name,
                        LastName = A2.Name,
                    };
        }
        
    }

    public class Employese
    {
        public string DepID { get; set; }
        public string UserID { get; set; }
        public string Name { get; set; }
        public string SubDepID { get; set; }
        public string SubUserID { get; set; }
    }

    public class L02
    {
        Employese[] emps = new Employese[5];
        public void fn(){
            var r = from A0 in emps
                join A1 in emps
                on new {DepID = A0.SubDepID,UserID = A0.SubUserID} 
                    equals new {A1.DepID,A1.UserID}
                into tmp 
                from A3 in tmp.DefaultIfEmpty()
                select new {
                    A0.DepID,A0.UserID,A0.Name,
                    SubName = A3.Name ?? ""
                };

        }
    }



}