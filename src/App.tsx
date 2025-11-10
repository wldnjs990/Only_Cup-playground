import { Route, Routes } from 'react-router';
import FormTest from './pages/form-test';
import PdfTest from './pages/pdf-test';
import Layout from './layouts/Layout';
import NewFormTest from './pages/new-form-test';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<FormTest />}></Route>
        <Route path="/new" element={<NewFormTest />}></Route>
      </Route>
      <Route path="/pdf/:pdfIdx" element={<PdfTest />}></Route>
    </Routes>
  );
}
