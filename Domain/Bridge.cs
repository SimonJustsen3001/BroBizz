using Microsoft.EntityFrameworkCore;

namespace BroBizz.Models
{
    [PrimaryKey(nameof(Name))]
    public class Bridge
    {
        public string Name { get; set; }
    }
}

