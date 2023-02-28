namespace BroBizz.Models
{
    public class Bridge
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Bridge(string name)
        {
            Name = name;
        }
    }
}

