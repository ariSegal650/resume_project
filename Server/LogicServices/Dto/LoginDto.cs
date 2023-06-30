using System.ComponentModel.DataAnnotations;

namespace LogicServices.Dto
{
    public class LoginDto
    {
        [Required]
        public string ?userName { get; set; } 

        [Required]
        public string ?password { get; set; } 

    }
}