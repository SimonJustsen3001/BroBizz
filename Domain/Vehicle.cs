using Microsoft.EntityFrameworkCore;
namespace BroBizz.Models
{
    [Owned]
    [PrimaryKey(nameof(LicensePlate))]
    public class Vehicle
    {

        public string LicensePlate { get; set; }
        public string Type { get; set; }

    }
}
