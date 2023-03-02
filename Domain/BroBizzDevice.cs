namespace BroBizz.Models
{
    public class BroBizzDevice
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Trip> Trips { get; set; }
        public ICollection<Invoice> Invoices { get; set; }

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
