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

// Run for both core and react
['core', 'react'].forEach(pkg => {
  createIndexFiles(path.join(__dirname, '..', 'dist', pkg));
});
