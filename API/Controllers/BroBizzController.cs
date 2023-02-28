using BroBizz.Models;
using Microsoft.AspNetCore.Mvc;
using BroBizz.Handlers;
using Microsoft.AspNetCore.Authorization;

namespace BroBizz.Controllers
{
    public class BroBizzController : ApiBaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<BroBizzDevice>>> Get()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BroBizzDevice>> GetBroBizz(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateBroBizzDevice(BroBizzDevice broBizzDevice)
        {
            return Ok(await Mediator.Send(new CreateBroBizz.Command { BroBizzDevice = broBizzDevice }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBroBizzDevice(Guid id, BroBizzDevice broBizzDevice)
        {
            broBizzDevice.Id = id;
            return Ok(await Mediator.Send(new EditBroBizz.Command { BroBizzDevice = broBizzDevice }));
        }
    }
}