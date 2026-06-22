import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/public/Home'; // 1. Import your brand new Home view
import SubmitComplaint from './pages/public/SubmitComplaint';
import AdminDashboard from './pages/admin/AdminDashboard'; 
import TransparencyBoard from './pages/public/TransparencyBoard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Student Routing Group wrapped in Public Modern Layout */}
        <Route element={<PublicLayout />}>
          {/* 2. Set the brand new explicit Home component right here */}
          <Route path="/" element={<Home />} /> 
          <Route path="/submit-complaint" element={<SubmitComplaint />} />
        </Route>
        
        {/* Admin Infrastructure */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path='/transparency' element={<TransparencyBoard/>}></Route>
      </Routes>
    </Router>
  );
}