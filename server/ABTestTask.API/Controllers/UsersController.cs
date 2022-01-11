using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ABTestTask.API.Responses;
using AbTestTask.DAL;
using AbTestTask.DAL.Models;
using AbTestTask.DAL.Repositories;
using ABTestTask.Services.Contracts.DTOs;
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

        [HttpGet("{id}", Name = nameof(GetUser))]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            if (!await _repository.IsItemWithIdExistsAsync<User>(id))
            {
                return NotFound();
            }

            return await _repository.GetByIdAsync<User>(id);
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return Ok(await _repository.GetAllAsNoTracking<User>().ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                var result = new CustomBadRequest(ModelStateToInvalidFields());
                return result;
            }

            User user = _mapper.Map<User>(userDto);

            await _repository.AddAsync(user);

            return CreatedAtRoute(nameof(GetUser), new {id = user.Id}, userDto);
        }

        [HttpPost("bulk")]
        public async Task<IActionResult> CreateMultipleUser([FromBody] UsersArray usersArray)
        {
            var users = usersArray.Users;
            var validationResults = new List<FailedValidationResult>();
            
            for (int index = 0; index < users.Length; index++)
            {
                ModelState.Clear();
                TryValidateModel(users[index]);
                
                if (!ModelState.IsValid)
                {
                    var validationResult = new FailedValidationResult()
                    {
                        FailedElementNumber = index + 1,
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

                await _repository.AddAsync(user);
            }
            
            return Ok();
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(int id, [FromBody] UserDto updatedUserDto)
        {
            if (!await _repository.IsItemWithIdExistsAsync<User>(id))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return  new CustomBadRequest(ModelStateToInvalidFields());
            }

            var user = await _repository.GetByIdAsync<User>(id);

            var updatedUser = _mapper.Map<User>(updatedUserDto);

            user.RegistrationDate = updatedUser.RegistrationDate;
            user.LastActivityDate = updatedUser.LastActivityDate;

            await _repository.UpdateAsync(user);

            return Ok();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult>  CreateMultipleUser(int id)
        {
            if (!await _repository.IsItemWithIdExistsAsync<User>(id))
            {
                return NotFound();
            }
            
            await _repository.DeleteAsync<User>(id);

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