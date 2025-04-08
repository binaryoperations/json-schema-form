// scripts/generate-index-files.js
const fs = require('fs');
const path = require('path');



const createIndexFiles = (directory) => {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(directory, dirent.name);

    if (dirent.isDirectory()) {
      // Recursively process subdirectories
      createIndexFiles(fullPath);


      // Create parent-level index file
      const parentDir = path.dirname(fullPath);
      const indexContent = `export * from './${path.basename(fullPath)}/index';\n`;

      if (!fs.existsSync(path.join(parentDir, `${dirent.name}/index.js`))) return;

      fs.writeFileSync(
        path.join(parentDir, `${dirent.name}.js`),
        indexContent
      );

      fs.writeFileSync(
        path.join(parentDir, `${dirent.name}.d.ts`),
        indexContent
      );
    }
  });
};

// Parse command-line arguments
const args = process.argv.slice(2);
const fileArgIndex = args.indexOf('--dir');
const fileName = fileArgIndex !== -1 && args[fileArgIndex + 1] ? args[fileArgIndex + 1] : null;

if (!fileName) {
  console.error('Error: --dir argument is required.');
  process.exit(1);
}

// Run for both core and react
createIndexFiles(path.resolve(fileName));
