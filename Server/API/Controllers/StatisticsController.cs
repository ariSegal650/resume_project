using System.Text.Json;
using API.Dto;
using AutoMapper;
using LogicServices.Entities;
using LogicServices.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private StatisticsService _StatisticsService;
        public StatisticsController(StatisticsService StatisticsService)
        {
            _StatisticsService = StatisticsService;
        }


        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser()
        {
            var user = await _StatisticsService.CreateUser();
            if (string.IsNullOrEmpty(user)) { return new BadRequestObjectResult("somting want worng with the database"); }
            IdOnlyDto response=new IdOnlyDto();
            response.id=user;
            return Ok(response);
        }

        [HttpPost("AddClickEvent")]
        public async Task<IActionResult> AddClickEvent([FromBody] IdOnlyDto userId)
        {
            var success = await _StatisticsService.AddClickEvent(userId.id);
            if (success) { return Ok(); }

            return BadRequest();
        }

        [HttpPost("AddCity")]
        public async Task<IActionResult> AddCity([FromBody] StatisticsInfoClass User)
        {
            if (string.IsNullOrEmpty(User.city)) { return BadRequest(); }

            var success = await _StatisticsService.AddCity(User.id, User.city);

            if (success) { return Ok(); }
            return BadRequest();
        }

        [HttpPost("AddDownload")]
        public async Task<IActionResult> AddDownload([FromBody] IdOnlyDto User)
        {
            var success = await _StatisticsService.AddClickEvent(User.id);
            if (success) { return Ok(); }

            return BadRequest();
        }


    }
}
