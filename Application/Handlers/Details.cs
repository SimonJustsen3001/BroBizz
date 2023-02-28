using BroBizz.Models;
using MediatR;
using Persistence;

namespace BroBizz.Handlers
{
    public class Details
    {
        public class Query : IRequest<BroBizzDevice>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BroBizzDevice>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<BroBizzDevice> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.BroBizzDevices.FindAsync(request.Id);
            }
        }
    }
}