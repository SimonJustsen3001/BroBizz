namespace BroBizz.Models
{
    public class BroBizzDevice
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public AppUser AppUser { get; set; }
        public ICollection<Trip> Trips { get; set; } = new List<Trip>();

    }
}
