# Customization Guide

There are two easy ways to personalize **Birthday Bloom** for your special person.

## 1. Changing the Name (Recommended)

### Method A: Environment Variables (The Pro Way)
Best for Vercel, Netlify, or local experts.
1. Locate `.env.example` in the root.
2. Rename it to `.env`.
3. Change `VITE_BIRTHDAY_NAME="Your Name"` to the desired name (e.g., "Riya").
4. Restart your development server.

### Method B: Static Config (The Easy Way)
Best for beginners who don't want to touch hidden files.
1. Open `src/config.ts`.
2. Find `birthdayName: "Riya"`.
3. Replace `"Riya"` with your desired name.
4. Save the file.

---

## 2. Changing the Photos
The website comes with a dynamic photo gallery. To use your own photos:
1. Go to `src/assets/`.
2. Replace `photo1.jpg`, `photo2.jpg`, and `photo3.jpg` with your own images.
3. Keep the file names **exactly the same** (e.g., `photo1.jpg`).
4. The website will automatically update.

---

## 3. Advanced Customization
- **Cake Colors**: Modify `src/components/birthday/CakeCutting.tsx`.
- **Storyline Text**: Edit `src/components/birthday/CinematicIntro.tsx`.
- **Audio Files**: Replace MP3s in the `public/` folder while keeping the same filenames.

---
**Nishant Sarkar** | NS GAMMiNG
[GitHub](https://github.com/naborajs) • [X](https://x.com/NSGAMMING699)
