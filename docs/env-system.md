# ENV System Guide ⚙️

**Birthday Bloom** features a robust, prioritized customization system. This allows both developers and beginners to personalize the experience with zero effort.

## 🚀 How it Works (Priority Order)

The system checks for the birthday person's name in the following order:

1.  **Environment Variable (`VITE_BIRTHDAY_NAME`)**: Highest priority. Used for production deployments (Vercel, Netlify).
2.  **Static Config (`src/config.ts`)**: Secondary priority. Used for quick local changes without `.env` files.
3.  **Default Fallback**: If neither are set, the name defaults to **"YOU"**.

---

## 🛠 Setup Instructions

### 1. Local Development (.env)
Rename `.env.example` to `.env` in the root directory and set your name:
```bash
VITE_BIRTHDAY_NAME="Someone Special"
```

### 2. Vercel / Netlify Deployment
Go to your project settings -> **Environment Variables** and add:
- **Key**: `VITE_BIRTHDAY_NAME`
- **Value**: `Someone Special`

---

## 💻 Technical Implementation
The logic is centralized in `src/config/birthday.ts`:

```typescript
const envName = import.meta.env.VITE_BIRTHDAY_NAME;
export const BIRTHDAY_NAME = (envName && envName !== "") ? envName : (config.birthdayName || "YOU");
```

This ensures that regardless of where you host it, the name will always load correctly.

---
**Nishant Sarkar** | Project Lead
