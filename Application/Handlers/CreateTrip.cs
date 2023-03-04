using Application.Core;
using Application.Interfaces;
using Application.Validators;
using BroBizz.Models;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class CreateTrip
    {
        public class Command : IRequest<Result<Unit>>
        {
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
                //var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                Console.WriteLine($"\n\n{request.Trip.Id}\n{request.Trip.Bridge.Name}\n{request.Trip.Vehicle.LicensePlate}\n{request.Trip.Invoice.Id}\n\n");

                Console.WriteLine("\n\n This is before _context add\n\n");

                Trip trip = new Trip();

                trip.Id = request.Trip.Id;
                trip.Invoice = request.Trip.Invoice;
                if (!_context.Bridges.Any(x => x.Name == request.Trip.Bridge.Name))
                {

                }
                trip.Bridge = request.Trip.Bridge;
                if (!_context.Vehicles.Any(x => x.LicensePlate == request.Trip.Vehicle.LicensePlate))
                    trip.Vehicle = request.Trip.Vehicle;


                Console.WriteLine("\n\n This is after _context add\n\n");

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to make a new trip");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}