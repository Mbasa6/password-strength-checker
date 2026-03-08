# 🔐 Password Strength Checker

A real-time password strength evaluator built with plain HTML, CSS, and JavaScript. This tool analyses password security using entropy calculation, character set analysis, and common password detection — all processed locally in the browser with no data ever transmitted.

---

## 📌 Project Description

This project was developed as part of the Postgraduate Diploma in Software Engineering at **Cape Peninsula University of Technology (CPUT)**. It demonstrates core web development skills, version control practices, and an understanding of password security principles relevant to cybersecurity.

The checker evaluates passwords across six criteria and returns:
- A **strength rating** (Very Weak → Very Strong)
- A **score out of 100**
- A calculated **entropy value** (in bits)
- An **estimated crack time** based on brute-force assumptions
- **Actionable suggestions** to improve the password

---

## 🚀 Features

- ✅ Real-time password strength evaluation
- ✅ Entropy calculation using Shannon entropy formula
- ✅ Estimated crack time (based on 10 billion guesses/sec)
- ✅ Six-point requirements checklist
- ✅ Common password detection (top 30 passwords)
- ✅ Password visibility toggle (show/hide)
- ✅ Fully client-side — no data sent anywhere

---

## 🧮 How Entropy is Calculated

Password entropy is calculated as:

```
Entropy (bits) = Length × log₂(Pool Size)
```

Where **Pool Size** depends on the character types used:

| Character Type | Pool Size |
|----------------|-----------|
| Lowercase (a–z) | 26 |
| Uppercase (A–Z) | 26 |
| Numbers (0–9) | 10 |
| Symbols (!@#...) | 32 |

Higher entropy = harder to crack. A password with 60+ bits is considered strong.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure and markup |
| CSS3 | Styling, animations, responsive layout |
| JavaScript (ES6+) | Logic, DOM manipulation, entropy calculation |
| Google Fonts | Typography (Syne + DM Mono) |

---

## ▶️ How to Run

No build tools or dependencies required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/password-strength-checker.git
   ```

2. **Navigate to the project folder:**
   ```bash
   cd password-strength-checker
   ```

3. **Open in your browser:**
   ```bash
   open index.html
   ```
   Or simply double-click `index.html` in your file explorer.

---

## 📁 Project Structure

```
password-strength-checker/
│
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # Password logic and DOM updates
├── screenshots/        # Screenshots of the project running
│   └── running.png
└── README.md           # Project documentation
```

---

## 📸 Screenshots

> Screenshots showing the project running locally with timestamp visible.

![Password Strength Checker - Weak](screenshots/screenshot-weak.png)
![Password Strength Checker - Strong](screenshots/screenshot-strong.png)

---

## 🔒 Security Note

This tool runs **entirely in the browser**. No passwords are stored, logged, or transmitted. It is intended purely as an educational tool to demonstrate password security concepts.

---

## 👤 Author

**[Your Name]**
Postgraduate Diploma in Software Engineering
Cape Peninsula University of Technology (CPUT)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
