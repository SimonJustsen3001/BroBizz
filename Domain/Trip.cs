namespace BroBizz.Models
{
    public class Trip
    {
        public Guid Id { get; set; }
        public Bridge Bridge { get; set; }
        public Vehicle Vehicle { get; set; }
        public Invoice Invoice { get; set; }

        private Trip()
        {

        }
        public Trip(Bridge bridge, Vehicle vehicle, Invoice invoice)
        {
            Bridge = bridge;
            Vehicle = vehicle;
            Invoice = invoice;
        }
    }
}
