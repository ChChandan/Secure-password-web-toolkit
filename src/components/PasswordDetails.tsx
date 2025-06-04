import React from 'react';
import { CharacterSet } from '../types';
import { getCharacterSets, calculateEntropy } from '../utils/passwordStrength';

interface PasswordDetailsProps {
  password: string;
}

const PasswordDetails: React.FC<PasswordDetailsProps> = ({ password }) => {
  if (!password) {
    return null;
  }

  const characterSets = getCharacterSets(password);
  const entropy = calculateEntropy(password);
  
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Password Details</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Length</p>
          <p className="text-lg font-medium">{password.length} characters</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Entropy</p>
          <p className="text-lg font-medium">{Math.round(entropy * 10) / 10} bits</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600 mb-2">Character types used:</p>
        <div className="flex flex-wrap gap-2">
          {characterSets.length ? (
            characterSets.map((set: CharacterSet) => (
              <span 
                key={set.name}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
              >
                {set.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">No character sets detected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordDetails;