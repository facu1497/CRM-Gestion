import { MOCK_DATA } from '../data';
import { Plus, Camera } from 'lucide-react';

export default function Providers() {
  const providers = MOCK_DATA.providers;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>PROVEEDORES</h2>
          <p style={{ color: 'var(--text-muted)' }}>Realizadores y creadores de contenido</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          NUEVO PROVEEDOR
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {providers.map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '50%', color: 'var(--text-main)' }}>
                 <Camera size={24} />
               </div>
               <div>
                 <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{p.name}</h3>
               </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <strong>Servicio:</strong> <span className="neon-text" style={{fontWeight: 600}}>{p.service}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button className="btn-outline" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Ver Tarifario</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
