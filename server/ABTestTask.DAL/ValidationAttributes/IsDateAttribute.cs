using System;
using System.ComponentModel.DataAnnotations;

namespace AbTestTask.DAL.ValidationAttributes
{
    public class IsDateAttribute: ValidationAttribute
    {
        public IsDateAttribute()
        {
            ErrorMessage = "Value is not a date";
        }

        public override bool IsValid(object value)
        {
            string date = (string) value;

            if (string.IsNullOrEmpty(date))
            {
                return true;
            }

            return DateTime.TryParse(date, out DateTime _);
        }
    }
}