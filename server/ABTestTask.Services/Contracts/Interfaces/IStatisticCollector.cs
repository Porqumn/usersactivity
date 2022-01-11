using ABTestTask.Services.Contracts.DTOs;

namespace ABTestTask.Services.Contracts.Interfaces
{
    public interface IStatisticCollector
    {
        public Statistics GetStatistics();
    }
}