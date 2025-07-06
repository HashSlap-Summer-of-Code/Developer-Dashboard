import * as github from '../../../lib/api/github.js';
import * as leetcode from '../../../lib/api/leetcode.js';

const serviceHandlers = {
  github: {
    stats: github.getUserStats,
    repo: github.getRepoStats
  },
  leetcode: {
    stats: leetcode.getUserStats,
    problem: leetcode.getProblemStats
  }
};

export default async function handler(req, res) {
  const { service, endpoint } = req.query;
  
  if (!service || !serviceHandlers[service]) {
    return res.status(404).json({ 
      error: 'Service not found',
      available: Object.keys(serviceHandlers)
    });
  }
  
  const handler = serviceHandlers[service][endpoint];
  
  if (typeof handler !== 'function') {
    return res.status(404).json({ 
      error: 'Endpoint not found',
      service,
      available: Object.keys(serviceHandlers[service])
    });
  }
  
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    // Only allow GET requests for now
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // Extract parameters from query string
    const params = { ...req.query };
    delete params.service;
    delete params.endpoint;
    
    // Call the appropriate handler
    const data = await handler(params);
    
    // Set cache headers (30 minutes for most data)
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
    
    res.status(200).json(data);
  } catch (error) {
    console.error(`[${service}/${endpoint}]`, error);
    
    // Set cache headers for errors too (5 minutes)
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    
    res.status(500).json({ 
      error: error.message,
      service,
      endpoint
    });
  }
} 