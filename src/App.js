import React, { useState, useEffect } from "react";
import { initSocket } from "./services/socket";
import { fetchAgents } from "./services/api";
import ConnectionStatus from "./components/ConnectionStatus";
import CpuCard from "./components/CpuCard";
import MemoryCard from "./components/MemoryCard";
import DiskCard from "./components/DiskCard";
import NetworkCard from "./components/NetworkCard";
import "./App.css";

const MAX_HISTORY = 10;

const App = () => {
  const [currentAgent, setCurrentAgent] = useState(null);
  const [agentData, setAgentData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [history, setHistory] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    const socket = initSocket();

    socket.on("connect", () => {
      setConnectionStatus("connected");
      loadAgents();
    });

    socket.on("disconnect", () => {
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", () => {
      setConnectionStatus("connection error");
    });

    socket.on("system_stats", (data) => {
      if (data.agent_name === currentAgent) {
        setAgentData(data.data);
        setHistory((prev) => {
          const newHistory = [...prev, { ...data.data, timestamp: new Date() }];
          return newHistory.length > MAX_HISTORY
            ? newHistory.slice(-MAX_HISTORY)
            : newHistory;
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentAgent]);

  const loadAgents = async () => {
    const agentList = await fetchAgents();
    setAgents(agentList);

    if (agentList.length > 0 && !currentAgent) {
      setCurrentAgent(agentList[0]);
    }
  };

  const handleAgentChange = (agentName) => {
    setCurrentAgent(agentName);
    setHistory([]);
  };

  return (
    <div className="app">
      <h1>Real-Time System Performance Monitor</h1>

      <ConnectionStatus
        status={connectionStatus}
        agents={agents}
        currentAgent={currentAgent}
        onAgentChange={handleAgentChange}
      />

      <div className="dashboard">
        <CpuCard data={agentData} history={history} />
        <MemoryCard data={agentData} history={history} />
        <DiskCard data={agentData} />
        <NetworkCard data={agentData} history={history} />
      </div>
    </div>
  );
};

export default App;
