using Application.Core;
using BroBizz.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class List
    {
        public class Query : IRequest<Result<List<BroBizzDevice>>> { }

        public class Handler : IRequestHandler<Query, Result<List<BroBizzDevice>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<BroBizzDevice>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var brobizzs = await _context.BroBizzDevices.ToListAsync();
                return Result<List<BroBizzDevice>>.Success(brobizzs);
            }
        }
    }
}