const sharp = require('sharp');
const fs = require('fs');

const svg = fs.readFileSync('/home/ubuntu/.openclaw/workspace/awakenpc/site/src/app/apple-icon.svg');

sharp(svg, { density: 600 })
  .resize(1024, 1024)
  .png()
  .toFile('/home/ubuntu/.openclaw/workspace/awakenpc/tiktok-profile.png')
  .then(info => console.log('Done:', info))
  .catch(err => console.error(err));
