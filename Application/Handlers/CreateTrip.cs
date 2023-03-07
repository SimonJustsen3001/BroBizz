using Application.Core;
using Application.Interfaces;
using Application.Validators;
using BroBizz.Models;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class CreateTrip
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public Trip Trip { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Trip).SetValidator(new TripValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Trip trip = new Trip();

                trip.Id = request.Trip.Id;
                trip.Invoice = request.Trip.Invoice;
                if (!_context.Bridges.AsNoTracking().Any(x => x.Name == request.Trip.Bridge.Name))
                    trip.Bridge = request.Trip.Bridge;
                else
                    trip.Bridge = _context.Bridges.FirstOrDefault(x => x.Name == request.Trip.Bridge.Name);

                if (!_context.Vehicles.AsNoTracking().Any(x => x.LicensePlate == request.Trip.Vehicle.LicensePlate))
                    trip.Vehicle = request.Trip.Vehicle;
                else
                {
                    trip.Vehicle = _context.Vehicles.FirstOrDefault(x => x.LicensePlate == request.Trip.Vehicle.LicensePlate);
                }

                var brobizz = await _context.BroBizzDevices.FirstOrDefaultAsync(x => x.Id == request.Id);

                brobizz.Trips.Add(trip);
                _context.Trips.Add(trip);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to make a new trip");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}