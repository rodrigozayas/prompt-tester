import { getProvider } from '../config/providers.js';

function formatPrompt(template, params) {
    return params.reduce((acc, p, i) => acc.replace(`{p${i + 1}}`, p), template);
}

export async function runPrompt(entry) {
    const { provider, promptTemplate, parameters } = entry;
    const formatted = formatPrompt(promptTemplate, parameters);
    const client = getProvider(provider);
    return await client.sendPrompt(formatted);
}
