import React, { useEffect, useMemo } from "react";
import { Shield } from "lucide-react";
import { PASSWORD_GEN_SETS } from "../constants";
// Constants for character sets


const PasswordGenerator = () => {
  // State management
  const [keyWords, setKeywords] = React.useState("");
  const [options, setOptions] = React.useState({
    numbers: false,
    symbols: false,
    uppercase: false,
    lowercase: false
  });
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  // Memoized keywords array
  const keyWordsArray = useMemo(() => (
    String(keyWords)
      .split(",")
      .map(word => word.trim())
      .filter(word => word.length > 3)
  ), [keyWords]);

  // Password generation function
  const generatePassword = () => {
    const passwordChars = keyWordsArray.join("").split("");

    // Process each character type
    Object.entries(options).forEach(([type, enabled]) => {
      if (enabled) {
        const charsToAdd = Math.floor(Math.random() * 3) + 1;
        const charSet = PASSWORD_GEN_SETS[type];
        
        for (let i = 0; i < charsToAdd; i++) {
          const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
          const randomIndex = Math.floor(Math.random() * passwordChars.length);
          passwordChars[randomIndex] = randomChar;
        }
      }
    });

    setPassword(passwordChars.join(""));
  };

  // Validation effect
  useEffect(() => {
    const errors = [];
    
    if (!Object.values(options).some(opt => opt)) {
      errors.push("Please select at least one option to generate a password.");
    }
    
    if (keyWordsArray.length < 3) {
      errors.push("Please enter at least 3 keywords (each >3 characters).");
    }
    
    setError(errors.join(" "));
  }, [options, keyWordsArray]);

  // Handle option changes
  const handleOptionChange = (option) => (e) => {
    setOptions(prev => ({ ...prev, [option]: e.target.checked }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-5">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-10 h-10 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Secure Password Generator
          </h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          Generates a secure password based on your keywords.
        </p>
        
        <div className="flex-col items-center justify-center">
          <input
            type="text"
            className="w-full text-lg border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your keywords separated by commas"
            value={keyWords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          
          <p className="text-gray-400 p-2 text-sm">
            Example: "Ferrari,lamborghini,04/04/1986"
          </p>

          <div className="grid grid-cols-2 gap-2 p-3">
            {Object.entries(options).map(([option, checked]) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleOptionChange(option)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="capitalize">Include {option}</span>
              </label>
            ))}
          </div>

          {error && <div className="text-red-500 p-2">{error}</div>}
          
          <button
            type="button"
            className="px-4 py-2 rounded-md w-full text-white font-medium bg-blue-600 hover:bg-blue-700 mt-4 disabled:bg-gray-400"
            onClick={generatePassword}
            disabled={!!error}
          >
            Generate Password
          </button>
          
          {password && (
            <div className="mt-4 p-3 bg-gray-50 rounded break-all">
              <strong>Generated Password:</strong>
              <div className="mt-1 font-mono">{password}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;