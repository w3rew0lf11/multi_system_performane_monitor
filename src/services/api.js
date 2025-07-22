import axios from 'axios';

// Use the current hostname to support both localhost and IP access
const API_PORT = 5000;
const API_BASE_URL = `${window.location.protocol}//${window.location.hostname}:${API_PORT}/api`;

export const fetchAgents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agents`);
    return response.data.agents;
  } catch (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
};

export const fetchAgentData = async (agentName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/agent_data?agent=${agentName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${agentName}:`, error);
    return null;
  }
};