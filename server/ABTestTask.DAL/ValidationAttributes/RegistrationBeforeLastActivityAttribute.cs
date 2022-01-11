using System;
using System.ComponentModel.DataAnnotations;
using AbTestTask.DAL.Models;

namespace AbTestTask.DAL.ValidationAttributes
{
    public class RegistrationBeforeLastActivityAttribute: ValidationAttribute
    {
        public RegistrationBeforeLastActivityAttribute()
        {
            ErrorMessage = "Registration must be earlier or on the same day as the last activity";
        }

        protected override ValidationResult IsValid(object value, ValidationContext context)
        {
            UserDto user = value as UserDto;

            if (user.RegistrationDate == null || user.LastActivityDate == null)
            {
                return ValidationResult.Success;
            }

            DateTime registrationDate, lastActivityDate;

            if (!(DateTime.TryParse(user.RegistrationDate, out registrationDate) && DateTime.TryParse(user.LastActivityDate, out lastActivityDate)))
            {
                return ValidationResult.Success;
            }

            if (registrationDate <= lastActivityDate)
            {
                return ValidationResult.Success;
            }
            
            return new ValidationResult(ErrorMessage, new string[]{"RegistrationDate"});
        }
    }
}