/**
 * Parse Components CSV and extract components with code
 * Run: node scripts/parse-components-csv.js
 */
const fs = require("fs");
const path = require("path");

const csvPath = path.join(process.env.USERPROFILE || process.env.HOME, "Downloads", "Components - Feuille 1.csv");
const content = fs.readFileSync(csvPath, "utf-8");

// Split by pattern: Type,,,," (new component row)
const componentBlocks = content.split(/\n([A-Za-z]+),,,,"/);
// First element is header "type,nom,role,code,prompt"
componentBlocks.shift();

const components = [];
const typeCount = {};

for (let i = 0; i < componentBlocks.length; i += 2) {
  const type = componentBlocks[i]?.trim();
  const promptBlock = componentBlocks[i + 1] || "";
  
  if (!type) continue;

  // Extract code from ```tsx ... ``` blocks
  const tsxMatch = promptBlock.match(/```tsx\s*\n?([\s\S]*?)```/);
  let code = "";
  let suggestedName = "";

  if (tsxMatch) {
    const codeBlock = tsxMatch[1];
    const firstLine = codeBlock.split("\n")[0]?.trim() || "";
    // First line might be filename like "pricing-interaction.tsx" or "dark-gradient-pricing.tsx"
    if (firstLine.endsWith(".tsx")) {
      suggestedName = firstLine.replace(".tsx", "").replace(/[^a-zA-Z0-9-_]/g, "_");
    }
    code = codeBlock.trim();
  }

  // Also check for code in "code" column - sometimes code is direct
  const directCodeMatch = promptBlock.match(/^""use client""/);
  if (!code && directCodeMatch) {
    // Code might start with "use client" - extract until next component
    const codeStart = promptBlock.indexOf('"use client"');
    const nextBlock = promptBlock.indexOf('\n"[A-Za-z]+,,,,"');
    code = promptBlock.substring(codeStart, nextBlock > 0 ? nextBlock : undefined).trim();
  }

  if (!code) continue;

  typeCount[type] = (typeCount[type] || 0) + 1;
  const index = typeCount[type];
  const baseName = suggestedName || `${type.toLowerCase().replace(/\s/g, "_")}_${String(index).padStart(2, "0")}`;
  let safeName = baseName.replace(/[^a-zA-Z0-9-_]/g, "_");
  const usedNames = new Set(components.map((c) => c.name));
  let finalName = safeName;
  let suffix = 1;
  while (usedNames.has(finalName)) {
    finalName = `${safeName}_${String(++suffix).padStart(2, "0")}`;
  }
  usedNames.add(finalName);

  code = code.replace(/""/g, '"');

  components.push({
    type,
    name: finalName,
    code,
    index: typeCount[type],
  });
}

// Output JSON for processing
const outputPath = path.join(__dirname, "..", "components-extracted.json");
fs.writeFileSync(outputPath, JSON.stringify(components, null, 2), "utf-8");
console.log(`Extracted ${components.length} components to ${outputPath}`);
console.log("Types:", Object.keys(typeCount).join(", "));
components.forEach((c) => console.log(`  - ${c.type}: ${c.name}`));
