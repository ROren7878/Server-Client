using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DataContext : DbContext
    {
        public DbSet<Category> categories {  get; set; }
        public DbSet<Company> companies { get; set; }

        public DbSet<Order> orders { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<SubCategory> subcategories { get; set; }   
        public DbSet<User> users { get; set; }

        public DataContext(DbContextOptions<DataContext> option) : base(option)
        { }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;database=mydb");
        //}
    }
}
