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

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generatePdfHtml() {
  const projectRoot = process.cwd();
  const allFiles = getAllFiles(projectRoot);
  
  let htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MGL Digital AI - Proje Dosyaları</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
        }
        h3 {
            color: #7f8c8d;
            background: #ecf0f1;
            padding: 10px;
            border-left: 4px solid #3498db;
            margin-top: 25px;
        }
        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            font-size: 12px;
            line-height: 1.4;
        }
        .file-list {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .file-list ul {
            columns: 2;
            column-gap: 30px;
        }
        .stats {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #27ae60;
            margin: 20px 0;
        }
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 MGL Digital AI - Proje Dosyaları</h1>
        
        <div class="stats">
            <strong>📊 Proje İstatistikleri:</strong><br>
            • Toplam Dosya Sayısı: ${allFiles.length}<br>
            • Oluşturulma Tarihi: ${new Date().toLocaleString('tr-TR')}<br>
            • Proje Türü: React + TypeScript + Supabase + Stripe
        </div>

        <h2>📁 Proje Yapısı</h2>
        <div class="file-list">
            <ul>`;

  allFiles.forEach(file => {
    const relativePath = path.relative(projectRoot, file);
    htmlContent += `<li>${relativePath}</li>`;
  });

  htmlContent += `</ul>
        </div>

        <h2>📄 Dosya İçerikleri</h2>`;

  allFiles.forEach(file => {
    const relativePath = path.relative(projectRoot, file);
    const content = fs.readFileSync(file, 'utf8');
    const extension = path.extname(file).substring(1);
    
    htmlContent += `
        <h3>📄 ${relativePath}</h3>
        <pre><code>${escapeHtml(content)}</code></pre>`;
  });

  htmlContent += `
    </div>
</body>
</html>`;

  fs.writeFileSync('mgl-digital-ai-project.html', htmlContent);
  console.log('✅ HTML dosyası oluşturuldu: mgl-digital-ai-project.html');
  console.log('🖨️  Bu dosyayı tarayıcıda açıp "PDF olarak yazdır" seçeneğini kullanabilirsiniz');
  console.log(`📊 Toplam ${allFiles.length} dosya işlendi`);
}

generatePdfHtml();