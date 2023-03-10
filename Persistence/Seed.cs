using BroBizz.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!context.Bridges.Any())
            {
                var bridges = new List<Bridge> {
                    new Bridge("Øresundsbroen"),
                    new Bridge("Storebæltsbroen")
                };
                await context.Bridges.AddRangeAsync(bridges);

            }

            if (!context.Vehicles.Any())
            {
                var vehicles = new List<Vehicle> {
                    new Vehicle("Bil", "AA11111"),
                    new Vehicle("Bil", "AA22222"),
                    new Vehicle("Bil", "AA33333"),
                    new Vehicle("Bil", "AA44444"),
                    new Vehicle("Motorcykel", "BB99999"),
                    new Vehicle("Motorcykel", "BB88888")
                };
                await context.Vehicles.AddRangeAsync(vehicles);

            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>{
                    new AppUser{DisplayName = "Tom", UserName = "Tom", Email = "Tom@hotmail.com"},
                    new AppUser{DisplayName = "Silvan", UserName = "Silvan", Email = "Silvan@hotmail.com"},
                    new AppUser{DisplayName = "Stark", UserName = "Stark", Email = "Stark@hotmail.com"}
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.BroBizzDevices.Any())
            {
                var tomBrobizz = new BroBizzDevice(new Guid("dce4df5e-675e-44a8-8102-c7a77b980681"), "Personlig");

                var silvanBrobizzs = new List<BroBizzDevice> {
                    new BroBizzDevice(new Guid("667d5e86-b31c-471c-bb10-fc42b4a653b5"), "Medarbejder Dennis"),
                    new BroBizzDevice(new Guid("a8884c2e-42c6-4e69-8115-d6587537e889"), "Medarbejder Christian"),
                };

                var starkBrobizzs = new List<BroBizzDevice> {
                    new BroBizzDevice(new Guid("197cb5d2-1573-40fa-897f-7b93f181c28a"), "Medarbejder John"),
                    new BroBizzDevice(new Guid("f3360c1d-0c6f-48fb-9ccc-94fb7fdcc9ce"), "Medarbejder Katrine"),
                    new BroBizzDevice(new Guid("36f85819-05e5-4e43-8aaf-5fe7d98a7f0b"), "Medarbejder Cecilie"),
                    new BroBizzDevice(new Guid("d2104d11-b7d3-4f89-8992-5a5602512f36"), "Medarbejder William")
                };

                var stark = await context.Users.FirstOrDefaultAsync(x => x.UserName == "Stark");
                var silvan = await context.Users.FirstOrDefaultAsync(x => x.UserName == "Silvan");
                var tom = await context.Users.FirstOrDefaultAsync(x => x.UserName == "Tom");

                tom.BroBizzDevices.Add(tomBrobizz);
                context.BroBizzDevices.Add(tomBrobizz);

                foreach (var brobizz in silvanBrobizzs)
                {
                    silvan.BroBizzDevices.Add(brobizz);
                    context.BroBizzDevices.Add(brobizz);
                }

                foreach (var brobizz in starkBrobizzs)
                {
                    stark.BroBizzDevices.Add(brobizz);
                    context.BroBizzDevices.Add(brobizz);
                }

            }

            if (!context.Trips.Any())
            {
                var stark = await context.Users.FirstOrDefaultAsync(x => x.UserName == "Stark");
                var silvan = await context.Users.FirstOrDefaultAsync(x => x.UserName == "Silvan");
                var tomUser = await context.Users.FirstOrDefaultAsync(x => x.UserName == "Tom");

                var dennisTrips = new List<Trip> {
                    new Trip
                    {
                        Id = new Guid("44628f19-685d-4eb3-b5ed-843b68ca1ab8"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Storebæltsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA22222"),
                        Invoice = new Invoice("Silvan", "Edwin Rahrs Vej 88, 8220 Brabrand",
                    DateTime.UtcNow.AddMonths(-2),
                    DateTime.UtcNow.AddMonths(-3),
                    200)
                    },
                    new Trip
                    {
                        Id = new Guid("966a5947-91d8-4d45-bf86-3b1021b0f700"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Storebæltsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA22222"),
                        Invoice = new Invoice("Silvan", "Edwin Rahrs Vej 88, 8220 Brabrand",
                    DateTime.UtcNow.AddMonths(-1),
                    DateTime.UtcNow.AddMonths(-2),
                    200)
                    }
                };

                var christianTrip = new Trip
                {
                    Id = new Guid("efe5bd1a-c01e-4698-9cd2-546149c413f9"),
                    Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Storebæltsbroen"),
                    Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA11111"),
                    Invoice = new Invoice("Silvan", "Edwin Rahrs Vej 88, 8220 Brabrand",
                    DateTime.UtcNow,
                    DateTime.UtcNow.AddMonths(-1),
                    200)
                };

                var johnTrips = new List<Trip> {
                    new Trip
                    {
                        Id = new Guid("8007212a-53bb-465b-bc1e-382910989b9a"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Øresundsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA33333"),
                        Invoice = new Invoice("Silvan", "Skanderborgvej 277b, 8260 Viby J",
                    DateTime.UtcNow.AddMonths(-2),
                    DateTime.UtcNow.AddMonths(-3),
                    200)
                    },
                    new Trip
                    {
                        Id = new Guid("07aa3d3e-79a8-473e-8a14-8fec7da616f0"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Øresundsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA33333"),
                        Invoice = new Invoice("Silvan", "Skanderborgvej 277b, 8260 Viby J",
                    DateTime.UtcNow.AddMonths(-1),
                    DateTime.UtcNow.AddMonths(-2),
                    200)
                    }
                };

                var cecilieTrips = new List<Trip> {
                    new Trip
                    {
                        Id = new Guid("ad438c66-9ed4-4b6b-947d-e7d089aca53f"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Øresundsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA33333"),
                        Invoice = new Invoice("Silvan", "Skanderborgvej 277b, 8260 Viby J",
                    DateTime.UtcNow.AddMonths(2),
                    DateTime.UtcNow.AddMonths(3),
                    200)
                    },
                    new Trip
                    {
                        Id = new Guid("c989840a-a8e3-4dfb-9e34-fea8668bfa32"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Øresundsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA33333"),
                        Invoice = new Invoice("Silvan", "Skanderborgvej 277b, 8260 Viby J",
                    DateTime.UtcNow.AddMonths(1),
                    DateTime.UtcNow.AddMonths(2),
                    200)
                    },
                    new Trip
                    {
                        Id = new Guid("a6cce482-6b43-46fa-bdf9-da49956aa796"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Øresundsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA33333"),
                        Invoice = new Invoice("Silvan", "Skanderborgvej 277b, 8260 Viby J",
                    DateTime.UtcNow.AddMonths(4),
                    DateTime.UtcNow.AddMonths(5),
                    200)
                    },
                    new Trip
                    {
                        Id = new Guid("dcd3d647-9beb-43de-aa57-85d47e6fe8ee"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Øresundsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "AA33333"),
                        Invoice = new Invoice("Silvan", "Skanderborgvej 277b, 8260 Viby J",
                    DateTime.UtcNow.AddMonths(6),
                    DateTime.UtcNow.AddMonths(7),
                    200)
                    }
                };

                var tomTrips = new List<Trip> {
                    new Trip
                    {
                        Id = new Guid("ce53fab7-924e-4942-a3fa-32edb97f1c65"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Storebæltsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "BB88888"),
                        Invoice = new Invoice("Personlig", "Strandvej 78, 9220 Aalborg Øst",
                    DateTime.UtcNow.AddMonths(-2),
                    DateTime.UtcNow.AddMonths(-3),
                    200)
                    },
                    new Trip
                    {
                        Id = new Guid("733886c1-e46b-4aac-844c-6a8fc2f2681e"),
                        Bridge = context.Bridges.FirstOrDefault(x => x.Name == "Storebæltsbroen"),
                        Vehicle = context.Vehicles.FirstOrDefault(x => x.LicensePlate == "BB99999"),
                        Invoice = new Invoice("Personlig", "Strandvej 78, 9220 Aalborg Øst",
                    DateTime.UtcNow.AddMonths(-1),
                    DateTime.UtcNow.AddMonths(-2),
                    200)
                    }
                };



                var dennis = silvan.BroBizzDevices.FirstOrDefault(x => x.Name == "Medarbejder Dennis");
                var christian = silvan.BroBizzDevices.FirstOrDefault(x => x.Name == "Medarbejder Christian");
                var john = stark.BroBizzDevices.FirstOrDefault(x => x.Name == "Medarbejder John");
                var cecilie = stark.BroBizzDevices.FirstOrDefault(x => x.Name == "Medarbejder Cecilie");
                var tom = tomUser.BroBizzDevices.FirstOrDefault(x => x.Name == "Personlig");


                christian.AddTrip(christianTrip);
                context.Trips.Add(christianTrip);
                silvan.Invoices.Add(christianTrip.Invoice);

                foreach (var trip in dennisTrips)
                {
                    silvan.Invoices.Add(trip.Invoice);
                    dennis.AddTrip(trip);
                    context.Trips.Add(trip);
                }
                foreach (var trip in johnTrips)
                {
                    stark.Invoices.Add(trip.Invoice);
                    john.AddTrip(trip);
                    context.Trips.Add(trip);
                }
                foreach (var trip in cecilieTrips)
                {
                    stark.Invoices.Add(trip.Invoice);
                    cecilie.AddTrip(trip);
                    context.Trips.Add(trip);
                }
                foreach (var trip in tomTrips)
                {
                    tomUser.Invoices.Add(trip.Invoice);
                    tom.AddTrip(trip);
                    context.Trips.Add(trip);
                }

            }

            await context.SaveChangesAsync();

        }
    }
}

//Øresundsbroen