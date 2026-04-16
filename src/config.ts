/**
 * Global Configuration for Birthday Bloom
 * This file is for beginners who don't want to use Environment Variables.
 */
export const config = {
    // Method 2: Fallback Name (Only used if VITE_BIRTHDAY_NAME is not set in .env)
    birthdayName: "Shae",

    // Method 2: Fallback Photos (Only used if assets/photoX.jpg are missing)
    photos: [
        "https://images.unsplash.com/photo-1530103043960-ef38714abb15",
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176"
    ]
};
