import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import './index.css';
import { StrictMode } from 'react';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
