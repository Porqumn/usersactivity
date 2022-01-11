using System;
using System.Collections.Generic;
using System.Linq;

namespace ABTestTask.Services
{
    public class MathHelper
    {
        public static double GetMedian(IEnumerable<int> numbers)
        {
            var sortedNumbers = numbers.OrderBy(x => x).ToArray();
            int size = sortedNumbers.Length;
            int mid = size / 2;
            double median = (size % 2 != 0)
                ?  Math.Round((double)sortedNumbers[mid], 0)
                : Math.Round(((double)(sortedNumbers[mid] + sortedNumbers[mid - 1]) / 2), 1);
            return median;
        }

        public static double GetPercentile(IEnumerable<int> numbers, double percentile)
        {
            var sortedNumbers = numbers.OrderBy(x => x).ToArray();
        
            double realIndex = percentile * (sortedNumbers.Length - 1);
            int index = (int) realIndex;
            double frac = realIndex - index;
        
            if (index + 1 < sortedNumbers.Length)
            {
                return sortedNumbers[index] * (1 - frac) + sortedNumbers[index + 1] * frac;
            }

            return sortedNumbers[index];
        }
    }
}