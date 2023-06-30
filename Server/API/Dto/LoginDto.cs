using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class LoginDto
    {
        [Required]
        public string ?userName { get; set; } 

        [Required]
        public string ?password { get; set; } 

    }
}