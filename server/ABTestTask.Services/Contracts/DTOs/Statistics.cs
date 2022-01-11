using System.Collections.Generic;

namespace ABTestTask.Services.Contracts.DTOs
{
    public class Statistics
    {
        public double RollingRetentionDay { get; set; }
        public double Average { get; set; }
        
        public double Median { get; set; }
        
        public double Percentile10 { get; set; }
        
        public double Percentile90 { get; set; }
        
        public List<DistributionElement> Distribution { get; set; } 
    }
}