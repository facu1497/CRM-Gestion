import { MOCK_DATA } from '../data';
import { Plus, UserSquare2, TrendingUp } from 'lucide-react';

export default function Influencers() {
  const influencers = MOCK_DATA.influencers;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>INFLUENCERS</h2>
          <p style={{ color: 'var(--text-muted)' }}>Carpeta de influencers subcontratados</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          NUEVO INFLUENCER
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {influencers.map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ padding: '1rem', backgroundColor: 'rgba(227, 255, 0, 0.1)', borderRadius: '50%', color: 'var(--accent-neon)' }}>
                 <UserSquare2 size={24} />
               </div>
               <div>
                 <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{p.name}</h3>
                 <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.niche.toUpperCase()}</span>
               </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', color: 'var(--text-main)', fontSize: '0.875rem' }}>
              <TrendingUp size={16} color="var(--accent-neon)" />
              <strong>{p.followers.toLocaleString()}</strong> <span style={{ color: 'var(--text-muted)'}}>Seguidores</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button className="btn-outline" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Perfil Completo</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
