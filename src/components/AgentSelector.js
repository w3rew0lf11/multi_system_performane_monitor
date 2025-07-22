import React, { useEffect, useState } from 'react';
import { fetchAgents } from '../services/api';

const AgentSelector = ({ currentAgent, onAgentChange }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAgents = async () => {
      const agentList = await fetchAgents();
      setAgents(agentList);
      setLoading(false);
      
      // Select first agent by default if none selected
      if (agentList.length > 0 && !currentAgent) {
        onAgentChange(agentList[0]);
      }
    };

    loadAgents();
    const interval = setInterval(loadAgents, 5000); // Refresh agents every 5 seconds

    return () => clearInterval(interval);
  }, [currentAgent, onAgentChange]);

  const handleChange = (e) => {
    onAgentChange(e.target.value);
  };

  if (loading) {
    return <div>Loading agents...</div>;
  }

  return (
    <div className="agent-selector">
      <label htmlFor="agent-select">Select Agent: </label>
      <select 
        id="agent-select" 
        value={currentAgent || ''} 
        onChange={handleChange}
      >
        <option value="">Select an agent</option>
        {agents.map(agent => (
          <option key={agent} value={agent}>{agent}</option>
        ))}
      </select>
    </div>
  );
};

export default AgentSelector;