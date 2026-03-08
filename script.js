/**
 * Password Strength Checker
 * Evaluates password strength using entropy calculation,
 * character set analysis, and common password detection.
 */

// ─── Common Passwords List (top 30 for demo) ──────────────────────────────────
const COMMON_PASSWORDS = new Set([
  "password", "123456", "password123", "admin", "letmein",
  "welcome", "monkey", "dragon", "master", "sunshine",
  "princess", "qwerty", "abc123", "iloveyou", "1234567",
  "12345678", "123456789", "password1", "superman", "batman",
  "football", "shadow", "michael", "jessica", "111111",
  "000000", "pass", "hello", "charlie", "donald"
]);

// ─── DOM References ────────────────────────────────────────────────────────────
const input          = document.getElementById("password-input");
const toggleBtn      = document.getElementById("toggle-visibility");
const eyeIcon        = document.getElementById("eye-icon");
const eyeOffIcon     = document.getElementById("eye-off-icon");
const strengthBar    = document.getElementById("strength-bar");
const strengthText   = document.getElementById("strength-text");
const scoreValue     = document.getElementById("score-value");
const entropyValue   = document.getElementById("entropy-value");
const crackValue     = document.getElementById("crack-value");
const suggestionBox  = document.getElementById("suggestions-box");
const suggestionList = document.getElementById("suggestions-list");

const checks = {
  length:   document.getElementById("check-length"),
  upper:    document.getElementById("check-upper"),
  lower:    document.getElementById("check-lower"),
  number:   document.getElementById("check-number"),
  symbol:   document.getElementById("check-symbol"),
  noCommon: document.getElementById("check-no-common"),
};

// ─── Toggle Password Visibility ───────────────────────────────────────────────
toggleBtn.addEventListener("click", () => {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  eyeIcon.classList.toggle("hidden", isPassword);
  eyeOffIcon.classList.toggle("hidden", !isPassword);
});

// ─── Entropy Calculation ──────────────────────────────────────────────────────
/**
 * Calculates Shannon entropy for a password.
 * Entropy = length × log2(pool size)
 * A higher pool size (more character variety) = stronger password.
 */
function calculateEntropy(password) {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;
  if (poolSize === 0) return 0;
  return Math.floor(password.length * Math.log2(poolSize));
}

// ─── Estimated Crack Time ─────────────────────────────────────────────────────
/**
 * Rough estimate based on entropy bits.
 * Assumes a modern attacker at ~10 billion guesses/sec (10^10).
 */
function estimateCrackTime(entropy) {
  if (entropy === 0) return "—";
  const combinations = Math.pow(2, entropy);
  const guessesPerSecond = 1e10;
  const seconds = combinations / (2 * guessesPerSecond); // avg half the space

  if (seconds < 1)          return "< 1 sec";
  if (seconds < 60)         return `${Math.round(seconds)} secs`;
  if (seconds < 3600)       return `${Math.round(seconds / 60)} mins`;
  if (seconds < 86400)      return `${Math.round(seconds / 3600)} hrs`;
  if (seconds < 2592000)    return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000)   return `${Math.round(seconds / 2592000)} months`;
  if (seconds < 1e9)        return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 1e12)       return "centuries";
  return "forever";
}

// ─── Strength Evaluator ───────────────────────────────────────────────────────
function evaluatePassword(password) {
  const hasLength   = password.length >= 12;
  const hasUpper    = /[A-Z]/.test(password);
  const hasLower    = /[a-z]/.test(password);
  const hasNumber   = /[0-9]/.test(password);
  const hasSymbol   = /[^a-zA-Z0-9]/.test(password);
  const isNotCommon = !COMMON_PASSWORDS.has(password.toLowerCase());

  // Score calculation (0–100)
  let score = 0;
  if (hasLength)   score += 20;
  if (hasUpper)    score += 15;
  if (hasLower)    score += 15;
  if (hasNumber)   score += 15;
  if (hasSymbol)   score += 20;
  if (isNotCommon) score += 15;

  // Bonus for extra length
  if (password.length >= 16) score = Math.min(score + 10, 100);
  if (password.length >= 20) score = Math.min(score + 5, 100);

  // Strength level (1–5)
  let level, label;
  if (score <= 20)      { level = 1; label = "Very Weak"; }
  else if (score <= 40) { level = 2; label = "Weak"; }
  else if (score <= 60) { level = 3; label = "Fair"; }
  else if (score <= 80) { level = 4; label = "Strong"; }
  else                  { level = 5; label = "Very Strong"; }

  const entropy = calculateEntropy(password);
  const crackTime = estimateCrackTime(entropy);

  // Build suggestions
  const suggestions = [];
  if (!hasLength)   suggestions.push("Use at least 12 characters for better security.");
  if (!hasUpper)    suggestions.push("Add uppercase letters (A–Z) to increase complexity.");
  if (!hasLower)    suggestions.push("Mix in lowercase letters (a–z).");
  if (!hasNumber)   suggestions.push("Include at least one number (0–9).");
  if (!hasSymbol)   suggestions.push("Add symbols like !@#$%^&* to strengthen it.");
  if (!isNotCommon) suggestions.push("Avoid common passwords — they are easily guessed.");
  if (password.length < 16) suggestions.push("Consider making it 16+ characters for strong security.");

  return {
    score,
    level,
    label,
    entropy,
    crackTime,
    checks: { hasLength, hasUpper, hasLower, hasNumber, hasSymbol, isNotCommon },
    suggestions,
  };
}

// ─── UI Updater ───────────────────────────────────────────────────────────────
const strengthColors = {
  1: "#ff4d4d",
  2: "#ffa500",
  3: "#f0e040",
  4: "#00e5a0",
  5: "#00cfff",
};

function updateUI(password) {
  if (!password) {
    // Reset state
    strengthBar.removeAttribute("data-level");
    strengthBar.style.width = "0%";
    strengthText.textContent = "—";
    strengthText.style.color = "";
    scoreValue.textContent = "0";
    entropyValue.textContent = "0";
    crackValue.textContent = "—";
    scoreValue.style.color = "";
    entropyValue.style.color = "";
    crackValue.style.color = "";
    Object.values(checks).forEach(el => el.setAttribute("data-check", "false"));
    suggestionList.innerHTML = "";
    suggestionBox.classList.remove("visible");
    return;
  }

  const result = evaluatePassword(password);

  // Strength bar
  strengthBar.setAttribute("data-level", result.level);
  strengthText.textContent = result.label;
  strengthText.style.color = strengthColors[result.level];

  // Metrics
  scoreValue.textContent   = result.score;
  entropyValue.textContent = result.entropy;
  crackValue.textContent   = result.crackTime;

  const metricColor = strengthColors[result.level];
  scoreValue.style.color   = metricColor;
  entropyValue.style.color = metricColor;
  crackValue.style.color   = metricColor;

  // Checklist
  checks.length.setAttribute(  "data-check", result.checks.hasLength);
  checks.upper.setAttribute(   "data-check", result.checks.hasUpper);
  checks.lower.setAttribute(   "data-check", result.checks.hasLower);
  checks.number.setAttribute(  "data-check", result.checks.hasNumber);
  checks.symbol.setAttribute(  "data-check", result.checks.hasSymbol);
  checks.noCommon.setAttribute("data-check", result.checks.isNotCommon);

  // Suggestions
  if (result.suggestions.length > 0) {
    suggestionList.innerHTML = result.suggestions
      .map(s => `<li>${s}</li>`)
      .join("");
    suggestionBox.classList.add("visible");
  } else {
    suggestionList.innerHTML = "";
    suggestionBox.classList.remove("visible");
  }
}

// ─── Event Listener ───────────────────────────────────────────────────────────
input.addEventListener("input", () => updateUI(input.value));
