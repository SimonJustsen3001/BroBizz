using BroBizz.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class List
    {
        public class Query : IRequest<List<BroBizzDevice>> { }

        public class Handler : IRequestHandler<Query, List<BroBizzDevice>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<BroBizzDevice>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.BroBizzDevices.ToListAsync();
            }
        }
    }
}