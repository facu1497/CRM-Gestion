import { Users, DollarSign, Activity, FileText } from 'lucide-react';
import { MOCK_DATA } from '../data';

export default function Dashboard() {
  const totalBudget = MOCK_DATA.proposals.reduce((sum, p) => sum + p.budget, 0);
  const totalCommission = MOCK_DATA.proposals.reduce((sum, p) => sum + (p.budget * p.commission_rate), 0);
  
  const activeProposals = MOCK_DATA.proposals.filter(p => p.status === 'En curso').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>DASHBOARD</h2>
          <p style={{ color: 'var(--text-muted)' }}>Métricas principales de la agencia</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-dark)', borderRadius: '4px', color: 'var(--accent-neon)' }}>
              <DollarSign size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Comisiones Totales</h3>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>${totalCommission.toLocaleString()}</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-dark)', borderRadius: '4px', color: 'var(--accent-neon)' }}>
              <Activity size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Propuestas Activas</h3>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{activeProposals}</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-dark)', borderRadius: '4px', color: 'var(--accent-neon)' }}>
              <Users size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Influencers</h3>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{MOCK_DATA.influencers.length}</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-dark)', borderRadius: '4px', color: 'var(--accent-neon)' }}>
              <FileText size={24} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Monto Administrado</h3>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>${totalBudget.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Últimas Propuestas</h3>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--bg-dark)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>TÍTULO</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>CLIENTE</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>ESTADO</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>MONTO</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>COMISIÓN</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DATA.proposals.map((p, i) => {
                const client = MOCK_DATA.clients.find(c => c.id === p.client_id);
                return (
                  <tr key={p.id} style={{ borderTop: i !== 0 ? '1px solid var(--border-color)' : 'none' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{p.title}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{client?.name}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
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
                    </td>
                    <td className="mono" style={{ padding: '1rem 1.5rem' }}>${p.budget.toLocaleString()}</td>
                    <td className="mono" style={{ padding: '1rem 1.5rem', color: 'var(--accent-neon)' }}>${(p.budget * p.commission_rate).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
