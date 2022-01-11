using Microsoft.AspNetCore.Mvc;

namespace ABTestTask.API.Responses
{
    public class CustomBadRequest: ObjectResult
    {
        public CustomBadRequest(object value) : base(value)
        {
            Value = value;
            StatusCode = 400;
        }
    }
}