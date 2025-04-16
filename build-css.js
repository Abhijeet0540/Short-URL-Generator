import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import tailwindcssPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input and output file paths
const inputFile = path.join(__dirname, 'public/css/styles.css');
const outputFile = path.join(__dirname, 'public/css/output.css');

// Ensure the output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the input CSS file
const css = fs.readFileSync(inputFile, 'utf8');

// Process the CSS with PostCSS, Tailwind, and Autoprefixer
async function processCss() {
  try {
    const result = await postcss([
      tailwindcssPlugin,
      autoprefixer,
    ]).process(css, {
      from: inputFile,
      to: outputFile,
    });

    // Write the processed CSS to the output file
    fs.writeFileSync(outputFile, result.css);
    console.log('CSS processed successfully!');
  } catch (error) {
    console.error('Error processing CSS:', error);
  }
}

processCss();
