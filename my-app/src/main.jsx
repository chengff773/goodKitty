/**
 * @file 主入口文件
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Entry from './components/entry';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Entry />
    </BrowserRouter>
  </StrictMode>,
)
