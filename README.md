# 🛠️ Mubassitt (مُبَسِّط) | Friendly Tech Troubleshooter

> **An accessible, jargon-free tech support assistant designed for older adults and non-tech users, providing illustrated, step-by-step solutions with audio walkthroughs and interactive device inspectors.**

---

## 🌟 Overview

Technology troubleshooting can often be overwhelming, confusing, or filled with intimidating technical jargon. **Mubassitt (مُبَسِّط)** bridges this gap by turning complex device issues into gentle, step-by-step visual guides that anyone can follow with confidence.

Whether fixing a frozen laptop, an unresponsive router, a muted smartphone, or a jammed printer, this app guides users with clear diagrams, interactive hardware maps, audio narration, and real-time progress tracking.

---

## ✨ Key Features

- 🎨 **Visual Step-by-Step Guides**: High-contrast, easy-to-read cards with clear SVG diagrams illustrating exact physical actions (e.g., 10-second button holds, plug checks, volume toggles).
- 🗺️ **Interactive Hardware Inspector**: Clickable hotspot diagrams mapping physical buttons, ports, cables, and indicator lights across laptops, phones, routers, printers, TVs, and app interfaces.
- 📈 **Step-by-Step Progress Tracking**:
  - Live percentage progress bar and visual step timeline dots.
  - One-tap step completion checkboxes.
  - Previous/Next step navigation with auto-advancement.
  - Celebration card upon 100% completion with quick solution feedback.
- 🗣️ **Audio Walkthroughs**: Built-in voice narration in both English and Arabic to speak steps out loud for users who prefer listening over reading.
- 🌐 **Full Bilingual Support (English & Arabic / العربية)**:
  - Complete English and Egyptian Arabic localizations.
  - Full Right-to-Left (RTL) layout adaptation and font sizing adjustments for optimal Arabic readability.
- 🤖 **Hybrid Troubleshooting Engine**:
  - **Instant Local Offline Rules**: Fast, instant diagnostic matching for common household tech issues.
  - **Gemini AI Fallback**: Intelligent, empathetic server-side AI diagnosis powered by Gemini for custom or rare problems.
- 🚀 **GitHub Pages Ready**: Pre-configured with relative asset paths and an automated GitHub Actions deployment workflow.

---

## 📸 Interactive Modes

1. **Visual Cards View (`Eye`)**: Action-focused cards with visual badges and custom graphics for each troubleshooting step.
2. **Simple Text List (`List`)**: Compact, high-contrast step list ideal for quick reading.
3. **Hardware Inspector (`MapPin`)**: Interactive physical device diagrams pinpointing where buttons, ports, and LED indicators are located.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion / Motion
- **Deployment**: GitHub Pages (via GitHub Actions workflow in `.github/workflows/deploy.yml`)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to GitHub Pages

This project is already pre-configured for seamless automated deployment to **GitHub Pages**:

1. Push your repository to GitHub (`main` or `master` branch).
2. Go to your GitHub repository **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish the application to `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`.

---

## 🤝 Contributing

Contributions, feedback, and feature suggestions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
