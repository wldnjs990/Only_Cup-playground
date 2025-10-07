import { Route, Routes } from 'react-router';
import FormTest from './pages/form-test';
import PdfTest from './pages/pdf-test';
import Layout from './layouts/Layout';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<FormTest />}></Route>
      </Route>
      <Route path="/pdf/:pdfIdx" element={<PdfTest />}></Route>
    </Routes>
  );
}
