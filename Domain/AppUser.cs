using Microsoft.AspNetCore.Identity;

namespace BroBizz.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}
