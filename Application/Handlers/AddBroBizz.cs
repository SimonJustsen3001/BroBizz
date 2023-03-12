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
    public class AddBroBizz
    {
        public class Command : IRequest<Result<Unit>>
        {
            public BroBizzDevice BroBizzDevice { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BroBizzDevice).SetValidator(new BroBizzValidator());
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var brobizz = request.BroBizzDevice;

                if (_context.BroBizzDevices.AsNoTracking().Any(x => x.Id == request.BroBizzDevice.Id))
                {
                    brobizz = await _context.BroBizzDevices.SingleOrDefaultAsync(x => x.Id == request.BroBizzDevice.Id);
                    brobizz.Name = request.BroBizzDevice.Name;
                }
                else
                    _context.BroBizzDevices.Add(brobizz);
                user.BroBizzDevices.Add(brobizz);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}