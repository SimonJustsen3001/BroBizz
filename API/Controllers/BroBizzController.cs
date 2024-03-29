﻿using BroBizz.Models;
using Microsoft.AspNetCore.Mvc;
using BroBizz.Handlers;
using Microsoft.AspNetCore.Authorization;

namespace BroBizz.Controllers
{
    [AllowAnonymous]
    public class BroBizzController : ApiBaseController
    {

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return HandleResult(await Mediator.Send(new GetBroBizzs.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBroBizzDevice(BroBizzDevice broBizzDevice)
        {
            return HandleResult(await Mediator.Send(new AddBroBizz.Command { BroBizzDevice = broBizzDevice }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBroBizzDevice(Guid id, BroBizzDevice broBizzDevice)
        {
            broBizzDevice.Id = id;
            return HandleResult(await Mediator.Send(new EditBroBizz.Command { BroBizzDevice = broBizzDevice }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBroBizzDevice(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteBroBizz.Command { Id = id }));
        }
    }
}