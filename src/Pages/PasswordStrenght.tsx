import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import PasswordInput from "../components/PasswordInput";
import StrengthMeter from "../components/StrengthMeter";
import TimeEstimate from "../components/TimeEstimate";
import PasswordDetails from "../components/PasswordDetails";
import PasswordTips from "../components/PasswordTips";
import { analyzePassword } from "../utils/passwordStrength";
import { STRENGTH_LABELS } from "../constants";
const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({
    score: 0,
    crackTime: { value: 0, unit: "instantly" },
    feedback: "Enter a password to check its strength",
  });

  useEffect(() => {
    const result = analyzePassword(password);
    setStrength(result);
  }, [password]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">
              Password Strength Analyzer
            </h1>
          </div>

          <PasswordInput value={password} onChange={setPassword} />

          <StrengthMeter
            score={strength.score}
            label={STRENGTH_LABELS[strength.score]?.label || "Very Weak"}
          />

          <TimeEstimate crackTime={strength.crackTime} />

          <PasswordDetails password={password} />

          <PasswordTips />
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            This tool simulates password cracking using modern hardware.
            <br />
            Always use unique, strong passwords for important accounts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrength;
