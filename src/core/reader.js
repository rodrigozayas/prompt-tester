import fs from 'fs/promises';

export async function readEntries() {
    const content = await fs.readFile('./input.json', 'utf-8');
    return JSON.parse(content);
}
