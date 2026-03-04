const fs = require("fs");
const path = require("path");

const dirs = [
  "components/skeletons/button",
  "components/skeletons/cta",
  "components/skeletons/faq",
  "components/skeletons/features",
  "components/skeletons/footer",
  "components/skeletons/inputs",
  "components/skeletons/pricing",
  "components/skeletons/stats",
  "components/skeletons/table",
  "components/skeletons/testimonials",
  "components/skeletons/users",
  "components/ui/calendar",
];

let fixed = 0;
for (const dir of dirs) {
  const fullPath = path.join(__dirname, "..", dir);
  if (!fs.existsSync(fullPath)) continue;
  const files = fs.readdirSync(fullPath).filter((f) => f.endsWith(".tsx"));
  for (const file of files) {
    const filePath = path.join(fullPath, file);
    let content = fs.readFileSync(filePath, "utf-8");
    const firstLine = content.split("\n")[0]?.trim();
    if (firstLine && firstLine.endsWith(".tsx") && firstLine.length < 60 && !firstLine.includes(" ")) {
      content = content.replace(new RegExp(`^${firstLine.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\n`), "");
      fs.writeFileSync(filePath, content, "utf-8");
      fixed++;
      console.log(`Fixed: ${dir}/${file}`);
    }
  }
}
console.log(`\nFixed ${fixed} files`);
