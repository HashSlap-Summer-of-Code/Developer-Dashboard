import { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaDownload } from 'react-icons/fa';
import Card from '../ui/Card';
import StatCard from '../ui/StatCard';
import Badge from '../ui/Badge';
import ContributionGraph from '../ui/ContributionGraph';
import LanguageChart from '../ui/LanguageChart';
import { formatNumber, formatRelativeTime } from '../../lib/utils/date.js';

const GitHubWidget = ({ username, token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!username || !token) {
        setError('GitHub username and token are required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/github/stats?username=${username}&token=${token}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, token]);

  if (loading) {
    return (
      <Card className="widget-card">
        <div className="flex items-center mb-4">
          <FaGithub className="w-8 h-8 mr-3 text-gray-600 dark:text-gray-400" />
          <h3 className="text-xl font-bold">GitHub Stats</h3>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="loading-spinner"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading GitHub data...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="widget-card">
        <div className="flex items-center mb-4">
          <FaGithub className="w-8 h-8 mr-3 text-gray-600 dark:text-gray-400" />
          <h3 className="text-xl font-bold">GitHub Stats</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400 mb-2">Failed to load GitHub data</p>
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
          <FaGithub className="w-8 h-8 mr-3 text-gray-600 dark:text-gray-400" />
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

      {/* Bio */}
      {data.bio && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 italic">"{data.bio}"</p>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Repositories" 
          value={formatNumber(data.repos)} 
          icon={FaCodeBranch}
          color="blue"
        />
        <StatCard 
          title="Stars" 
          value={formatNumber(data.stars)} 
          icon={FaStar}
          color="yellow"
        />
        <StatCard 
          title="Followers" 
          value={formatNumber(data.followers)} 
          icon={FaEye}
          color="green"
        />
        <StatCard 
          title="Contributions" 
          value={formatNumber(data.totalContributions)} 
          icon={FaDownload}
          color="purple"
        />
      </div>

      {/* Contribution Graph */}
      <div className="mb-6">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">
          Contribution Activity
        </h4>
        <ContributionGraph data={data.contributionCalendar} />
      </div>

      {/* Language Distribution */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">
            Language Distribution
          </h4>
          <LanguageChart data={data.languages} />
        </div>
      )}

      {/* Top Repositories */}
      {data.topRepos && data.topRepos.length > 0 && (
        <div>
          <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">
            Top Repositories
          </h4>
          <div className="space-y-3">
            {data.topRepos.slice(0, 5).map(repo => (
              <a 
                key={repo.id} 
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {repo.name}
                    </h5>
                    {repo.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center mt-2 space-x-4">
                      {repo.language && (
                        <Badge variant="default" size="sm">
                          {repo.language}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Updated {formatRelativeTime(repo.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaStar className="w-4 h-4 mr-1" />
                      {formatNumber(repo.stars)}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaCodeBranch className="w-4 h-4 mr-1" />
                      {formatNumber(repo.forks)}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default GitHubWidget; 