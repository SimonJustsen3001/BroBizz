using Application.Core;
using BroBizz.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class GetTrips
    {
        public class Query : IRequest<Result<List<Trip>>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Trip>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Trip>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var brobizz = await _context.BroBizzDevices
                                .Include(x => x.Trips)
                                .ThenInclude(x => x.Bridge)
                                .Include(x => x.Trips)
                                .ThenInclude(x => x.Vehicle)
                                .Include(x => x.Trips)
                                .ThenInclude(x => x.Invoice)
                                .Where(x => x.Id == request.Id).FirstOrDefaultAsync();

                var trips = brobizz.Trips.ToList();

                return Result<List<Trip>>.Success(trips);
            }
        }
    }
}