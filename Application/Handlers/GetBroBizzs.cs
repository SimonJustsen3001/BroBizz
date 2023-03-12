using Application.Core;
using Application.Interfaces;
using BroBizz.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace BroBizz.Handlers
{
    public class GetBroBizzs
    {
        public class Query : IRequest<Result<List<BroBizzDevice>>> { }

        public class Handler : IRequestHandler<Query, Result<List<BroBizzDevice>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }
            public async Task<Result<List<BroBizzDevice>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var userbrobizzs = await _context.BroBizzDevices.Where(x => x.AppUser.Id == user.Id).ToListAsync();

                return Result<List<BroBizzDevice>>.Success(userbrobizzs);
            }
        }
    }
}