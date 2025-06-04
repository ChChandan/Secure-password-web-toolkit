import React, { useEffect, useRef } from 'react';
import { calculateStrengthPercentage, getStrengthColor } from '../utils/passwordStrength';

interface StrengthMeterProps {
  score: number;
  label: string;
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({ score, label }) => {
  const percentage = calculateStrengthPercentage(score);
  const color = getStrengthColor(score);
  const progressRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${percentage}%`;
      progressRef.current.style.backgroundColor = color;
    }
  }, [percentage, color]);
  
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Strength:</span>
        <span 
          className="text-sm font-medium transition-colors duration-300"
          style={{ color }}
        >
          {label}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default StrengthMeter;