using Microsoft.EntityFrameworkCore;

namespace BroBizz.Models
{
    [Owned]
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
    }
}