import { useMemo } from 'react';

const Heatmap = ({ 
  data = [], 
  width = 800, 
  height = 120, 
  cellSize = 12, 
  cellSpacing = 2,
  className = '',
  colorScale = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  maxValue = null
}) => {
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    // Find max value if not provided
    const max = maxValue || Math.max(...data.map(d => d.value), 1);
    
    return data.map(item => ({
      ...item,
      colorIndex: Math.floor((item.value / max) * (colorScale.length - 1))
    }));
  }, [data, maxValue, colorScale]);
  
  const gridWidth = Math.ceil(width / (cellSize + cellSpacing));
  const gridHeight = Math.ceil(height / (cellSize + cellSpacing));
  
  if (processedData.length === 0) {
    return (
      <div className={`flex items-center justify-center h-32 text-gray-500 dark:text-gray-400 ${className}`}>
        <p>No data available</p>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <svg width={width} height={height} className="overflow-visible">
        {processedData.map((item, index) => {
          const row = Math.floor(index / gridWidth);
          const col = index % gridWidth;
          const x = col * (cellSize + cellSpacing);
          const y = row * (cellSize + cellSpacing);
          
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              fill={colorScale[item.colorIndex]}
              className="transition-colors duration-200"
              rx={2}
              title={`${item.label || item.date}: ${item.value}`}
            />
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex items-center space-x-1">
          {colorScale.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap; 