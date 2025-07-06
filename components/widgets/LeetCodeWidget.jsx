import { useState, useEffect } from 'react';
import { FaCode, FaTrophy, FaMedal, FaChartLine } from 'react-icons/fa';
import Card from '../ui/Card';
import StatCard from '../ui/StatCard';
import Badge from '../ui/Badge';
import { formatNumber } from '../../lib/utils/date.js';

const LeetCodeWidget = ({ username }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) {
        setError('LeetCode username is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/leetcode/stats?username=${username}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Failed to fetch LeetCode data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) {
    return (
      <Card className="widget-card">
        <div className="flex items-center mb-4">
          <FaCode className="w-8 h-8 mr-3 text-yellow-600" />
          <h3 className="text-xl font-bold">LeetCode Stats</h3>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="loading-spinner"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading LeetCode data...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="widget-card">
        <div className="flex items-center mb-4">
          <FaCode className="w-8 h-8 mr-3 text-yellow-600" />
          <h3 className="text-xl font-bold">LeetCode Stats</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400 mb-2">Failed to load LeetCode data</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="widget-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaCode className="w-8 h-8 mr-3 text-yellow-600" />
          <div>
            <h3 className="text-xl font-bold">{data.name || data.username}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">@{data.username}</p>
          </div>
        </div>
        {data.avatar && (
          <img 
            src={data.avatar} 
            alt={data.username}
            className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700"
          />
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Rank" 
          value={`#${formatNumber(data.ranking)}`} 
          icon={FaTrophy}
          color="yellow"
        />
        <StatCard 
          title="Solved" 
          value={formatNumber(data.totalSolved)} 
          icon={FaCode}
          color="green"
        />
        <StatCard 
          title="Acceptance" 
          value={`${data.acceptanceRate}%`} 
          icon={FaChartLine}
          color="blue"
        />
        <StatCard 
          title="Contests" 
          value={formatNumber(data.contestCount)} 
          icon={FaMedal}
          color="purple"
        />
      </div>

      {/* Problem Breakdown */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">
          Problem Breakdown
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {data.easySolved}
            </div>
            <div className="text-sm text-green-600 dark:text-green-300">Easy</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {data.easyTotal} total
            </div>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {data.mediumSolved}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-300">Medium</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {data.mediumTotal} total
            </div>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">
              {data.hardSolved}
            </div>
            <div className="text-sm text-red-600 dark:text-red-300">Hard</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {data.hardTotal} total
            </div>
          </div>
        </div>
      </div>

      {/* Contest Stats */}
      {data.contestCount > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">
            Contest Performance
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-lg font-bold text-blue-700 dark:text-blue-400">
                {data.contestRating}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-lg font-bold text-purple-700 dark:text-purple-400">
                #{formatNumber(data.contestRank)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Global Rank</div>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-700 dark:text-green-400">
                {data.contestTopPercentage}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Top %</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                {data.contestCount}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Attended</div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Submissions */}
      {data.recentSubmissions && data.recentSubmissions.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">
            Recent Submissions
          </h4>
          <div className="space-y-2">
            {data.recentSubmissions.slice(0, 5).map(sub => (
              <a 
                key={sub.id} 
                href={sub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded transition-colors"
              >
                <span className="truncate text-sm">{sub.title}</span>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge 
                    variant={sub.status === 'Accepted' ? 'success' : 'danger'}
                    size="sm"
                  >
                    {sub.status}
                  </Badge>
                  {sub.language && (
                    <Badge variant="default" size="sm">
                      {sub.language}
                    </Badge>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {data.badges && data.badges.length > 0 && (
        <div>
          <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">
            Badges
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.badges.slice(0, 6).map(badge => (
              <Badge key={badge.id} variant="info" size="sm">
                {badge.displayName}
              </Badge>
            ))}
            {data.badges.length > 6 && (
              <Badge variant="default" size="sm">
                +{data.badges.length - 6} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default LeetCodeWidget; 