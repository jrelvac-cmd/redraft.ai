const fs = require("fs");
const path = require("path");

const dirs = [
  "components/skeletons",
  "components/ui/calendar",
];

let fixed = 0;
for (const dir of dirs) {
  const fullPath = path.join(__dirname, "..", dir);
  if (!fs.existsSync(fullPath)) continue;
  const walk = (d) => {
    const items = fs.readdirSync(d, { withFileTypes: true });
    for (const item of items) {
      const p = path.join(d, item.name);
      if (item.isDirectory()) walk(p);
      else if (item.name.endsWith(".tsx")) {
        let content = fs.readFileSync(p, "utf-8");
        const demoIdx = content.search(/\n\s*demo\.tsx\s*\n/);
        if (demoIdx > 0) {
          content = content.substring(0, demoIdx).trimEnd();
          fs.writeFileSync(p, content + "\n", "utf-8");
          fixed++;
          console.log(`Removed demo from: ${path.relative(path.join(__dirname, ".."), p)}`);
        }
      }
    }
  };
  walk(fullPath);
}
console.log(`\nFixed ${fixed} files`);
