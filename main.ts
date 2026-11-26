// Roast the Smart Fridge: One Line, Best Laugh Wins
// Entry program: writes the roast line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Grader: Node 22, read-only /bot, user 65534, no network, run twice.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The roast line lives in entry.txt next to this script; resolve it relative
// to the script file itself, never process.cwd() or a bare relative path.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(scriptDir, "entry.txt"), "utf8");

/**
 * Validate the roast line against the sealed gate, exactly as the scorer
 * checks /output/entry.txt: UTF-8 text of 1-160 characters, not only
 * whitespace, a single line. Returns the cleaned line (one trailing newline
 * stripped, nothing else changed) so the written file is byte-identical to
 * the validated text. Throws on any violation so a bad entry fails loudly
 * instead of shipping an invalid file.
 */
function validateEntry(rawText: string): string {
  const line = rawText.replace(/\r?\n$/, "");
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${line.length}`);
  }
  if (!/\S/.test(line)) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return line;
}

const line = validateEntry(raw);

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Create the output dir if needed (never delete it) and write the line with
// no trailing newline, so the file is exactly the validated line.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
