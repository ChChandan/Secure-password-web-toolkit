import { pwnedPassword } from "hibp";
import React, { useState } from "react";
import { Shield } from "lucide-react";
import PasswordInput from "../components/PasswordInput";
const HaveIbeenPawned = () => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function checkPassword(password: string) {
    try {
      setIsLoading(true);
      const pwnedCount = await pwnedPassword(password);
      if (pwnedCount) {
        console.log(`Password has been pwned ${pwnedCount} times.`);
        setResult({ pwnedCount, isPwned: true });
      } else {
        console.log("Password has not been pwned.");
        setResult({ pwnedCount: 0, isPwned: false });
      }
    } catch (error) {
      console.error("Error fetching password data:", error);
      setResult({ error: "Failed to check password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim()) {
      checkPassword(password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center ">
      <div className="bg-white max-w-md rounded-xl shadow-lg p-6 transition-all mt-4">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-10 h-10 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800 ">
            Password Safety Check
          </h1>
        </div>

        <p className="text-gray-600 mb-6">
          Check if your password has been compromised in any known data
          breaches.
        </p>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col space-y-4">
            <PasswordInput value={password} onChange={setPassword} />

            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-md text-white font-medium ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Checking...
                </span>
              ) : (
                "Check Password"
              )}
            </button>
          </div>
        </form>

        {result && (
          <div
            className={`p-4 rounded-md ${
              result.error
                ? "bg-red-50 border border-red-200"
                : result.isPwned
                ? "bg-red-50 border border-red-200"
                : "bg-green-50 border border-green-200"
            }`}
          >
            {result.error ? (
              <p className="text-red-600 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {result.error}
              </p>
            ) : result.isPwned ? (
              <div className="text-red-600">
                <div className="flex items-center font-medium">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Password compromised!
                </div>
                <p className="mt-2">
                  This password has appeared in{" "}
                  <span className="font-bold">{result.pwnedCount}</span> data
                  breaches. You should not use this password for any online
                  accounts.
                </p>
              </div>
            ) : (
              <div className="text-green-600">
                <div className="flex items-center font-medium">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Password is safe!
                </div>
                <p className="mt-2">
                  This password has not been found in any known data breaches.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>
            We never store or send your password. The check is performed
            securely using the
            <a
              href="https://haveibeenpwned.com/Passwords"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Have I Been Pwned
            </a>{" "}
            API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HaveIbeenPawned;
