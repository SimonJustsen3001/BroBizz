using MediatR;
using Persistence;

namespace BroBizz.Handlers
{
    public class DeleteBroBizz
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var brobizz = await _context.BroBizzDevices.FindAsync(request.Id);

                _context.Remove(brobizz);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}