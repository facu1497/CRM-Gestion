import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';
import Clients from './pages/Clients';
import Influencers from './pages/Influencers';
import Providers from './pages/Providers';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="clients" element={<Clients />} />
          <Route path="influencers" element={<Influencers />} />
          <Route path="providers" element={<Providers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
