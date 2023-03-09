using Application.Core;
using Application.Interfaces;
using BroBizz.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class GetSingleInvoice
    {
        public class Query : IRequest<Result<Invoice>>
        {
            public Guid InvoiceId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Invoice>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<Invoice>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                                    .Include(x => x.Invoices)
                                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                foreach (var invoice in user.Invoices)
                {
                    if (invoice.Id == request.InvoiceId)
                        return Result<Invoice>.Success(invoice);
                }

                return Result<Invoice>.Failure("Cannot find invoice");
            }
        }
    }
}