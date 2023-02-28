using AutoMapper;
using BroBizz.Models;
using MediatR;
using Persistence;

namespace BroBizz.Handlers
{
    public class EditBroBizz
    {
        public class Command : IRequest
        {
            public BroBizzDevice BroBizzDevice { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var brobizz = await _context.BroBizzDevices.FindAsync(request.BroBizzDevice.Id);

                _mapper.Map(request.BroBizzDevice, brobizz);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}