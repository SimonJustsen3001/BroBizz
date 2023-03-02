using Application.Core;
using Application.Validators;
using BroBizz.Models;
using FluentValidation;
using MediatR;
using Persistence;

namespace BroBizz.Handlers
{
    public class CreateBroBizz
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
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.BroBizzDevices.Add(request.BroBizzDevice);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}