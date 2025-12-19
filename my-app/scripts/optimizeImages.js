/**
 * @file 图片优化
 * @author chengfangfang
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname);

async function optimizeImages() {
    const imagePath = path.resolve(dirname, '../src/assets/images');
    const files = await fs.readdirSync(imagePath);

    for (const file of files) {
        if (/\.(jpeg|png|jpg)/.test(file)) {
            const inputPath = path.resolve(imagePath, file);
            const outputPath = path.resolve(imagePath, `${file.split('.')[0]}.webp`);
            await Promise.all([
                sharp(inputPath)
                    .webp({
                        quality: 80,
                        lossless: false
                    })
                    .toFile(outputPath),
                sharp(inputPath)
                    .avif({
                        quality: 50, // 质量：50-80足够
                        effort: 4, // 压缩努力：0-9，4是良好平衡
                        chromaSubsampling: '4:4:4', // 保持色度采样
                    })
                    .toFile(path.resolve(imagePath, `${file.split('.')[0]}.avif`))
            ]);
            console.log(`优化图片: ${file} -> ${path.basename(outputPath)}`);
        }
    }
}

optimizeImages();