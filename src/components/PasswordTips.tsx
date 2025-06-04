import React from 'react';
import { PASSWORD_TIPS } from '../constants';

const PasswordTips: React.FC = () => {
  return (
    <div className="mt-6 p-4 border border-blue-200 bg-blue-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-blue-800">Password Tips</h3>
      <ul className="space-y-2">
        {PASSWORD_TIPS.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span className="text-sm text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordTips;