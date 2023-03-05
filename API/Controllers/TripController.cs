using BroBizz.Handlers;
using BroBizz.Models;
using Microsoft.AspNetCore.Mvc;


namespace BroBizz.Controllers
{
    public class TripController : ApiBaseController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return HandleResult(await Mediator.Send(new GetTrips.Query { Id = id }));
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateTrip(Guid id, Trip trip)
        {
            return HandleResult(await Mediator.Send(new CreateTrip.Command { Id = id, Trip = trip }));
        }
    }
}
