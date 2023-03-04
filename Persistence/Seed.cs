using BroBizz.Models;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!context.Bridges.Any())
            {
                var bridges = new List<Bridge> {
                    new Bridge("øresundsbroen"),
                    new Bridge("storebæltsbroen")
                };
                await context.Bridges.AddRangeAsync(bridges);
            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>{
                    new AppUser{DisplayName = "Tom", UserName = "Tom", Email = "Tom@hotmail.com"},
                    new AppUser{DisplayName = "Bob", UserName = "Bob", Email = "Bob@hotmail.com"},
                    new AppUser{DisplayName = "Casper", UserName = "Casper", Email = "Casper@hotmail.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }
        }
    }
}