using System;
using System.Linq;
using AbTestTask.DAL;
using AbTestTask.DAL.Models;
using AbTestTask.DAL.Repositories;
using ABTestTask.Services.Contracts.Interfaces;

namespace ABTestTask.Services.Implementations
{
    public class BusinessMetricsCalculator: IBusinessMetricsCalculator
    {
        private readonly IRepository _repository;

        public BusinessMetricsCalculator(IRepository repository)
        {
            _repository = repository;
        }
        
        public double GetRollingRetentionDay(int days)
        {
            var countOfUsersReturnedToTheSystemOnOrAfterXDayAfterRegistration = _repository
                .GetAllAsNoTracking<User>()
                .Select(user =>
                    DateHelper.CountOfDaysBetweenDates(user.RegistrationDate, user.LastActivityDate) >= days)
                .Count();
            
            var countOfUsersRegisteredInTheSystemXDaysAgoOrEarlier = _repository
                .GetAllAsNoTracking<User>()
                .Select(user =>
                    DateHelper.CountOfDaysBetweenDates(user.RegistrationDate, DateTime.Now) >= days)
                .Count();

            return (double) (countOfUsersReturnedToTheSystemOnOrAfterXDayAfterRegistration) /
                countOfUsersRegisteredInTheSystemXDaysAgoOrEarlier * 100;
        }
    }
}