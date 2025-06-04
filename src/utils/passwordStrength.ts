import { CharacterSet, PasswordStrength } from "../types";
import { CHARACTER_SETS, CRACK_TIME_DISPLAY, GUESSES_PER_SECOND, STRENGTH_LABELS } from "../constants";

/**
 * Calculate the character pool size based on the types of characters used in the password
 */
export const calculatePoolSize = (password: string): number => {
  let poolSize = 0;

  CHARACTER_SETS.forEach((set: CharacterSet) => {
    if (set.regex.test(password)) {
      poolSize += set.size;
    }
  });

  return poolSize === 0 ? 26 : poolSize; // Default to lowercase if no matches
};

/**
 * Get sets of characters used in the password
 */
export const getCharacterSets = (password: string): CharacterSet[] => {
  return CHARACTER_SETS.filter((set) => set.regex.test(password));
};

/**
 * Calculate the entropy of a password
 * Entropy = log2(poolSize^length) = length * log2(poolSize)
 */
export const calculateEntropy = (password: string): number => {
  const poolSize = calculatePoolSize(password);
  return password.length * Math.log2(poolSize);
};

/**
 * Calculate how long it would take to brute force the password
 */
export const calculateCrackTime = (password: string): { value: number; unit: string } => {
  const entropy = calculateEntropy(password);
  const possibleCombinations = Math.pow(2, entropy);
  const secondsToCrack = possibleCombinations / (2 * GUESSES_PER_SECOND);
  const daysToCrack = secondsToCrack / 86400; // Convert seconds to days

  for (const time of CRACK_TIME_DISPLAY) {
    if (daysToCrack < time.max) {
      return {
        value: daysToCrack,
        unit: time.label,
      };
    }
  }

  return {
    value: daysToCrack,
    unit: "eons",
  };
};

/**
 * Analyze password and return strength
 */
export const analyzePassword = (password: string): PasswordStrength => {
  if (!password) {
    return {
      score: 0,
      crackTime: { value: 0, unit: "instantly" },
      feedback: "Enter a password to check its strength",
    };
  }

  const entropy = calculateEntropy(password);
  const crackTime = calculateCrackTime(password);
  
  // Determine score based on entropy
  let score = 0;
  if (entropy > 80) score = 4;
  else if (entropy > 60) score = 3;
  else if (entropy > 40) score = 2;
  else if (entropy > 20) score = 1;
  
  // Generate feedback
  let feedback = STRENGTH_LABELS[score].label;
  
  return {
    score,
    crackTime,
    feedback,
  };
};

/**
 * Format the crack time for display
 */
export const formatCrackTime = (crackTime: { value: number; unit: string }): string => {
  if (crackTime.unit === "instantly") {
    return "instantly";
  }
  
  if (crackTime.unit === "eons") {
    return "trillions of years";
  }
  
  if (crackTime.value < 1 && crackTime.unit === "seconds") {
    return "less than a second";
  }
  
  const formattedValue = crackTime.value < 100 
    ? Math.round(crackTime.value * 10) / 10 
    : Math.round(crackTime.value);
  
  // Handle singular vs plural for time units
  const unit = formattedValue === 1 
    ? crackTime.unit.replace(/s$/, '') 
    : crackTime.unit;
    
  return `${formattedValue} ${unit}`;
};

/**
 * Get color for strength score
 */
export const getStrengthColor = (score: number): string => {
  return STRENGTH_LABELS[score]?.color || "#ff4d4f";
};

/**
 * Calculate password strength percentage for progress bar
 */
export const calculateStrengthPercentage = (score: number): number => {
  return ((score + 1) / 5) * 100;
};