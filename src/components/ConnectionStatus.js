import React from 'react';

const ConnectionStatus = ({ status, agents, currentAgent, onAgentChange }) => {
  const statusClass = status.replace(' ', '-');

  return (
    <div className="connection-status">
      Connection: <span className={`status ${statusClass}`}>{status}</span>
      <span className={`status-indicator ${statusClass}`}></span>
      | Agent: 
      <select 
        id="agent-select" 
        value={currentAgent || ''} 
        onChange={(e) => onAgentChange(e.target.value)}
      >
        <option value="">Select an agent</option>
        {agents.map(agent => (
          <option key={agent} value={agent}>{agent}</option>
        ))}
      </select>
    </div>
  );
};

export default ConnectionStatus;