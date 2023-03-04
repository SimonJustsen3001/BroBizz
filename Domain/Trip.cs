using System.ComponentModel.DataAnnotations.Schema;

namespace BroBizz.Models
{
    public class Trip
    {
        public Guid Id { get; set; }
        [ForeignKey("BridgeName")]
        public Bridge Bridge { get; set; }
        public Vehicle Vehicle { get; set; }
        public Invoice Invoice { get; set; }


    }
}
