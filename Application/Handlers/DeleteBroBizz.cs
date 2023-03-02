using Application.Core;
using MediatR;
using Persistence;

namespace BroBizz.Handlers
{
    public class DeleteBroBizz
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var brobizz = await _context.BroBizzDevices.FindAsync(request.Id);

                if (brobizz == null) return null;

                _context.Remove(brobizz);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete the brobizz");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}