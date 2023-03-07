using BroBizz.Models;
using FluentValidation;

namespace Application.Validators
{
    public class TripValidator : AbstractValidator<Trip>
    {
        public TripValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Bridge).NotEmpty();
            RuleFor(x => x.Invoice).NotEmpty();
            RuleFor(x => x.Vehicle).NotEmpty();
        }
    }
}