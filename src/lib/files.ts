import fs from "node:fs/promises";
import path from "node:path";

export async function publicFileExists(relativePath: string) {
  const cleanPath = relativePath.replace(/^\/+/, "");
  const filePath = path.join(process.cwd(), "public", cleanPath);

  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
