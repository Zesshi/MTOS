export const postCategories = [
  "news",
  "guides",
  "writeups",
  "ctf",
  "notes",
  "learning",
  "research",
] as const;

export type PostCategory = (typeof postCategories)[number];

export const siteConfig = {
  name: "Michael Moser",
  brandMark: "MTOS",
  brandTitle: "Moser Takes On Security",
  role: "Cyber Security Specialist, IT Coach, and Vocational Trainer",
  url: process.env.SITE_URL ?? "http://localhost:3000",
  description:
    "Cybersecurity notes, guides, writeups, technical experiments, and long-form research-oriented posts with a practical engineering lens.",
  github: "https://github.com/Zesshi",
  linkedin: "https://linkedin.com/in/sec-michael-moser",
  newsletterCta:
    "Newsletter support can be added later without changing the content architecture.",
};
