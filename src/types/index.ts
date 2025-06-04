export interface PasswordStrength {
  score: number; // 0-4 score
  crackTime: {
    value: number;
    unit: string;
  };
  feedback: string;
}

export interface CharacterSet {
  name: string;
  size: number;
  regex: RegExp;
}