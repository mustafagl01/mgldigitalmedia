const fs = require('fs');
const path = require('path');

// Dahil edilecek dosya uzantıları
const includeExtensions = ['.tsx', '.ts', '.js', '.jsx', '.css', '.html', '.json', '.md', '.sql'];

// Hariç tutulacak klasörler
const excludeDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.bolt'];

// Hariç tutulacak dosyalar
const excludeFiles = ['package-lock.json', '.env', '.gitignore'];

function shouldIncludeFile(filePath) {
  const ext = path.extname(filePath);
  const fileName = path.basename(filePath);
  
  return includeExtensions.includes(ext) && !excludeFiles.includes(fileName);
}

function shouldIncludeDir(dirName) {
  return !excludeDirs.includes(dirName) && !dirName.startsWith('.');
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      if (shouldIncludeDir(file)) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      if (shouldIncludeFile(fullPath)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

function combineProject() {
  const projectRoot = process.cwd();
  const allFiles = getAllFiles(projectRoot);
  
  let combinedContent = `# MGL Digital AI - Proje Dosyaları\n\n`;
  combinedContent += `Bu dosya, MGL Digital AI web sitesi projesinin tüm kaynak kodlarını içermektedir.\n\n`;
  combinedContent += `## Proje Yapısı\n\n`;
  
  // Dosya listesi
  allFiles.forEach(file => {
    const relativePath = path.relative(projectRoot, file);
    combinedContent += `- ${relativePath}\n`;
  });
  
  combinedContent += `\n## Dosya İçerikleri\n\n`;
  
  // Her dosyanın içeriği
  allFiles.forEach(file => {
    const relativePath = path.relative(projectRoot, file);
    const content = fs.readFileSync(file, 'utf8');
    
    combinedContent += `### ${relativePath}\n\n`;
    combinedContent += '```' + path.extname(file).substring(1) + '\n';
    combinedContent += content;
    combinedContent += '\n```\n\n';
  });
  
  // Dosyayı kaydet
  fs.writeFileSync('mgl-digital-ai-project.txt', combinedContent);
  console.log('✅ Proje dosyaları başarıyla birleştirildi: mgl-digital-ai-project.txt');
  console.log(`📊 Toplam ${allFiles.length} dosya işlendi`);
}

// Script'i çalıştır
combineProject();