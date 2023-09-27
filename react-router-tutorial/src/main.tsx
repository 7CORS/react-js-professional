import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Expenses from './routes/Expenses';
import Invoices from './routes/Invoices';
import NotFound from './routes/NotFound';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<App />} >
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />

        {/* The "No Match" route should be the last */}
        <Route path="*" element={<NotFound />} />
      </Route>

    </Routes>
  </BrowserRouter>
)