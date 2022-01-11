using System;

namespace ABTestTask.Services
{
    public class DateHelper
    {
        public static int CountOfDaysBetweenDates(DateTime startDate, DateTime endDate)
        {
            return (endDate.Date - startDate.Date).Days;
        }
    }
}