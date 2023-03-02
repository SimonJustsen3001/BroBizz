using Microsoft.AspNetCore.Identity;

namespace BroBizz.Models
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public ICollection<BroBizzDevice> BroBizzDevices { get; set; }
    }
}
