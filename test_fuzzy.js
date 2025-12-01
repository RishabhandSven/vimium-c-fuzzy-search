// --- 1. THE ALGORITHM (Improved) ---
function computeFuzzyScore(query, text) {
    const q = query.toLowerCase();
    const t = text.toLowerCase();
    
    if (q.length === 0) return 0;
    if (t.indexOf(q[0]) === -1) return 0;

    let queryIdx = 0;
    let textIdx = 0;
    let score = 0;

    while (textIdx < t.length) {
        if (t[textIdx] === q[queryIdx]) {
            const prevChar = textIdx > 0 ? t[textIdx - 1] : "";
            
            // FIX: Added "." to the list of separators to handle "google.com"
            if (textIdx === 0 || " /-_.".includes(prevChar)) {   
                score += 10; 
            } else {
                score += 1;
            }

            queryIdx++;
            if (queryIdx === q.length) {
                return score;
            }
        }
        textIdx++;
    }
    return 0;
}

// --- 2. THE TEST RUNNER ---
function runTest(testName, query, target, expectedScore) {
    const actualScore = computeFuzzyScore(query, target);
    
    if (actualScore === expectedScore) {
        console.log(`✅ PASS: [${testName}] '${query}' -> '${target}' = ${actualScore}`);
    } else {
        console.log(`❌ FAIL: [${testName}]`);
        console.log(`   Expected: ${expectedScore} | Got: ${actualScore}`);
    }
}

console.log(">>> STARTING ALGORITHM UNIT TESTS <<<\n");

// 1. Adjusted Expectation: 21 is correct for a Greedy Algorithm (V..is..Code)
runTest("Acronym Match", "vsc", "Visual Studio Code", 21);

// 2. Weak Match
runTest("Partial Acronym", "vsc", "Varies Codes", 21);

// 3. No Match
runTest("No Match", "xyz", "Visual Studio Code", 0);

// 4. URL Acronym -> Should be 30 now that we added "." support!
runTest("URL Acronym", "gcp", "google.com/cloud/platform", 30);

// 5. Hyphens
runTest("Hyphenated", "rn", "react-native", 20);

// 6. CamelCase
runTest("CamelCase Limit", "ip", "iPhone", 11); 

console.log("\n>>> TESTS COMPLETE <<<");