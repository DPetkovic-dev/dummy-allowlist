const fs = require('fs');
const path = require('path');

// List your source files here
const files = [
  "./contributable_lists/security.txt",
  "./contributable_lists/utilities.txt",
  "./contributable_lists/supervision.txt",
  "./contributable_lists/accessibility.txt",
  "./contributable_lists/productivity.txt",
  "./internal/internal.txt",
];

const outputFile = "main.txt";

async function updateMain() {
  try {
    let content = '';

    for (const file of files) {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        const data = await fs.promises.readFile(filePath, 'utf8');

        // Split file content by lines
        const lines = data.split('\n');

        // Extract only the GUID (part before '//'), trimming whitespace
        const guids = lines
          .map(line => line.split('//')[0].trim())
          .filter(line => line.length > 0); // ignore empty lines

        // Join GUIDs back as lines
        content += guids.join('\n') + '\n';

      } else {
        console.warn(`Warning: ${file} does not exist`);
      }
    }

    await fs.promises.writeFile(path.join(__dirname, outputFile), content, 'utf8');
    console.log(`${outputFile} has been updated.`);
  } catch (err) {
    console.error("Error updating main.txt:", err);
  }
}

updateMain();