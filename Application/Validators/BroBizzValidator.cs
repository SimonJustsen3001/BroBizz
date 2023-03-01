using BroBizz.Models;
using FluentValidation;

namespace Application.Validators
{
    public class BroBizzValidator : AbstractValidator<BroBizzDevice>
    {
        public BroBizzValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}