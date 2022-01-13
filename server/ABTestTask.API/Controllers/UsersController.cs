using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ABTestTask.API.Responses;
using AbTestTask.DAL;
using ABTestTask.DAL.DTOs;
using AbTestTask.DAL.Models;
using AbTestTask.DAL.Repositories;
using ABTestTask.Services.Contracts.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ABTestTask.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IStatisticCollector _collector;
        private readonly IMapper _mapper;
        
        public UsersController(IRepository repository, IStatisticCollector collector, IMapper mapper)
        {
            _repository = repository;
            _collector = collector;
            _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _repository.GetAllAsNoTracking<User>().ToListAsync());
        }

        [HttpPut("bulk")]
        public async Task<IActionResult> EditMultipleUser([FromBody] UsersArray usersArray)
        {
            var users = usersArray.Users;
            var validationResults = new List<FailedValidationResult>();

            foreach (var user in users)
            {
                ModelState.Clear();
                TryValidateModel(user);
                
                if (!ModelState.IsValid)
                {
                    var validationResult = new FailedValidationResult()
                    {
                        FailedElementId = user.Id,
                        InvalidFields= ModelStateToInvalidFields()
                    };
                    validationResults.Add(validationResult);
                }
            }

            if (validationResults.Any())
            {
                return new CustomBadRequest(validationResults);
            }


            foreach (var userDto in users)
            {
                User user = _mapper.Map<User>(userDto);

                await _repository.UpdateAsync(user);
            }
            
            return Ok();
        }
        
        
        [HttpGet("statistics")]
        public ActionResult GetStatistics()
        {
            if (!_repository.GetAllAsNoTracking<User>().Any())
            {
                return NotFound();
            }
            
            return Ok(_collector.GetStatistics());
        }

        private List<InvalidField> ModelStateToInvalidFields(){
            
            List<InvalidField> invalidFields = new List<InvalidField>();
            
            foreach (var validationResult in ModelState)
            {
                invalidFields.Add(new InvalidField()
                {
                    FieldName = validationResult.Key,
                    ErrorMessages = validationResult.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                });
            }

            return invalidFields;
        }
    }
}