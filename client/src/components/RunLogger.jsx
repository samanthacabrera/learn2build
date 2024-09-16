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
      <div>
        <button onClick={handleLogRun} className="border p-2 rounded hover:bg-black hover:text-white transition-all duration-300">
          Log New Run
        </button>
      </div>

      <div>
        {runLog.length > 0 ? (
          <>
          <h2>Your Runs</h2>
          <ul>
            {runLog.map((run, index) => (
              <li key={index}>
                <p><strong>Date:</strong> {run.date}</p>
              </li>
            ))}
          </ul>
          </>
        ) : (
          <p>No runs logged yet. </p>
        )}
      </div>
    </div>
  );
};

export default RunLogger;
