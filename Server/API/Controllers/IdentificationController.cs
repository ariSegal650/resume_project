using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using LogicServices.Services;
using LogicServices.Dto;
using API.Dto;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class IdentificationController : Controller
    {
        //private DataController DataUser;
        private readonly IMapper _mapper;
        private readonly IdentificationService _identificationService;
        private readonly DataService _dataService;
        public IdentificationController(IdentificationService identificationService, DataService dataService, IMapper mapper)
        {
            _dataService = dataService;
            _identificationService = identificationService;
            _mapper = mapper;
            // this.DataUser = new DataController(this._Context,this._mapper);
        }


        [HttpPost("loginLinkedin")]
        public async Task<IActionResult> loginLinkedinAsync([FromBody] LinkedinDto _code)
        {
            ResponseLoginDTO ?Email = _identificationService.loginLinkedinAsync(_code.code).Result;

            if (!string.IsNullOrEmpty(Email?.Email))
            {
               var userData=await _dataService.GetUserData(Email.Email, Email.Token);
                return Ok(userData);
            }
            else { return BadRequest(); }
        }

        [HttpPost("checkTokenLinkedin")]
        public async Task<IActionResult> checkTokenLinkedin([FromBody] LinkedinDto access_token)
        {
            var Email = await _identificationService.checkTokenLinkedin(access_token.code);
            if (string.IsNullOrEmpty(Email))
            {
                return BadRequest("something went wrong");
            }
            var userData =await _dataService.GetUserData(Email, null);
            if (userData is null)
            {
                return BadRequest("something went wrong");
            }
            return Ok(userData);
        }

        [HttpPost("CheckTokenGoogle")]
        public async Task<IActionResult> CheckTokenGoogle([FromBody] LinkedinDto access_token)
        {
           
            var Email =await _identificationService.CheckTokenGoogle(access_token.code);
            
            if (string.IsNullOrEmpty(Email))
            {
                return BadRequest("something went wrong");
            }

            var userData =await _dataService.GetUserData(Email, null);
            if (userData is null)
            {
                return BadRequest("something went wrong");
            }
            return Ok(userData);

        }




    }

}