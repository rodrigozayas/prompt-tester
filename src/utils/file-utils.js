import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function writeResultHtml({ results, successCount, total }) {
    const rows = results.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${r.parameters.map(p => `{ ${p} }`).join(', ')}</td>
      <td><pre>${escapeHTML(r.promptTemplate)}</pre></td>
      <td><pre>${escapeHTML(r.response)}</pre></td>
      <td><pre>${r.expected ? escapeHTML(r.expected) : '-'}</pre></td>
      <td class="${r.match === null ? 'neutral' : r.match ? 'success' : 'fail'}">
        ${r.match === null ? 'N/A' : r.match ? '✅' : '❌'}
      </td>
    </tr>
  `).join('');

    const templatePath = path.join(__dirname, '../templates/result-template.html');
    const templateContent = await fs.readFile(templatePath, 'utf-8');

    const finalHtml = templateContent
        .replace('{{rows}}', rows)
        .replace('{{successCount}}', successCount)
        .replace('{{total}}', total);

    await fs.writeFile(path.join(__dirname, '../output/results.html'), finalHtml);
}

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br>");
}
