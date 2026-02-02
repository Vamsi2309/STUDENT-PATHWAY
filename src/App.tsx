import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { SubjectDetail } from './pages/SubjectDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subject/:name" element={<SubjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
