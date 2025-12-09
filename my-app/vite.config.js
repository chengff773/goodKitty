import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig((command, mode) => {
  // 获取环境变量 todo根据环境加载不同的配置文件
  // const env = loadEnv(mode, process.cwd(), '');
  // const isProduction = mode === 'production'
  // const isDevelopment = mode === 'development'
  // const isStaging = mode === 'staging'

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false, // 生产环境关闭
      minify: 'terser', // 启用压缩
      terserOptions: {
        compress: {
          drop_console: true, // 移除 console
          drop_debugger: true // 移除 debugger
        }
      },
      rollupOptions: {
        output: {
          // 代码分割
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['antd'] // UI 库
          }
        }
      },
      chunkSizeWarningLimit: 1000 // 提高警告限制
    },
    css: {
      preprocessorOptions: {
        less: {
            javascriptEnabled: true,
        },
      }
    },
    resolve: {
      alias: {
        '@': '/src'
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      cors: true
    },
    // 代理 API 请求
    // proxy: {
    //   '/api': {
    //     target: 'http://8.141.119.102:8000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  };
})
