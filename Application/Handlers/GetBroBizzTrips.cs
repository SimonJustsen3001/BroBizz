using Application.Core;
using BroBizz.Models;
using MediatR;
using Persistence;

namespace BroBizz.Handlers
{
    public class GetBroBizzTrips
    {
        public class Query : IRequest<Result<BroBizzDevice>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BroBizzDevice>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<BroBizzDevice>> Handle(Query request, CancellationToken cancellationToken)
            {
                var brobizz = await _context.BroBizzDevices.FindAsync(request.Id);
                return Result<BroBizzDevice>.Success(brobizz);
            }
        }
    }
}