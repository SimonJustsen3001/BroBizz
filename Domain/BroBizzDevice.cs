namespace BroBizz.Models
{
    public class BroBizzDevice
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<Trip> Trips = new List<Trip>();
        public List<Invoice> Invoices = new List<Invoice>();

        public BroBizzDevice(string name)
        {
            Name = name;
        }

        public void AddTrip(Trip trip)
        {
            Trips.Add(trip);
            Invoices.Add(trip.Invoice);
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
