// lib/slugify.ts
export function slugify(text: string, maxLength = 50): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')     // Remove non-alphanumeric chars
    .replace(/[\s_-]+/g, '-')     // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, '')      // Trim leading/trailing hyphens
    .slice(0, maxLength)          // Keep it short and readable
    .replace(/-+$/, '');          // Ensure no trailing hyphen after slice
}