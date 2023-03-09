using Application.Core;
using Application.Interfaces;
using BroBizz.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class GetInvoices
    {
        public class Query : IRequest<Result<List<Invoice>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Invoice>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<List<Invoice>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(x => x.Invoices)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                return Result<List<Invoice>>.Success(user.Invoices.ToList());
            }
        }
    }
}