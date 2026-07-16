const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace .map((log, i) =>
      content = content.replace(/\.map\(\(([^,:)]+),\s*([^,:)]+)\)\s*=>/g, '.map(( $1: any, $2: any ) =>');
      // Replace .map(m =>
      content = content.replace(/\.map\(([^(),:]+)\s*=>/g, '.map(( $1: any ) =>');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDirectory(path.join(__dirname, 'app'));
console.log('Fixed implicit any map functions');
