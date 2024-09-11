import React, { useState } from 'react';

const RunLogger = () => {
  const [date, setDate] = useState('');
  const [runLog, setRunLog] = useState([]);

  const handleLogRun = () => {
    const newRun = { date, distance };
    setRunLog([...runLog, newRun]);
    setDate('');

  };

  return (
    <div>
      <h1>Log Your Run</h1>
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
        <button onClick={handleLogRun}>
          Log Run
        </button>
      </div>

      <div>
        <h2>Your Runs</h2>
        {runLog.length > 0 ? (
          <ul>
            {runLog.map((run, index) => (
              <li key={index}>
                <p><strong>Date:</strong> {run.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No runs logged yet. </p>
        )}
      </div>
    </div>
  );
};

export default RunLogger;
