import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // vite-static-copy : 빌드시 특정 파일을 복사해서 원하는 경로에 넣어주는 vite의 서드파티 플러그인
    // 프로젝트 빌드시 pdf.js가 의존해야 하는 pdf.worker.min.js파일을 dist 파일에 절대경로로 탐색할 수 있도록 생성해주는 용도로 사용
    viteStaticCopy({
      targets: [
        {
          // node_modules 안의 워커 파일을 복사
          src: 'node_modules/pdfjs-dist/build/pdf.worker.min.js',
          dest: 'pdfjs',
          // => 결과: dist/pdfjs/pdf.worker.min.js
          // dev 서버에서도 /pdfjs/pdf.worker.min.js 로 접근 가능
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
