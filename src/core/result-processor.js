export function processResults(results) {
    let successCount = 0;
    const processed = results.map(r => {
        const match = r.expected ? r.response.trim() === r.expected.trim() : null;
        if (match) successCount++;
        return { ...r, match };
    });

    return {
        results: processed,
        successCount,
        total: processed.length,
    };
}
