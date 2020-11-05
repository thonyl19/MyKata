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
using System.Data.SQLite;
using System.Data;
using System.IO;

namespace CSharp.Plugin {
    [TestClass]
    public class t_SQLite {
        public static string db_path = @"data source=.\MvcMovie.db;version=3;";
        
		[TestMethod]
		public void T_db連線設置(){
			using (var context = new MvcMovieContext())
			{
				//確保資料庫己建立
				// context.Database.EnsureCreated();
				// if (context.Movie.Any())
                // {
                //     return;   // DB has been seeded
                // }
				var x = context.Movie.Count();
			}
		}

		[TestMethod]
		public void T_新增資料(){
			using (var context = new MvcMovieContext())
			{
				//確保資料庫己建立
				context.Database.EnsureCreated();
				if (context.Movie.Any())
                {
                    return;   // DB has been seeded
                }

				var _entity = new Movie
                    {
                        Title = "When Harry Met Sally",
                        ReleaseDate = DateTime.Parse("1989-2-12"),
                        Genre = "Romantic Comedy",
                        Price = 7.99M
                    };
				context.Add(_entity);
				context.SaveChanges();

				context.AddRange(new Movie
                    {
                        Title = "Ghostbusters ",
                        ReleaseDate = DateTime.Parse("1984-3-13"),
                        Genre = "Comedy",
                        Price = 8.99M
                    },
                    new Movie
                    {
                        Title = "Ghostbusters 2",
                        ReleaseDate = DateTime.Parse("1986-2-23"),
                        Genre = "Comedy",
                        Price = 9.99M
                    });
				context.SaveChanges();

				var x = context.Movie.Count();
			}
		}
	}

    /*
    https://docs.microsoft.com/zh-tw/ef/core/miscellaneous/configuring-dbcontext
    */
	public class MvcMovieContext : DbContext
    {
        // public MvcMovieContext (DbContextOptions<MvcMovieContext> options)
        //     : base(options)
        // {
        // }
       

        public DbSet<Movie> Movie { get; set; }
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
            string path = Path.GetFullPath("../../../plugin/MvcMovie.db");
            /*
            這段 語法不可以用,會產生 SQLite Error 1: 'no such table 的錯誤
                但後來又變可以用了, 一開始不知其所以然,
                後來搞懂了,它的問題是因為 db 會建立在 ~\bin\Debug\netcoreapp2.2 內,
                跟認知中, ~\Plugin 中的位置 是不一樣的 ,
                所以才會出現這個問題,跟 用那個語法無關

            */
			optionsBuilder.UseSqlite($"Data Source=MvcMovie.db");
			//optionsBuilder.UseSqlite($"Data Source=${path}");
			//optionsBuilder.UseSqlite($"Filename=${path}");
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