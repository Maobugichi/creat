import sharp from 'sharp';
import { readdirSync, existsSync, statSync } from 'fs';
import { join, basename, extname } from 'path';

// ✅ Map of icon names to their largest displayed size
const sizes = {
  'trophy': 288,
  'clock': 288,
  'heart': 288,
  'rocket': 384,
  'setting': 384,
  'target': 288,
  'painting': 288,
  'brush': 288,
  'notify': 288,
};

// ✅ Adjust this to match your project structure
const assetsDir = './src/assets';  // or './src/assets' or './public/assets'

// Recursively find all image files
function findImages(dir) {
  const files = [];
  
  if (!existsSync(dir)) {
    console.error(`❌ Directory ${dir} does not exist`);
    console.log('💡 Try one of these paths:');
    console.log('   - ./src/assets');
    console.log('   - ./public/assets');
    return files;
  }
  
  const entries = readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...findImages(fullPath));
    } else if (/\.(webp|avif|png|jpg|jpeg)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function resizeImages() {
  console.log('🔍 Searching for images in:', assetsDir, '\n');
  
  const files = findImages(assetsDir);
  
  if (files.length === 0) {
    console.log('❌ No images found. Check the assetsDir path in the script.');
    return;
  }
  
  console.log(`✅ Found ${files.length} images to process\n`);
  
  let processed = 0;
  let skipped = 0;
  
  for (const file of files) {
    const name = basename(file, extname(file));
    
    // Find which size category this image belongs to
    const sizeKey = Object.keys(sizes).find(key => 
      name.toLowerCase().includes(key.toLowerCase())
    );
    
    if (!sizeKey) {
      console.log(`⏭️  Skipping ${name} (no size mapping)`);
      skipped++;
      continue;
    }
    
    const targetSize = sizes[sizeKey];
    const ext = extname(file);
    const outputFile = file.replace(ext, `-optimized${ext}`);
    
    try {
      const metadata = await sharp(file).metadata();
      
      // Skip if already smaller than target
      if (metadata.width <= targetSize && metadata.height <= targetSize) {
        console.log(`✅ ${name} already optimal (${metadata.width}×${metadata.height})`);
        skipped++;
        continue;
      }
      
      // Resize and optimize
      await sharp(file)
        .resize(targetSize, targetSize, {
          fit: 'cover',
          position: 'center',
        })
        .toFile(outputFile);
      
      const stats = statSync(file);
      const newStats = statSync(outputFile);
      const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
      
      console.log(`✨ Resized ${name}`);
      console.log(`   ${metadata.width}×${metadata.height} → ${targetSize}×${targetSize}`);
      console.log(`   ${(stats.size / 1024).toFixed(1)}KB → ${(newStats.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
      console.log(`   Output: ${outputFile}\n`);
      
      processed++;
      
    } catch (error) {
      console.error(`❌ Error processing ${name}:`, error.message);
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Processed: ${processed}`);
  console.log(`   Skipped: ${skipped}`);
  
  if (processed > 0) {
    console.log('\n✅ Done! Next steps:');
    console.log('   1. Review the -optimized files');
    console.log('   2. Replace originals:');
    console.log('      • Windows: Get-ChildItem -Recurse -Filter "*-optimized.*" | ForEach { mv $_.FullName ($_.FullName -replace "-optimized","") -Force }');
    console.log('      • Mac/Linux: find assets -name "*-optimized.*" -exec sh -c \'mv "$1" "${1/-optimized/}"\' _ {} \\;');
    console.log('   3. npm run build');
  }
}

resizeImages().catch(console.error);
