namespace CSharp.Models
{
    public class Student
    {
        public int ID {get;set;}
        public string Name {get;set;}
    }

    public class Class
    {
        public int ID {get;set;}
        public string Name {get;set;}
    }

    public class Score{
        public int StudentID {get;set;}
        public int ClassID {get;set;}
        public int Scores {get;set;}
    }
}