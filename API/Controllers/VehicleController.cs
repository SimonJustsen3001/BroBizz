using BroBizz.Models;
using Microsoft.AspNetCore.Mvc;

namespace BroBizz.Controllers
{
    public class VehicleController : ApiBaseController
    {
        // This should later be fetched from the database
        private static IEnumerable<Vehicle> Vehicles = new[]
        {
            new Vehicle("Motorcycle", "AB12345"),
            new Vehicle("Car", "CD67890"),
        };

        [HttpGet]
        public Vehicle[] Get()
        {
            Vehicle[] vehicles = Vehicles.ToArray();
            return vehicles;
        }

        public List<string> VehicleName()
        {
            List<string> type = new List<string>();
            foreach (var vehicle in Vehicles)
            {
                type.Add(vehicle.Type);
            }
            return type;
        }

    }
}
