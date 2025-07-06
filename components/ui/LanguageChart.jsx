import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const LanguageChart = ({ data = [], className = '' }) => {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center h-48 text-gray-500 dark:text-gray-400 ${className}`}>
        <p>No language data available</p>
      </div>
    );
  }
  
  // Sort by count and take top 8 languages
  const sortedData = data
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  
  // Generate colors for languages
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'
  ];
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 dark:text-gray-100">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.count} repositories ({((data.count / data.total) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };
  
  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap gap-2 mt-4">
      {payload.map((entry, index) => (
        <div key={entry.value} className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {entry.value} ({sortedData[index]?.count || 0})
          </span>
        </div>
      ))}
    </div>
  );
  
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={sortedData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="count"
          >
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LanguageChart; 