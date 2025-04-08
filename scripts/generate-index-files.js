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
      const indexPath = path.join(parentDir, `${dirent.name}/index.js`);

      if (!fs.existsSync(indexPath)) return;

      let indexContent = `export * from './${path.basename(fullPath)}/index';\n`;

      // Check if index file has default export
      const fileContent = fs.readFileSync(indexPath, 'utf-8');
      console.dir({indexPath, fileContent});
      if (fileContent.includes('export default')) {
        indexContent += `\nimport DefaultExport from './${path.basename(fullPath)}/index';\n`;
        indexContent += `export default DefaultExport;\n`;
      }

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
