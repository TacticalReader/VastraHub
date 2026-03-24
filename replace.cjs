const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('D:/web_projects_completed/Vastrahub/src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let orig = content;
  
  // 1. src="/assets/..." -> src={import.meta.env.BASE_URL + 'assets/...'}
  content = content.replace(/src="\/assets\/([^"]+)"/g, "src={import.meta.env.BASE_URL + 'assets/$1'}");
  
  // 2. 'url(/assets/...)' -> `url(${import.meta.env.BASE_URL}assets/...)`
  content = content.replace(/'url\(\/assets\/([^)]+)\)'/g, "`url(\\${import.meta.env.BASE_URL}assets/$1)`");
  
  // 3. '/assets/...' -> import.meta.env.BASE_URL + 'assets/...'
  content = content.replace(/'\/assets\/([^']+)'/g, "import.meta.env.BASE_URL + 'assets/$1'");
  
  if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + path.basename(file));
  }
});
