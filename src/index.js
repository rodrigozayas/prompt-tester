import { readEntries } from './core/reader.js';
import { runPrompt } from './core/prompt-engine.js';
import { processResults } from './core/result-processor.js';
import { writeResultHtml } from './utils/file-utils.js';


(async () => {
    const entries = await readEntries();

    const results = [];
    for (const entry of entries) {
        const response = await runPrompt(entry);
        results.push({ ...entry, response });
    }

    const processed = processResults(results);
    await writeResultHtml(processed);

    console.log(`Test finished with ${processed.successCount}/${processed.total} correct results.`);
})();
