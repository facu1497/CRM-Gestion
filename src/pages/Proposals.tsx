import { useState, useEffect } from 'react';
import { MOCK_DATA } from '../data';
import { Plus, X, Save, Briefcase } from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  client_id: string;
  influencer_id: string;
  provider_id: string;
  budget: number;
  commission_rate: number;
  status: string;
  date: string;
}

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [clients, setClients] = useState(MOCK_DATA.clients);
  const [influencers, setInfluencers] = useState(MOCK_DATA.influencers);
  const [providers, setProviders] = useState(MOCK_DATA.providers);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    client_id: '',
    influencer_id: '',
    provider_id: '',
    budget: 0,
    status: 'Pendiente'
  });

  // Cargar todos los datos para las relaciones
  useEffect(() => {
    const savedP = localStorage.getItem('crm_proposals');
    const savedC = localStorage.getItem('crm_clients');
    const savedI = localStorage.getItem('crm_influencers');
    const savedPr = localStorage.getItem('crm_providers');

    if (savedP) setProposals(JSON.parse(savedP));
    else setProposals(MOCK_DATA.proposals);

    if (savedC) setClients(JSON.parse(savedC));
    if (savedI) setInfluencers(JSON.parse(savedI));
    if (savedPr) setProviders(JSON.parse(savedPr));
    
    // Set default client if available
    const initialClients = savedC ? JSON.parse(savedC) : MOCK_DATA.clients;
    if (initialClients.length > 0) {
      setNewProposal(prev => ({ ...prev, client_id: initialClients[0].id }));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const proposal: Proposal = {
      ...newProposal,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      commission_rate: 0.15 // Default 15%
    };
    const updated = [proposal, ...proposals];
    setProposals(updated);
    localStorage.setItem('crm_proposals', JSON.stringify(updated));
    setIsModalOpen(false);
    setNewProposal({ title: '', client_id: clients[0]?.id || '', influencer_id: '', provider_id: '', budget: 0, status: 'Pendiente' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-dark)', borderRadius: '8px', color: 'var(--accent-neon)' }}>
            <Briefcase size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>PROPUESTAS</h2>
            <p style={{ color: 'var(--text-muted)' }}>Gestión de acciones e intermediación</p>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          NUEVA PROPUESTA
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {proposals.map((p) => {
          const client = clients.find(c => c.id === p.client_id);
          const influencer = influencers.find(i => i.id === p.influencer_id);
          const provider = providers.find(pr => pr.id === p.provider_id);

          return (
            <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{p.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
                    <span>Fecha: {p.date}</span>
                    <span>•</span>
                    <span>Monto Total: <strong className="mono" style={{color: 'var(--text-main)'}}>${p.budget.toLocaleString()}</strong></span>
                    <span>•</span>
                    <span className="neon-text">Comisión: <strong className="mono">${(p.budget * (p.commission_rate || 0.15)).toLocaleString()}</strong></span>
                  </div>
                </div>
                <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '999px', 
                        fontSize: '0.875rem',
                        backgroundColor: p.status === 'En curso' ? 'rgba(227, 255, 0, 0.1)' : p.status === 'Finalizado' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                        color: p.status === 'En curso' ? 'var(--accent-neon)' : 'var(--text-muted)',
                        border: p.status === 'Pendiente' ? '1px solid var(--border-color)' : 'none'
                      }}>
                  {p.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', backgroundColor: 'var(--bg-dark)', padding: '1rem', borderRadius: '4px' }}>
                <div>
                  <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>CLIENTE</div>
                  <div style={{ fontWeight: 500 }}>{client?.name || 'No encontrado'}</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>INFLUENCER ASIGNADO</div>
                  <div style={{ fontWeight: 500 }}>{influencer ? influencer.name : 'No asignado'}</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>PROVEEDOR CONTENIDO</div>
                  <div style={{ fontWeight: 500 }}>{provider ? provider.name : 'No asignado'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Editar</button>
                <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Ver Detalle</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>NUEVA PROPUESTA</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TÍTULO DE LA ACCIÓN</label>
                <input required value={newProposal.title} onChange={e => setNewProposal({...newProposal, title: e.target.value})} type="text" placeholder="Ej: Campaña Verano 2026" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CLIENTE</label>
                  <select required value={newProposal.client_id} onChange={e => setNewProposal({...newProposal, client_id: e.target.value})} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }}>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PRESUPUESTO ($)</label>
                  <input required value={newProposal.budget} onChange={e => setNewProposal({...newProposal, budget: parseInt(e.target.value) || 0})} type="number" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }} />
                </div>
              </div>

              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>INFLUENCER</label>
                <select value={newProposal.influencer_id} onChange={e => setNewProposal({...newProposal, influencer_id: e.target.value})} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }}>
                  <option value="">No asignar aún</option>
                  {influencers.map(i => <option key={i.id} value={i.id}>{i.name} ({i.niche})</option>)}
                </select>
              </div>

              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PROVEEDOR CONTENIDO</label>
                <select value={newProposal.provider_id} onChange={e => setNewProposal({...newProposal, provider_id: e.target.value})} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }}>
                  <option value="">No asignar aún</option>
                  {providers.map(p => <option key={p.id} value={p.id}>{p.name} ({p.service})</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline" style={{ flex: 1 }}>CANCELAR</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Save size={18} />GUARDAR CAMPAÑA</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
