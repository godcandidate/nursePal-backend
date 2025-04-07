// copy-data.js
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { cpSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const src = join(__dirname, "data");
const dest = join(__dirname, "dist", "data");

cpSync(src, dest, { recursive: true });
console.log("✅ Data folder copied to dist");
