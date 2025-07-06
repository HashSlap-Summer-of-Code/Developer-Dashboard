import axios from 'axios';
import { withCache } from '../utils/cache.js';

const GITHUB_API = 'https://api.github.com';
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

const createHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'Universal-Dev-Dashboard'
});

export const getUserStats = async ({ token, username }) => {
  return withCache(`github:${username}:stats`, async () => {
    const headers = createHeaders(token);
    
    try {
      // Fetch basic user info
      const userRes = await axios.get(`${GITHUB_API}/users/${username}`, { headers });
      
      // Fetch repositories
      const reposRes = await axios.get(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`, { headers });
      
      // GraphQL query for contribution data
      const graphQLQuery = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
            repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
              nodes {
                name
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                updatedAt
              }
            }
          }
        }
      `;
      
      const graphQLRes = await axios.post(
        GITHUB_GRAPHQL,
        { query: graphQLQuery, variables: { username } },
        { headers }
      );
      
      // Process languages
      const languages = {};
      const languageColors = {};
      
      reposRes.data.forEach(repo => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
          if (repo.language && !languageColors[repo.language]) {
            languageColors[repo.language] = repo.language; // We'll get colors from GraphQL
          }
        }
      });
      
      // Get language colors from GraphQL response
      if (graphQLRes.data.data?.user?.repositories?.nodes) {
        graphQLRes.data.data.user.repositories.nodes.forEach(repo => {
          if (repo.primaryLanguage) {
            languageColors[repo.primaryLanguage.name] = repo.primaryLanguage.color;
          }
        });
      }
      
      // Top repos by stars
      const topRepos = reposRes.data
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          description: repo.description,
          updatedAt: repo.updated_at
        }));
      
      // Process contribution calendar
      const contributionCalendar = graphQLRes.data.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
      
      return {
        username: userRes.data.login,
        name: userRes.data.name,
        avatar: userRes.data.avatar_url,
        bio: userRes.data.bio,
        location: userRes.data.location,
        company: userRes.data.company,
        blog: userRes.data.blog,
        twitter: userRes.data.twitter_username,
        repos: userRes.data.public_repos,
        stars: reposRes.data.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        followers: userRes.data.followers,
        following: userRes.data.following,
        totalContributions: graphQLRes.data.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0,
        contributionCalendar,
        languages: Object.entries(languages).map(([name, count]) => ({
          name,
          count,
          color: languageColors[name] || '#6c757d'
        })),
        topRepos,
        createdAt: userRes.data.created_at,
        updatedAt: userRes.data.updated_at
      };
    } catch (error) {
      console.error('GitHub API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch GitHub data: ${error.response?.data?.message || error.message}`);
    }
  }, 1800000); // 30 minutes cache
};

export const getRepoStats = async ({ token, owner, repo }) => {
  return withCache(`github:${owner}/${repo}:stats`, async () => {
    const headers = createHeaders(token);
    
    try {
      const [repoRes, commitsRes, contributorsRes] = await Promise.all([
        axios.get(`${GITHUB_API}/repos/${owner}/${repo}`, { headers }),
        axios.get(`${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=100`, { headers }),
        axios.get(`${GITHUB_API}/repos/${owner}/${repo}/contributors?per_page=100`, { headers })
      ]);
      
      return {
        name: repoRes.data.name,
        fullName: repoRes.data.full_name,
        description: repoRes.data.description,
        stars: repoRes.data.stargazers_count,
        forks: repoRes.data.forks_count,
        watchers: repoRes.data.watchers_count,
        language: repoRes.data.language,
        license: repoRes.data.license?.name,
        topics: repoRes.data.topics,
        commitCount: commitsRes.data.length,
        contributorCount: contributorsRes.data.length,
        createdAt: repoRes.data.created_at,
        updatedAt: repoRes.data.updated_at,
        pushedAt: repoRes.data.pushed_at
      };
    } catch (error) {
      console.error('GitHub Repo API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch repository data: ${error.response?.data?.message || error.message}`);
    }
  }, 3600000); // 1 hour cache
}; 