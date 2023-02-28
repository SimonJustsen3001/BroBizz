using BroBizz.Models;
using MediatR;
using Persistence;

namespace BroBizz.Handlers
{
    public class CreateBroBizz
    {
        public class Command : IRequest
        {
            public BroBizzDevice BroBizzDevice { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.BroBizzDevices.Add(request.BroBizzDevice);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}