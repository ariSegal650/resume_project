
using API.Dto;
using AutoMapper;
using LogicServices.Services;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {

        //private DataContext _Context { get; }
        // private IdentificationController Identification;
        private readonly IdentificationService _identificationService;
        private readonly AdminService _AdminService;
        private readonly IMapper _mapper;
        public AdminController(IdentificationService identificationService, AdminService AdminService, IMapper mapper)
        {
            _AdminService = AdminService;
            _identificationService = identificationService; 
            _mapper = mapper;
        }


        [HttpPost("getStatistics")]
        public async Task<IActionResult> getStatistics([FromBody] LinkedinDto access_token)
        {
           // Identification = new IdentificationController(this._Context, this._mapper);

            if (await _identificationService.checkTokenLinkedin(access_token.code) != "admin")
            {
                return BadRequest();
            }

            return Ok(_AdminService.getStatistics());
        }



    }
}