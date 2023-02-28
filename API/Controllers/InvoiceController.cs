using BroBizz.Models;
using Microsoft.AspNetCore.Mvc;

namespace BroBizz.Controllers
{
    public class InvoiceController : ApiBaseController
    {
        private static IEnumerable<Invoice> Invoices = new[]
        {
            new Invoice("Stark", "Skanderborgvej 277b, 8260 Viby", DateTime.Now, DateTime.Now, 100),
            new Invoice("Stark", "Skanderborgvej 277b, 8260 Viby", DateTime.Now, DateTime.Now, 150),
            new Invoice("Stark", "Skanderborgvej 277b, 8260 Viby", DateTime.Now, DateTime.Now, 175)
        };

        [HttpGet]
        public Invoice[] Get()
        {
            Invoice[] invoices = Invoices.ToArray();
            return invoices;
        }
    }
}