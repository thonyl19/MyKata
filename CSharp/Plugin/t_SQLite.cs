using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using FluentValidation;
using FluentValidation.TestHelper;
using Microsoft.VisualStudio.TestTools.UnitTesting;


using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CSharp.Plugin {
    [TestClass]
    public class t_SQLite {
		[TestMethod]
		public void T_db連線設置(){
			using (var context = new MvcMovieContext())
			{
				//確保資料庫己建立
				context.Database.EnsureCreated();
				if (context.Movie.Any())
                {
                    return;   // DB has been seeded
                }
				var x = context.Movie.Count();
			}
		}
	}

	public class MvcMovieContext : DbContext
    {
        // public MvcMovieContext (DbContextOptions<MvcMovieContext> options)
        //     : base(options)
        // {
        // }

        public DbSet<Movie> Movie { get; set; }
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			//這段 語法不可以用,會產生 SQLite Error 1: 'no such table 的錯誤
			//optionsBuilder.UseSqlite("Data Source=MvcMovie.db");
			optionsBuilder.UseSqlite("Filename=MvcMovie.db");
			//Database.EnsureCreated();
		}
    }

	public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }
        public decimal Price { get; set; }
    }
}