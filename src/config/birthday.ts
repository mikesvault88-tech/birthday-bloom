import { config } from "../config";

/**
 * Customization Controller
 * Priority: 
 * 1. Environment Variable (VITE_BIRTHDAY_NAME)
 * 2. Static Config Fallback (config.birthdayName)
 */

const envName = import.meta.env.VITE_BIRTHDAY_NAME;
const envPhoto1 = import.meta.env.VITE_PHOTO_1;
const envPhoto2 = import.meta.env.VITE_PHOTO_2;
const envPhoto3 = import.meta.env.VITE_PHOTO_3;

export const BIRTHDAY_NAME = (envName && envName !== "") ? envName : (config.birthdayName || "YOU");

export const PHOTO_ASSETS = {
    photo1: (envPhoto1 && envPhoto1 !== "") ? envPhoto1 : null,
    photo2: (envPhoto2 && envPhoto2 !== "") ? envPhoto2 : null,
    photo3: (envPhoto3 && envPhoto3 !== "") ? envPhoto3 : null,
};
