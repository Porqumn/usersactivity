using System;
using System.ComponentModel.DataAnnotations;

namespace AbTestTask.DAL.ValidationAttributes
{
    public class DateNotInTheFutureAttribute : ValidationAttribute
    {
        public DateNotInTheFutureAttribute()
        {
            ErrorMessage = "Date must be today or earlier";
        }

        public override bool IsValid(object value)
        {

            string dateInString = (string) value;

            if (dateInString == null)
            {
                return true;
            }

            DateTime date;
            
            if (!(DateTime.TryParse(dateInString, out date)))
            {
                return true;
            }
            
            return date.Date <= DateTime.Now.Date;
        }
    }
}