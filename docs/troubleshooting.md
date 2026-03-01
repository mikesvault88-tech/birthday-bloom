# Comprehensive Troubleshooting Guide 🛠️

If you encounter issues while setting up or running **Birthday Bloom**, follow this systematic diagnostic guide.

## 🔴 Common Build Errors

### 1. "Rollup failed to resolve import"
- **Cause**: Usually a typo in a file path or a case-sensitivity issue on Linux/Vercel.
- **Fix**: Check `src/App.tsx` and ensure all paths like `@/components/...` match the actual folder structure exactly.

### 2. "Browserslist error"
- **Cause**: Outdated browser database.
- **Fix**: Run `npx update-browserslist-db@latest` to sync the CSS processing tools.

### 3. "Module not found: ./App.tsx"
- **Cause**: Vite sometimes struggles with explicit extensions in `main.tsx`.
- **Fix**: Remove the `.tsx` from the import statement: `import App from './App';`.

---

## 🟠 Runtime Issues

### 1. Black Screen on Load
- **Cause**: A crash in the `SplashScreen.tsx` or an unhandled exception in `Index.tsx`.
- **Fix**: Open the browser console (F12). If you see "CelebrationOverlay is not defined", ensure the import is correct in `App.tsx`.

### 2. No Music or Sound Effects
- **Cause**: Progressive Autoplay policies in Chrome/Safari.
- **Fix**: Ensure the user clicks the "Start" button on the splash screen. This interaction "unlocks" the AudioContext for the rest of the experience.

### 3. Jittery Animations on Mobile
- **Cause**: Energy-saving mode or over-loaded main thread.
- **Fix**: Ensure `VITE_` variables don't contain massive high-res images (>2MB). Compression is key to 60fps.

---

## 🟡 ENV Personalization Failures

### 1. Name stays as "YOU"
- **Cause**: ENV variable not loaded correctly.
- **Fix**: Ensure the variable name is `VITE_BIRTHDAY_NAME` (Must start with `VITE_`). If on Vercel, ensure you triggered a "Redeploy" after adding the variable.

---

## 🛡️ Identity & Provenance
This guide is maintained by **Nishant Sarkar** and the **NS GAMMiNG** QA team. If your issue persists, please open an issue in the GitHub repository.
Identity: **Nishant Sarkar (NISHANT)**
© 2026. All rights reserved.
