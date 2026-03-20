import { MOCK_DATA } from '../data';
import { Plus } from 'lucide-react';

export default function Proposals() {
  const proposals = MOCK_DATA.proposals;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>PROPUESTAS</h2>
          <p style={{ color: 'var(--text-muted)' }}>Gestión de acciones e intermediación</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          NUEVA PROPUESTA
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {proposals.map((p) => {
          const client = MOCK_DATA.clients.find(c => c.id === p.client_id);
          const influencer = MOCK_DATA.influencers.find(i => i.id === p.influencer_id);
          const provider = MOCK_DATA.providers.find(pr => pr.id === p.provider_id);

          return (
            <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{p.title}</h3>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <span>Fecha: {p.date}</span>
                    <span>•</span>
                    <span>Monto Total: <strong className="mono" style={{color: 'var(--text-main)'}}>${p.budget.toLocaleString()}</strong></span>
                    <span>•</span>
                    <span className="neon-text">Comisión: <strong className="mono">${(p.budget * p.commission_rate).toLocaleString()}</strong></span>
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
                  <div style={{ fontWeight: 500 }}>{client?.name} <span style={{color: 'var(--text-muted)', fontSize: '0.875rem'}}>({client?.type})</span></div>
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
    </div>
  );
}
