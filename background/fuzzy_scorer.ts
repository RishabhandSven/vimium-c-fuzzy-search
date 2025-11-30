export function computeFuzzyScore(query: string, text: string): number {
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    
    if (q.length === 0) return 0;
    if (t.indexOf(q[0]) === -1) return 0;

    let queryIdx = 0;
    let textIdx = 0;
    let score = 0; // NEW: We track a score now

    while (textIdx < t.length) {
        if (t[textIdx] === q[queryIdx]) {
            
            // --- NEW: BONUS LOGIC ---
            // Check the character BEFORE this match.
            // If it is the start of the string (textIdx === 0) OR a space/slash/hyphen...
            // Fix: Use simple string check to avoid RegExp type conflicts
            const prevChar = t[textIdx - 1];
            if (textIdx === 0 || " /-_".includes(prevChar)) {   
                score += 10; // Big Bonus for Word Start!
            }
            else        {
                score += 1;  // Small point for random match
            }

            queryIdx++;
            
            if (queryIdx === q.length) {
                return score; // Return the total score
            }
        }
        textIdx++;
    }

    return 0;
}

// UPDATE TESTS
console.log("Score 'vsc' vs 'Visual Studio Code':", computeFuzzyScore("vsc", "Visual Studio Code"));
// Expected: ~30 points (3 word starts)

console.log("Score 'vsc' vs 'Varies Codes':", computeFuzzyScore("vsc", "Varies Codes"));
// Expected: ~12 points (V matches start, s and c match inside)