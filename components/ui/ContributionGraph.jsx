import { useMemo } from 'react';
import { getContributionLevel } from '../../lib/utils/date.js';

const ContributionGraph = ({ data = [], className = '' }) => {
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Flatten the weeks data into individual days
    const days = [];
    data.forEach(week => {
      week.contributionDays.forEach(day => {
        days.push({
          date: day.date,
          count: day.contributionCount,
          level: getContributionLevel(day.contributionCount)
        });
      });
    });
    
    // Group by weeks for display
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  }, [data]);
  
  if (processedData.length === 0) {
    return (
      <div className={`flex items-center justify-center h-32 text-gray-500 dark:text-gray-400 ${className}`}>
        <p>No contribution data available</p>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="flex space-x-1">
        {processedData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col space-y-1">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`
                  w-3 h-3 rounded-sm border border-gray-200 dark:border-gray-700
                  ${day.level === 0 ? 'bg-gray-100 dark:bg-gray-800' : ''}
                  ${day.level === 1 ? 'bg-green-200 dark:bg-green-900/30' : ''}
                  ${day.level === 2 ? 'bg-green-300 dark:bg-green-800/50' : ''}
                  ${day.level === 3 ? 'bg-green-400 dark:bg-green-700/70' : ''}
                  ${day.level === 4 ? 'bg-green-500 dark:bg-green-600' : ''}
                `}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm border border-gray-200 dark:border-gray-700"></div>
          <div className="w-3 h-3 bg-green-200 dark:bg-green-900/30 rounded-sm border border-gray-200 dark:border-gray-700"></div>
          <div className="w-3 h-3 bg-green-300 dark:bg-green-800/50 rounded-sm border border-gray-200 dark:border-gray-700"></div>
          <div className="w-3 h-3 bg-green-400 dark:bg-green-700/70 rounded-sm border border-gray-200 dark:border-gray-700"></div>
          <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded-sm border border-gray-200 dark:border-gray-700"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default ContributionGraph; 