using BroBizz.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Bridge> Bridges { get; set; }
        public DbSet<BroBizzDevice> BroBizzDevices { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
    }
}