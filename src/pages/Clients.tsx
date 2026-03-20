import { MOCK_DATA } from '../data';
import { Plus, Users } from 'lucide-react';

export default function Clients() {
  const clients = MOCK_DATA.clients;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>CLIENTES</h2>
          <p style={{ color: 'var(--text-muted)' }}>Directorio de marcas y negocios</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} />
          NUEVO CLIENTE
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {clients.map(p => (
          <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
               <div style={{ padding: '1rem', backgroundColor: 'var(--bg-dark)', borderRadius: '50%', color: 'var(--accent-neon)' }}>
                 <Users size={24} />
               </div>
               <div>
                 <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{p.name}</h3>
                 <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.type.toUpperCase()}</span>
               </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <strong>Contacto:</strong> {p.contact}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button className="btn-outline" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
