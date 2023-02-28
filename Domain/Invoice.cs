namespace BroBizz.Models
{
    public class Invoice
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public DateTime SupplyDate { get; set; }
        public DateTime InvoiceDate { get; set; }
        public decimal Price { get; set; }

        public Invoice(string customerName, string customerAddress, DateTime supplyDate, DateTime invoiceDate, decimal price)
        {

            CompanyName = "BroBizz";
            CompanyAddress = "Vester Søgade 10, 1601 Copenhagen V";
            CustomerName = customerName;
            CustomerAddress = customerAddress;
            SupplyDate = supplyDate;
            InvoiceDate = invoiceDate;
            Price = price;
        }
    }
}