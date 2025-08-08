import * as azureOpenAI from '../providers/azure-openai.js';

const PROVIDERS = {
    azure: azureOpenAI,
};

export function getProvider(name) {
    return PROVIDERS[name];
}
