using Application.Core;
using BroBizz.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class GetSingleTrip
    {
        public class Query : IRequest<Result<Trip>>
        {
            public Guid TripId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Trip>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Trip>> Handle(Query request, CancellationToken cancellationToken)
            {
                var trip = await _context.Trips
                                .Include(x => x.Bridge)
                                .Include(x => x.Vehicle)
                                .Include(x => x.Invoice)
                                .Where(x => x.Id == request.TripId).FirstOrDefaultAsync();

                return Result<Trip>.Success(trip);
            }
        }
    }
}