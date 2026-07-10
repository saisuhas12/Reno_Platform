const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\saisu\\.gemini\\antigravity-ide\\brain\\9e077592-423c-4ba8-b0d8-2f16bd3571e4\\noticeboard_favicon_1783705470661.png";
const destPng = path.join(__dirname, "..", "public", "favicon.png");
const destIco = path.join(__dirname, "..", "public", "favicon.ico");

try {
  fs.copyFileSync(src, destPng);
  console.log("Copied to public/favicon.png");
  fs.copyFileSync(src, destIco);
  console.log("Copied to public/favicon.ico");
} catch (err) {
  console.error("Error copying file:", err);
}
