using BroBizz.Handlers;
using BroBizz.Models;
using Microsoft.AspNetCore.Mvc;

namespace BroBizz.Controllers
{
    public class InvoiceController : ApiBaseController
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return HandleResult(await Mediator.Send(new GetInvoices.Query()));
        }

        [HttpGet("{invoiceId}")]
        public async Task<IActionResult> GetSingleTrip(Guid invoiceId)
        {
            return HandleResult(await Mediator.Send(new GetSingleInvoice.Query { InvoiceId = invoiceId }));
        }
    }
}