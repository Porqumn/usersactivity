namespace ABTestTask.Services.Contracts.Interfaces
{
    public interface IBusinessMetricsCalculator
    {
        public double GetRollingRetentionDay(int days);
    }
}