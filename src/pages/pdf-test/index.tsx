// src/pages/PdfPage.tsx
import { useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';

// pdf.js 기반 리액트 뷰어
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PdfDocument from './components/PdfDocument';
import DownloadButton from './components/DownloadButton';
import { useParams } from 'react-router';

export default function PdfTest() {
  const [url, setUrl] = useState<string | null>(null);
  // pdf 뷰어 레이아웃 제공해주는 플러그인 사용(우리가 흔히 보는 pdf 뷰어 도구 그거임)
  const layout = defaultLayoutPlugin();
  const { pdfIdx } = useParams();

  useEffect(() => {
    const local = localStorage.getItem('docList');
    // 테스트용 마지막 doc만 꺼내서 쓰기
    const docList: EvaluationRoot[] = local ? JSON.parse(local) : [];
    const pdfDoc: EvaluationRoot | null = docList.length ? docList[Number(pdfIdx)] : null;
    // react-pdf-renderer로 제작한 pdf document 양식 blob url로 변환
    pdfDoc &&
      (async () => {
        // react-pdf/renderer로 Blob 생성
        const blob = await pdf(<PdfDocument pdfDoc={pdfDoc} />).toBlob();
        // Blob → Object URL로 변환해서 저장
        setUrl(URL.createObjectURL(blob));
      })();
  }, []);

  if (!url) return <div style={{ padding: 16 }}>PDF 생성 중…</div>;

  return (
    <div style={{ height: '100vh' }}>
      {/* 워커 파일 경로: public/pdfjs/ 또는 vite-plugin-static-copy 결과 경로 */}
      <Worker workerUrl={`/pdfjs/pdf.worker.min.js`}>
        {/* Viewer에 제작한 pdf의 url을 집어넣으면 pdf 뷰어가 생성됨 */}
        {/* 추가로 plugins에 @react-pdf-viewer/default-layout 플러그인을 추가로 설치해 pdf 뷰어 레이아웃을 가져와 붙였음(이건 선택사항)*/}
        <Viewer fileUrl={url} plugins={[layout]} />
      </Worker>

      {/* 동일 Blob URL로 다운로드도 쉽게 */}
      <DownloadButton
        title="PDF 다운받기"
        onClick={() => {
          window.open(url, '_blank', 'noopener'); // 새 탭에서 iOS 공유 버튼 사용
        }}
        className="absolute bottom-10 left-1/2 -translate-1/2 px-12 py-7 text-lg"
      />
    </div>
  );
}
