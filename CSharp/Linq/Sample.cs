using System.Linq;

namespace CSharp.Linq
{
	public class Person
    {
        public string Name { get; set; }

        public string Addres { get; set; }

		public string name(){
			return Name.ToLower();
		}
		public int Age{get;set;}
    }

    public class Phone
    {
        public string PhoneNumber { get; set; }
        public Person Person { get; set; }

		 
    }

	public class Case1 {
        public Person[] persons { get; set; }
 		public Phone[] phones { get; set; }
	}

	public class Sample{
		public static Case1 Case1(){
			Person Peter = new Person() { Name = "Peter" ,Age=10 ,Addres="A"};
            Person Sunny = new Person() { Name = "Sunny",Age=10 ,Addres="B"};
            Person Tim = new Person() { Name = "Tim" ,Age=11,Addres="C"};
            Person May = new Person() { Name = "May" ,Age=11,Addres="C"};

			var _r =  new Case1(){
				persons = new Person[] { Peter, Sunny, Tim, May },
				phones = new Phone[] { 
					new Phone() { PhoneNumber = "01-5555555", Person = Peter },
					new Phone() { PhoneNumber = "02-5555555", Person = Sunny },
					new Phone() { PhoneNumber = "03-5555555", Person = Tim },
					new Phone() { PhoneNumber = "05-5555555", Person = Peter },
				}
			};
			return _r;
			
		}

		
		 
	}
}