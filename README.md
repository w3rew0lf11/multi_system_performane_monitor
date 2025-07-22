# Multi-System Performance Monitor

A real-time system monitoring tool built with a **Python backend** and **React frontend**. This tool allows you to track performance metrics (like CPU usage, memory, etc.) of multiple remote systems from a centralized dashboard.

## 📁 Project Structure

- `backend/web_monitor.py`: Main backend server that collects and serves performance data
- `backend/remote_agent.py`: Script to run on each remote machine whose performance is being monitored
- `frontend/`: React frontend dashboard for visualizing system metrics
- `result.png`: Example output of the dashboard UI

## 🚀 Getting Started

### 1. Run the Backend

On the system you want to monitor from (the host):

```bash
cd backend
python3 web_monitor.py
```
### 2. Run the Frontend
On the same system
```bash
cd frontend
npm install
npm start
```
The React app will open in your browser (usually at http://localhost:3000 or http://{ip}:3000).

### 3. Run Remote Agents
On every remote system you want to monitor just share the remote_agent.py and run it:
```bash
cd backend
python3 remote_agent.py
```

Each remote agent will start sending its performance data to the host system where web_monitor.py is running.
Ensure all systems (host + remotes) are connected over the same network or can reach each other via IP.

📊 Output

After everything is running, visit the frontend app and you will see the system metrics update in real time.

Dashboard Output
🛠 Tech Stack

    Backend: Python (Flask, psutil)

    Frontend: React.js


