const fs = require("fs");
const path = require("path");

function walk(dir, fn) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const p = path.join(dir, item.name);
    if (item.isDirectory()) walk(p, fn);
    else if (item.name.endsWith(".tsx")) fn(p);
  }
}

let fixed = 0;
walk(path.join(__dirname, "..", "components"), (filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");
  if (/^[a-zA-Z0-9_-]+\.tsx\r?\n/.test(content)) {
    content = content.replace(/^[a-zA-Z0-9_-]+\.tsx\r?\n/, "");
    fs.writeFileSync(filePath, content, "utf-8");
    fixed++;
    console.log(path.relative(path.join(__dirname, ".."), filePath));
  }
});
console.log(`\nFixed ${fixed} files`);
