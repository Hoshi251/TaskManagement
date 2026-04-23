import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardListPage />} />
        <Route path="/boards/:id" element={<BoardDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
