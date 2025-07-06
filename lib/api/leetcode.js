import axios from 'axios';
import { withCache } from '../utils/cache.js';

const LEETCODE_API = 'https://leetcode.com/graphql';

const graphQLQueries = {
  userProfile: `
    query userPublicProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          userAvatar
          ranking
          reputation
          starRating
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        badges {
          id
          displayName
          icon
          category
        }
        upcomingBadges {
          name
          icon
        }
        activeBadge {
          id
          displayName
          icon
          category
        }
      }
    }
  `,
  
  recentSubmissions: `
    query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        id
        title
        titleSlug
        timestamp
        statusDisplay
        lang
      }
    }
  `,
  
  contestHistory: `
    query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
        badge {
          name
        }
      }
      userContestRankingHistory(username: $username) {
        attended
        trendDirection
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        contest {
          title
          startTime
        }
      }
    }
  `
};

export const getUserStats = async ({ username }) => {
  return withCache(`leetcode:${username}:stats`, async () => {
    try {
      const [profileRes, submissionsRes, contestRes] = await Promise.all([
        axios.post(LEETCODE_API, {
          query: graphQLQueries.userProfile,
          variables: { username }
        }),
        axios.post(LEETCODE_API, {
          query: graphQLQueries.recentSubmissions,
          variables: { username, limit: 10 }
        }),
        axios.post(LEETCODE_API, {
          query: graphQLQueries.contestHistory,
          variables: { username }
        })
      ]);
      
      const user = profileRes.data.data.matchedUser;
      if (!user) {
        throw new Error('User not found');
      }
      
      // Process submission stats
      const submitStats = user.submitStats.acSubmissionNum;
      const stats = {
        easy: submitStats.find(s => s.difficulty === 'Easy') || { count: 0, submissions: 0 },
        medium: submitStats.find(s => s.difficulty === 'Medium') || { count: 0, submissions: 0 },
        hard: submitStats.find(s => s.difficulty === 'Hard') || { count: 0, submissions: 0 }
      };
      
      const totalSolved = stats.easy.count + stats.medium.count + stats.hard.count;
      const totalSubmissions = stats.easy.submissions + stats.medium.submissions + stats.hard.submissions;
      const acceptanceRate = totalSubmissions > 0 ? Math.round((totalSolved / totalSubmissions) * 100) : 0;
      
      // Process recent submissions
      const recentSubmissions = submissionsRes.data.data.recentAcSubmissionList.map(sub => ({
        id: sub.id,
        title: sub.title,
        titleSlug: sub.titleSlug,
        timestamp: sub.timestamp,
        status: sub.statusDisplay,
        language: sub.lang,
        url: `https://leetcode.com/problems/${sub.titleSlug}/`
      }));
      
      // Process contest data
      const contestData = contestRes.data.data.userContestRanking;
      const contestHistory = contestRes.data.data.userContestRankingHistory || [];
      
      return {
        username: user.username,
        name: user.profile.realName,
        avatar: user.profile.userAvatar,
        ranking: user.profile.ranking,
        reputation: user.profile.reputation,
        starRating: user.profile.starRating,
        
        // Problem solving stats
        totalSolved,
        totalSubmissions,
        acceptanceRate,
        easySolved: stats.easy.count,
        mediumSolved: stats.medium.count,
        hardSolved: stats.hard.count,
        easyTotal: 800, // Approximate total easy problems
        mediumTotal: 1600, // Approximate total medium problems
        hardTotal: 600, // Approximate total hard problems
        
        // Contest stats
        contestCount: contestData?.attendedContestsCount || 0,
        contestRating: contestData?.rating || 0,
        contestRank: contestData?.globalRanking || 0,
        contestTopPercentage: contestData?.topPercentage || 0,
        contestBadge: contestData?.badge?.name,
        
        // Recent activity
        recentSubmissions,
        contestHistory: contestHistory.slice(0, 5),
        
        // Badges
        badges: user.badges || [],
        upcomingBadges: user.upcomingBadges || [],
        activeBadge: user.activeBadge
      };
    } catch (error) {
      console.error('LeetCode API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch LeetCode data: ${error.response?.data?.errors?.[0]?.message || error.message}`);
    }
  }, 1800000); // 30 minutes cache
};

export const getProblemStats = async ({ titleSlug }) => {
  return withCache(`leetcode:problem:${titleSlug}`, async () => {
    try {
      const query = `
        query questionData($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            questionId
            title
            titleSlug
            difficulty
            categoryTitle
            stats
            likes
            dislikes
            isPaidOnly
            topicTags {
              name
              slug
            }
          }
        }
      `;
      
      const response = await axios.post(LEETCODE_API, {
        query,
        variables: { titleSlug }
      });
      
      const question = response.data.data.question;
      if (!question) {
        throw new Error('Problem not found');
      }
      
      const stats = JSON.parse(question.stats);
      
      return {
        id: question.questionId,
        title: question.title,
        titleSlug: question.titleSlug,
        difficulty: question.difficulty,
        category: question.categoryTitle,
        acceptanceRate: stats.acRate,
        totalAccepted: stats.totalAccepted,
        totalSubmission: stats.totalSubmission,
        likes: question.likes,
        dislikes: question.dislikes,
        isPaidOnly: question.isPaidOnly,
        topics: question.topicTags.map(tag => ({
          name: tag.name,
          slug: tag.slug
        }))
      };
    } catch (error) {
      console.error('LeetCode Problem API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch problem data: ${error.response?.data?.errors?.[0]?.message || error.message}`);
    }
  }, 3600000); // 1 hour cache
}; 