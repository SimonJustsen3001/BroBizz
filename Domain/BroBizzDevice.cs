namespace BroBizz.Models
{
    public class BroBizzDevice
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public AppUser AppUser { get; set; }
        public ICollection<Trip> Trips { get; set; } = new List<Trip>();

        public BroBizzDevice(Guid id, string name)
        {
            Id = id;
            Name = name;
        }

        public void AddTrip(Trip trip)
        {
            Trips.Add(trip);
        }

        public string calcTotalPrice()
        {
            decimal sum = 0;
            foreach (var trip in Trips)
            {
                sum += trip.Invoice.Price;
            }
            return sum.ToString();
        }
    }
}
