import React from 'react';
import { formatCrackTime } from '../utils/passwordStrength';

interface TimeEstimateProps {
  crackTime: {
    value: number;
    unit: string;
  };
}

const TimeEstimate: React.FC<TimeEstimateProps> = ({ crackTime }) => {
  const formattedTime = formatCrackTime(crackTime);
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Time to crack:</h3>
      <div className="text-2xl font-bold transition-all duration-300">
        {formattedTime}
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Estimated time for a brute force attack with modern hardware (1 billion guesses per second)
      </p>
    </div>
  );
};

export default TimeEstimate;