using Application.Core;
using Application.Validators;
using AutoMapper;
using BroBizz.Models;
using FluentValidation;
using MediatR;
using Persistence;

namespace BroBizz.Handlers
{
    public class EditBroBizz
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var brobizz = await _context.BroBizzDevices.FindAsync(request.BroBizzDevice.Id);

                if (brobizz == null) return null;

                _mapper.Map(request.BroBizzDevice, brobizz);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the brobizz");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}