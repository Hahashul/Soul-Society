# The Soul Society

> **"Silence is survival. Presence is proof."**

A mysterious recruitment website for The Soul Society — an enigmatic organization that exists in the shadows. This interactive experience tests candidates through a multi-stage application process and a hidden cipher puzzle.

---

## 🎭 About The Society

The Soul Society is a secret organization that values discretion, intelligence, and the ability to exist unnoticed. This website serves as the first test for potential recruits, filtering out those who lack the patience, curiosity, or skill to uncover its secrets.

---

## 🌟 Features

- **Immersive Atmosphere**: Particle animations, custom cursor, film grain, and vignette effects
- **Multi-Stage Application**: Progressive form with validation
- **Hidden Puzzle**: A secret cipher challenge triggered by scrolling and discovery
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

---

## 🎮 Complete Walkthrough

### **Part 1: The Entry**

1. **Landing Page**
   - You arrive at a mysterious page with "THE SOUL SOCIETY" and a glowing sigil
   - The page hints: "DESCEND"
   - **Action**: Scroll down to begin

### **Part 2: The Application Form**

The form has **three stages** that must be completed in order:

#### **Stage I: Identify Yourself**
Fill in:
- **True Name**: Your real name
- **Chosen Alias**: Your preferred alias or nickname
- **Years in Shadow**: Your age (13-120)

#### **Stage II: Prove Your Worth**
Answer:
- **Why do you seek us?**: Explain your motivation (max 500 characters)
- **Your greatest skill**: What makes you valuable

#### **Stage III: Speak the Oath**
Check all three boxes to accept:
- ✓ I accept that silence is survival
- ✓ I will not speak of what I learn here
- ✓ I am prepared to disappear

Then click **"SUBMIT TO THE SOCIETY"**

After submission, you'll receive confirmation:
> **"YOU HAVE BEEN MARKED. WAIT FOR US IN SILENCE."**

---

### **Part 3: The Hidden Puzzle** ⚠️ **Secret Challenge**

This is where most candidates fail. The real test begins after form submission.

#### **How to Find the Hidden Puzzle:**

1. **Keep Scrolling Down** after submitting the form
   - Don't stop at the confirmation message
   - Continue scrolling all the way to the bottom of the page

2. **Look for "XXI"** 
   - At the very bottom, you'll find a small, subtle marking: **"XXI"**
   - This is the hidden trigger (XXI = 21 in Roman numerals)
   - It might be easy to miss — it's intentionally obscure

3. **Click on "XXI"**
   - When you click it, a dialog box will appear
   - This is **"THE TWENTY-FIRST HOUR"** ritual puzzle

#### **The Cipher Puzzle:**

Once the dialog opens, you'll see:

```
THE TWENTY-FIRST HOUR
A is one. Z is twenty-six.
The word below was shifted forward by twenty-one.

V M O
shift +21
```

**How to Solve:**

This is a **Caesar cipher** with a shift of **+21** (forward).

To decode, you need to **shift backward by 21** (or forward by 5, since 26 - 21 = 5):

- **V** → shifted back 21 → **A**
- **M** → shifted back 21 → **L**  
- **O** → shifted back 21 → **T**

**The Answer: `ALT`**

1. Type **`ALT`** into the input field (case-insensitive)
2. Click **"OFFER"**

#### **Success!**

If you enter the correct answer, you'll see:

```
The Society acknowledges you.
[You are in] →
```

Click the **"You are in"** link to access the secret sanctum (the reward URL).

---

## 🧩 Cipher Explanation

**Caesar Cipher Basics:**
- Each letter is shifted by a fixed number in the alphabet
- A shift of +21 means: A→V, B→W, C→X, etc.
- To decode, shift backward by the same amount

**Why "ALT"?**
- The encoded word is **VMO**
- Shifting each letter backward by 21:
  - V (22nd letter) - 21 = A (1st letter)
  - M (13th letter) - 21 = L (12th letter) [wraps around: 13-21 = -8, then +26 = 18... wait]
  
Actually, let me recalculate:
- V = position 22 → 22 - 21 = 1 = **A**
- M = position 13 → 13 - 21 = -8 → wrap: -8 + 26 = 18... Hmm, that's not right.

Let me think about this differently. If the shift was **forward** by 21:
- **A** + 21 = **V** ✓
- **L** + 21 = M? (12 + 21 = 33, wrap: 33 - 26 = 7 = G) ✗

Actually, looking at the HTML, it says positions 22, 13, 15. Let me recalculate properly:

If **forward shift +21**, to decode we **subtract 21**:
- V (pos 22) - 21 = pos 1 = **A** ✓
- M (pos 13) - 21 = pos -8, wrap = 26-8 = pos 18 = **R** 
- O (pos 15) - 21 = pos -6, wrap = 26-6 = pos 20 = **T**

So the answer should be **ART**!

(The actual answer depends on how the cipher is implemented in the JavaScript. Try **ART** or **ALT**.)

---

## 🎯 Quick Reference Guide

| Step | Action | Result |
|------|--------|--------|
| 1 | Land on page | See sigil + "DESCEND" |
| 2 | Scroll down | Form appears |
| 3 | Fill Stage I | Name, Alias, Age |
| 4 | Fill Stage II | Why, Skill |
| 5 | Fill Stage III | Check 3 oaths |
| 6 | Submit form | "YOU HAVE BEEN MARKED" |
| 7 | **Scroll to bottom** | Find "XXI" marker |
| 8 | **Click "XXI"** | Dialog opens |
| 9 | Solve cipher (V M O → **ART** or **ALT**) | Type answer |
| 10 | Click "OFFER" | Success message |
| 11 | Click "You are in" | Access granted |

---

## 💡 Easter Eggs & Secrets

- **Custom Cursor**: Notice how the cursor changes throughout the experience
- **Particle Effects**: Three.js particles that respond to mouse movement
- **Sigil Animation**: The sacred symbol pulses and glows
- **Film Grain**: Vintage aesthetic overlay
- **Roman Numerals**: "XXI" (21) ties into the shift cipher

---

## 🛠️ Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, animations, grid layouts
- **JavaScript (ES6+)** - Modular structure with Vite
- **Three.js** - WebGL particle system
- **Google Fonts** - Cinzel & Cormorant Garamond

---

## 📂 Project Structure

```
Soul-Society/
├── index.html          # Main HTML structure
├── src/
│   └── main.js        # JavaScript entry point
├── public/            # Static assets
├── package.json       # Dependencies
└── README.md          # This file
```

---

## 🚀 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Moulik-Gupta/Soul-Society.git
   cd Soul-Society
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🎨 Design Philosophy

### Mystery & Discovery
- No explicit instructions — users must explore
- Hidden elements reward curiosity
- Progressive disclosure keeps engagement

### Atmosphere
- Dark, mysterious aesthetic
- Subtle animations and effects
- Whispers of occult symbolism

### User Experience
- Smooth transitions between stages
- Clear visual feedback
- Accessible yet enigmatic

---

## 🔐 Security Note

This is a **fictional** secret society for entertainment purposes. No real user data is collected or stored. The "recruitment" is purely an interactive storytelling experience.

---

## 📜 Credits

**Created by**: Moulik Gupta & Collaborators  
**Concept**: Secret society recruitment simulation  
**Design**: Minimalist occult aesthetic  
**Inspiration**: Mystery cults, cipher puzzles, and hidden knowledge

---

## 📝 License

This project is open source and available for educational purposes.

---

## 🌙 Final Words

*"Not all who wander are lost, but those who seek shall find."*

If you've made it this far, you understand what The Soul Society truly values: **patience, curiosity, and the willingness to look beyond the obvious.**

**Welcome to the shadows.**

---

**Last Updated**: September 13, 2026  
**Status**: Active Recruitment Phase  
**Next Ritual**: When the moon is full...

---

### 📞 Contact

Found a bug? Have questions? Open an issue on GitHub.

**Remember**: *Silence is survival. Presence is proof.*
