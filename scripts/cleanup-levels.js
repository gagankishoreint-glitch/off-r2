const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/lib/company-data.ts');
const fileContent = fs.readFileSync(filePath, 'utf8');

const INVALID_LEVELS = new Set([
    'Principal',
    'Manager',
    'Director',
    'Executive',
    'Project Manager',
    'Chief',
    'DGM',
    'Senior General Manager',
    'E1 (Executive)',
    'ET (Executive Trainee)',
    'ET'
]);

// Log logic
console.log('Cleaning levels...');

// Regex to find levels: [...]
// Handles single line and multi-line (simple)
const newContent = fileContent.replace(/levels:\s*\[([\s\S]*?)\]/g, (match, content) => {
    // strict match for levels: [...]

    // Parse the inner content
    // pattern: 'String' or "String"
    let items = content.split(',').map(s => s.trim()).filter(s => s);

    // Filter items
    const validItems = items.filter(item => {
        const raw = item.replace(/['"]/g, ''); // unquote
        return !INVALID_LEVELS.has(raw);
    });

    return `levels: [${validItems.join(', ')}]`;
});

fs.writeFileSync(filePath, newContent);
console.log('Done.');
