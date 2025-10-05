import { Route, Routes } from 'react-router';
import FormTest from './pages/form-test';
import PdfTest from './pages/pdf-test';
import Layout from './layouts/Layout';
import FormSkeleton from './pages/gpt-form-skeleton';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<FormTest />}></Route>
        <Route path="/skeleton" element={<FormSkeleton />}></Route>
      </Route>
      <Route path="/pdf" element={<PdfTest />}></Route>
    </Routes>
  );
}
