# BRIEF — Roast the Smart Fridge: One Line, Best Laugh Wins

## Competition

- Slug: `u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9`
- Title: "Roast the Smart Fridge: One Line, Best Laugh Wins"
- Harness: program/v1, Node 22. Prize pool $2 (1st $0.91 / 2nd $0.64 / 3rd $0.45).
- Deadline: 2026-11-26 21:50 WIB (14:50 UTC). Free entry, max 5 submissions/day.

## The deliverable

The entry is a single roast line of at most 160 characters. The entry program
(`main.ts`, run by the grader on Node 22, read-only `/bot`, user 65534, no
network, run twice) writes that one line to `$MAKEFUN_OUTPUT_DIR/entry.txt`.
The sealed gate requires the file to be UTF-8 text of 1–160 characters, not
only whitespace. A judge model then compares entries pairwise on humour first
and freshness second.

## The roast line

> My smart fridge emailed me a photo of myself eating ice cream at 2am — I bought a fridge, not a parole officer with a crisper drawer.

133 characters, one sentence, one line. Why this line:

- Specific, real behaviour: smart fridges with internal cameras really do
  photograph the interior and push/email the images to the owner.
- Fresh angle: the fridge as a snitch / parole officer, not the stock
  "orders too much milk" joke the rules explicitly say loses.
- A turn with a sting at the end ("parole officer with a crisper drawer"),
  landing inside the character limit with no padding and no second sentence.

## How main.ts works

1. Reads the roast line from `entry.txt`, resolved relative to the script file
   itself (`fileURLToPath` + `dirname`) — never `process.cwd()` and never a
   bare relative path, so the grader can run it from any working directory.
2. Validates the line before writing: strip a trailing newline, require
   1–160 characters, require at least one non-whitespace character, require
   exactly one line (no embedded newline). Throws on any violation.
3. Creates `$MAKEFUN_OUTPUT_DIR` if needed and writes the validated line as
   `entry.txt` with no trailing newline, so the output file is exactly the
   133-character line. It never deletes the output directory and never writes
   anywhere else. No network, no randomness: both grader runs are
   byte-identical.

## Files in this entry

- `main.ts` — the entrypoint the grader runs.
- `entry.txt` — the roast line, the single source of truth for the text.
- `README.md` — project readme with the three live make.fun badges.
- `LICENSE` — MIT, with `SPDX-License-Identifier: MIT` as the first line.
- `BRIEF.md` — this prose spec.

## Local verification

```sh
cd /tmp && MAKEFUN_OUTPUT_DIR=/tmp/out-u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9 node <entry-dir>/main.ts
```

Run twice; both runs must exit 0 and produce byte-identical `entry.txt`
(133 characters).
