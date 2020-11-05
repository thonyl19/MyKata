using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using CSharp.Linq;
using FluentValidation;
using FluentValidation.TestHelper;
using Microsoft.VisualStudio.TestTools.UnitTesting;


using Z.EntityFramework.Plus;

namespace CSharp.Plugin {
    //[TestClass]
    public class t_ZEntityFramework {
		// public static void GenerateData()
		// {
			
		// 	using (var context = new EntityContext())
		// 	{
		// 		context.Customers.Add(new Customer() { Name ="Customer_A", IsActive = false  });
		// 		context.Customers.Add(new Customer() { Name ="Customer_B", IsActive = true });
		// 		context.Customers.Add(new Customer() { Name ="Customer_C", IsActive = false });

		// 		context.SaveChanges();	
		// 	}
		// }
	}

	// public class EntityContext : DbContext
	// {
	// 	public EntityContext() : base(FiddleHelper.GetConnectionStringSqlServer())
	// 	{

	// 	}
		
	// 	public DbSet<Customer> Customers { get; set; }
	// }
	
	
	// public class Customer
	// {
	// 	public int CustomerID { get; set; }
	// 	public string Name { get; set; }
	// 	public Boolean IsActive { get; set; }
	// }
}