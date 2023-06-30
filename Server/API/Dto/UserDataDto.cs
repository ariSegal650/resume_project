using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dto
{

    public class UserDataDto
    {
        public string? page1 { get; set; } = string.Empty;
        public string? page2 { get; set; } = string.Empty;
        public string? page3 { get; set; } = string.Empty;
        public string? url { get; set; } = string.Empty;
        public string? message { get; set; } = string.Empty;
        public string? email { get; set; }
        public string ?color { get; set; }
        public string ?Token { get; set; }= string.Empty;
    }
    //public class reciveDataDto
    //{
    //    public string? page1 { get; set; } = string.Empty;
    //    public string? page2 { get; set; } = string.Empty;
    //    public string? page3 { get; set; } = string.Empty;
    //    public string? type { get; set; }
    //    public string Token { get; set; }= string.Empty;

    //}
}