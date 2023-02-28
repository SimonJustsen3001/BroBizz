using BroBizz.Models;
using Microsoft.AspNetCore.Mvc;

namespace BroBizz.Controllers
{

    public class BridgeController : ApiBaseController
    {
        private static IEnumerable<Bridge> Bridges = new[]
        {
            new Bridge("Øresunds Broen"),
            new Bridge("Storebælts Broen")
        };

        [HttpGet]
        public Bridge[] Get()
        {
            Bridge[] bridges = Bridges.ToArray();
            return bridges;
        }
    }
}