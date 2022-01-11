using System;
using System.Collections.Generic;
using System.Linq;
using AbTestTask.DAL;
using AbTestTask.DAL.Models;
using AbTestTask.DAL.Repositories;
using ABTestTask.Services.Contracts.DTOs;
using ABTestTask.Services.Contracts.Interfaces;

namespace ABTestTask.Services.Implementations
{
    public class StatisticCollector: IStatisticCollector
    {
        private const int NumberOfDecimalPlaces = 3;
        private readonly IRepository _repository;
        private readonly IBusinessMetricsCalculator _calculator;
        
        public StatisticCollector(IRepository repository, IBusinessMetricsCalculator calculator)
        {
            _repository = repository;
            _calculator = calculator;
        }
        public Statistics GetStatistics()
        {
            IEnumerable<int> usersLifeTime = _repository.GetAllAsNoTracking<User>().Select(user =>
                DateHelper.CountOfDaysBetweenDates(user.RegistrationDate, user.LastActivityDate));

            List<int> uniqueUsersLifeTime = usersLifeTime.Distinct().ToList();

            List<DistributionElement> distribution = new List<DistributionElement>();

            uniqueUsersLifeTime.ForEach(x=>
                distribution.Add(new DistributionElement() {Number = usersLifeTime.Count(u => u == x), Value = x}));

            return new Statistics()
            {
                RollingRetentionDay = Math.Round(_calculator.GetRollingRetentionDay(7), NumberOfDecimalPlaces),
                Average = Math.Round(usersLifeTime.Average(), NumberOfDecimalPlaces),
                Median = MathHelper.GetMedian(usersLifeTime),
                Percentile10 = Math.Round(MathHelper.GetPercentile(usersLifeTime, 0.1), NumberOfDecimalPlaces),
                Percentile90 = Math.Round(MathHelper.GetPercentile(usersLifeTime, 0.9), NumberOfDecimalPlaces),
                Distribution = distribution
            };
        }
    }
}