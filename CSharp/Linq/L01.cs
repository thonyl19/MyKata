using System.Linq;

namespace CSharp.Linq
{
    public class Person
    {
        public string Name { get; set; }
    }

    public class Phone
    {
        public string PhoneNumber { get; set; }
        public Person Person { get; set; }
    }
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
             
            var A = from first in firstNames
                    join last in lastNames
                    on first.ID equals last.ID
                    into temp
                    from x in temp.DefaultIfEmpty( new { first.ID, Name = default( string ) } )
                    select new
                    {
                        first.ID,
                        FirstName = first.Name,
                        LastName = x.Name,
                    };
        }
        
    }



}