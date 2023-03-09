using Application.Core;
using Application.Interfaces;
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Trip>> Handle(Query request, CancellationToken cancellationToken)
            {
                var userTrip = await _context.Users
                                    .Include(x => x.BroBizzDevices)
                                    .ThenInclude(x => x.Trips)
                                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var userOwnsTrip = false;

                foreach (var brobizz in userTrip.BroBizzDevices)
                {
                    foreach (var trap in brobizz.Trips)
                    {
                        if (trap.Id == request.TripId)
                        {
                            userOwnsTrip = true;
                        }
                    }
                }

                if (userOwnsTrip)
                {
                    var trip = await _context.Trips
                                                    .Include(x => x.Bridge)
                                                    .Include(x => x.Vehicle)
                                                    .Include(x => x.Invoice)
                                                    .Where(x => x.Id == request.TripId).FirstOrDefaultAsync();
                    return Result<Trip>.Success(trip);
                }

                return Result<Trip>.Failure("Cannot find trip");
            }
        }
    }
}