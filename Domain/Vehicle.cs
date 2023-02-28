using Microsoft.EntityFrameworkCore;
namespace BroBizz.Models
{
    [PrimaryKey(nameof(LicensePlate))]
    public class Vehicle
    {

        public string LicensePlate { get; set; }

        public string Type { get; set; }


        public Vehicle(string type, string licensePlate)
        {
            Type = type;
            LicensePlate = licensePlate;
        }
    }
}
