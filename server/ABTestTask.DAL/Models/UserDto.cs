using System;
using System.ComponentModel.DataAnnotations;
using AbTestTask.DAL.ValidationAttributes;

namespace AbTestTask.DAL.Models
{
    [RegistrationBeforeLastActivity]
    public class UserDto: Entity
    {
        [Required(ErrorMessage = "The registration date is required")]
        [DateNotInTheFuture]
        [IsDate]
        public string RegistrationDate { get; set; }
        
        [Required(ErrorMessage = "The last activity date is required")]
        [DateNotInTheFuture]
        [IsDate]
        public string LastActivityDate { get; set; }
    }
}