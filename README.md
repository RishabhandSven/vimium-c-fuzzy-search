# Vimium C - Fuzzy Search Implementation

This is a modified version of the [Vimium C](https://github.com/gdh1995/vimium-c) extension.

### The Problem
The original search engine used exact substring matching. Searching for acronyms (e.g., typing "vsc" for "Visual Studio Code") returned 0 results.

### The Solution
I implemented a **Fuzzy Search & Ranking Engine** in TypeScript:
1.  **Algorithm:** Linear-time Two-Pointer algorithm to detect non-contiguous character matches.
2.  **Heuristic Scoring:** Added weighted bonuses for "Word Start" matches (Acronyms).
3.  **Title-Bias:** Modified `completion_utils.ts` to prioritize Title matches over URL matches, filtering out false positives from long, encoded URLs (like Google Sign-in links).

### Key Files Modified
* `background/completion_utils.ts`: Injected the fuzzy scoring logic into `ComputeRelevancy`.