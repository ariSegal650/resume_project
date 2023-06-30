using API.Dto;
using AutoMapper;
using LogicServices.Dto;
using LogicServices.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {

        private readonly IMapper _mapper;
        // private IdentificationController identification;
        private readonly DataService _dataService;
        private IdentificationService _identificationService;
        public DataController(IdentificationService identificationService,DataService dataService, IMapper mapper)
        {
            _identificationService = identificationService;
            _dataService = dataService;
            _mapper = mapper;
        }      


        [HttpPost("saveInfo")]
        public async Task<IActionResult> saveInfo([FromBody] reciveDataDto userD)
        {
      
            var Email = "";
            if (userD.type == "GoogleToken")
            {
                Email = await _identificationService.CheckTokenGoogle(userD.Token);
            }
            if (userD.type == "linkedinToken")
            {
                Email = await _identificationService.checkTokenLinkedin(userD.Token);
            }

            if (Email is null) { return BadRequest(); }

            if (_dataService.saveInfo(userD, Email).Result) { return Ok(); }
            else { return  BadRequest(); }

        }


        [HttpPost("GetResume")]
        public async Task<IActionResult> GetResume([FromBody] IdOnlyDto url)
        {
            var ResumeData =await _dataService.GetResume(url.id);
            if (ResumeData is not null)
            {
                return Ok(ResumeData);
            }
            else { return BadRequest(); }   
            
        }
    }

}