import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';
import Clients from './pages/Clients';
import Influencers from './pages/Influencers';
import Providers from './pages/Providers';
import AiTest from './pages/AiTest';

function App() {
  return (
    <BrowserRouter basename="/CRM-Gestion">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="clients" element={<Clients />} />
          <Route path="influencers" element={<Influencers />} />
          <Route path="providers" element={<Providers />} />
          <Route path="ai-test" element={<AiTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
