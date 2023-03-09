using Application.Core;
using Application.Interfaces;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<List<Trip>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userTrip = await _context.Users
                                    .Include(x => x.BroBizzDevices)
                                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var userOwnsBrobizz = false;

                foreach (var brobizzDevice in userTrip.BroBizzDevices)
                {
                    if (brobizzDevice.Id == request.Id)
                        userOwnsBrobizz = true;
                }

                if (userOwnsBrobizz)
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

                return Result<List<Trip>>.Failure("No trips found");

            }
        }
    }
}