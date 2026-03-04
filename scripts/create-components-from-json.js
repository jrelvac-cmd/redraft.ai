/**
 * Create component files from components-extracted.json
 * Run: node scripts/create-components-from-json.js
 */
const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "..", "components-extracted.json");
const components = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

const typeToFolder = {
  Pricing: "components/skeletons/pricing",
  Footers: "components/skeletons/footer",
  Features: "components/skeletons/features",
  CTA: "components/skeletons/cta",
  STATS: "components/skeletons/stats",
  Bouton: "components/skeletons/button",
  Testimonials: "components/skeletons/testimonials",
  Users: "components/skeletons/users",
  FAQ: "components/skeletons/faq",
  Calendar: "components/ui/calendar",
  Inputs: "components/skeletons/inputs",
  Table: "components/skeletons/table",
};

function toPascalCase(str) {
  return str
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}

let created = 0;
let errors = [];

for (const comp of components) {
  const folder = typeToFolder[comp.type] || `components/skeletons/${comp.type.toLowerCase()}`;
  const dirPath = path.join(__dirname, "..", folder);
  const fileName = `${comp.name}.tsx`;
  const filePath = path.join(dirPath, fileName);

  let code = comp.code;

  if (!code || code.length < 20) {
    errors.push(`${comp.type}/${comp.name}: code too short or empty`);
    continue;
  }

  if (!code.includes("export ")) {
    const firstExport = code.match(/(export\s+(const|function|default))/);
    if (!firstExport) {
      const firstFunc = code.match(/((?:const|function)\s+\w+\s*[=\(])/);
      if (firstFunc) {
        code = "export " + code.trimStart();
      }
    }
  }

  code = code.replace(/from ""react""/g, 'from "react"');
  code = code.replace(/from ""@\/lib\/utils""/g, 'from "@/lib/utils"');
  code = code.replace(/from ""@\/components\/ui\//g, 'from "@/components/ui/');
  code = code.replace(/from ""lucide-react""/g, 'from "lucide-react"');
  code = code.replace(/from ""framer-motion""/g, 'from "framer-motion"');
  code = code.replace(/from ""motion""/g, 'from "motion"');
  code = code.replace(/from ""@number-flow\/react""/g, 'from "@number-flow/react"');
  code = code.replace(/""/g, '"');

  try {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(filePath, code, "utf-8");
    created++;
    console.log(`Created: ${folder}/${fileName}`);
  } catch (err) {
    errors.push(`${comp.type}/${comp.name}: ${err.message}`);
  }
}

console.log(`\nCreated ${created} component files.`);
if (errors.length > 0) {
  console.log(`\nErrors (${errors.length}):`);
  errors.forEach((e) => console.log(`  - ${e}`));
}
