using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BroBizz.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiBaseController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();
    }
}