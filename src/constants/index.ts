import { CharacterSet } from "../types";
export const PASSWORD_GEN_SETS  = {
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+[]{}|;:,.<>?",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz"
}
export const CHARACTER_SETS: CharacterSet[] = [
  {
    name: "lowercase",
    size: 26,
    regex: /[a-z]/,
  },
  {
    name: "uppercase",
    size: 26,
    regex: /[A-Z]/,
  },
  {
    name: "numbers",
    size: 10,
    regex: /[0-9]/,
  },
  {
    name: "symbols",
    size: 33,
    regex: /[^a-zA-Z0-9]/,
  },
];

export const GUESSES_PER_SECOND = 1_000_000_000; // 1 billion guesses per second (modern hardware)

export const CRACK_TIME_DISPLAY = [
  { max: 1 / (24 * 60 * 60), label: "instantly" },
  { max: 1 / 24 / 60, label: "seconds" },
  { max: 1 / 24, label: "minutes" },
  { max: 1, label: "hours" },
  { max: 7, label: "days" },
  { max: 30, label: "weeks" },
  { max: 365, label: "months" },
  { max: 365 * 10, label: "years" },
  { max: 365 * 100, label: "centuries" },
  { max: Infinity, label: "eons" },
];

export const STRENGTH_LABELS = [
  { label: "Very Weak", color: "#ff4d4f" },
  { label: "Weak", color: "#ff7a45" },
  { label: "Medium", color: "#ffc53d" },
  { label: "Strong", color: "#52c41a" },
  { label: "Very Strong", color: "#1890ff" },
];

export const PASSWORD_TIPS = [
  "Use a mix of uppercase and lowercase letters",
  "Include numbers and special characters",
  "Avoid common words and patterns",
  "Make your password at least 12 characters long",
  "Don't use personal information like birthdays or names",
  "Consider using a passphrase instead of a single word"
];