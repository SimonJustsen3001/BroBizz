using System.ComponentModel.DataAnnotations.Schema;

namespace BroBizz.Models
{
    public class Trip
    {
        public Guid Id { get; set; }
        [ForeignKey("BridgeName")]
        public string BridgeName { get; set; }
        public Bridge Bridge { get; set; }
        [ForeignKey("VehicleLicensePlate")]
        public string VehicleLicensePlate { get; set; }
        public Vehicle Vehicle { get; set; }
        public Invoice Invoice { get; set; }
    }
}
