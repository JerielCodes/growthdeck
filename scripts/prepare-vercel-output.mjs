import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const outputDir = path.join(root, ".vercel", "output");
const staticDir = path.join(outputDir, "static");
const serverFuncDir = path.join(outputDir, "functions", "__server.func");

async function ensureExists(target, label) {
  try {
    await stat(target);
  } catch {
    throw new Error(`Missing ${label}: ${target}`);
  }
}

await ensureExists(path.join(distDir, "client"), "Nitro client output");
await ensureExists(path.join(distDir, "server"), "Nitro server output");
await ensureExists(path.join(distDir, "config.json"), "Nitro Vercel config");

await rm(outputDir, { recursive: true, force: true });
await mkdir(staticDir, { recursive: true });
await mkdir(serverFuncDir, { recursive: true });

await cp(path.join(distDir, "client"), staticDir, { recursive: true });
await cp(path.join(distDir, "server"), serverFuncDir, { recursive: true });
await cp(path.join(distDir, "config.json"), path.join(outputDir, "config.json"));

console.log("Prepared .vercel/output from Nitro dist artifacts.");
