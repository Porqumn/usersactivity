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
            int countOfUsersReturnedToTheSystemOnOrAfterXDayAfterRegistration = 0;
            int countOfUsersRegisteredInTheSystemXDaysAgoOrEarlier = 0;
            
            _repository.GetAllAsNoTracking<User>().ToList().ForEach(user =>
            {
                if (DateHelper.CountOfDaysBetweenDates(user.RegistrationDate, user.LastActivityDate) >= days)
                {
                    countOfUsersReturnedToTheSystemOnOrAfterXDayAfterRegistration++;
                }
                
                if (DateHelper.CountOfDaysBetweenDates(user.RegistrationDate, DateTime.Now) >= days)
                {
                    countOfUsersRegisteredInTheSystemXDaysAgoOrEarlier++;
                }
                
                
            });

            return countOfUsersRegisteredInTheSystemXDaysAgoOrEarlier == 0
                ? -1
                : (double) (countOfUsersReturnedToTheSystemOnOrAfterXDayAfterRegistration) /
                countOfUsersRegisteredInTheSystemXDaysAgoOrEarlier * 100;
        }
    }
}