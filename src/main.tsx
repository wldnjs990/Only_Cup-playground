import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';

// 로컬에 docList 만들어주기
if (!localStorage.getItem('docList')) localStorage.setItem('docList', '[]');

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </StrictMode>,
);
