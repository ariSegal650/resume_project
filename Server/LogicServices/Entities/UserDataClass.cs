
using System.ComponentModel.DataAnnotations;


namespace LogicServices.Entities
{
    public class UserDataClass
    {
        [Key]
        public string email { get; set; }=string.Empty;
        public string? page1 { get; set; } = string.Empty;
        public string? page2 { get; set; } = string.Empty;
        public string? page3 { get; set; } = string.Empty;
        public string ?url { get; set; } = string.Empty;
        public string ?color { get; set; } = string.Empty;

    }
}