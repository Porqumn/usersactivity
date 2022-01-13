using System.Collections.Generic;

namespace ABTestTask.DAL.DTOs
{
    public class FailedValidationResult
    {
        public int FailedElementId { get; set; }
        public List<InvalidField> InvalidFields { get; set; }
    }
}