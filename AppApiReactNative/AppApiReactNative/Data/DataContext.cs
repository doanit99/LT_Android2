using AppApiReactNative.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace AppApiReactNative.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> Order_details { get; set; }
    }
}
