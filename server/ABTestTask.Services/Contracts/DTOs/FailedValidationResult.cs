using System.Collections.Generic;

namespace ABTestTask.Services.Contracts.DTOs
{
    public class FailedValidationResult
    {
        public int FailedElementNumber { get; set; }
        public List<InvalidField> InvalidFields { get; set; }
    }
}