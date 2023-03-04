using BroBizz.Handlers;
using BroBizz.Models;
using Microsoft.AspNetCore.Mvc;


namespace BroBizz.Controllers
{
    public class TripController : ApiBaseController
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateTrip(Trip trip)
        {
            return HandleResult(await Mediator.Send(new CreateTrip.Command { Trip = trip }));
        }
    }
}
