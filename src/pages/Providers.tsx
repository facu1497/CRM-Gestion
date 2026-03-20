import { useState, useEffect } from 'react';
import { MOCK_DATA } from '../data';
import { Plus, Camera, X, Save } from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  service: string;
}

export default function Providers() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProvider, setNewProvider] = useState({ name: '', service: 'Filmmaker' });

  // Cargar datos iniciales
  useEffect(() => {
    const saved = localStorage.getItem('crm_providers');
    if (saved) {
      setProviders(JSON.parse(saved));
    } else {
      setProviders(MOCK_DATA.providers);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...providers, { ...newProvider, id: Date.now().toString() }];
    setProviders(updated);
    localStorage.setItem('crm_providers', JSON.stringify(updated));
    setIsModalOpen(false);
    setNewProvider({ name: '', service: 'Filmmaker' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>PROVEEDORES</h2>
          <p style={{ color: 'var(--text-muted)' }}>Realizadores y creadores de contenido</p>
        </div>
        <button 
          onClick={() => setIsOpen ? setIsModalOpen(true) : setIsModalOpen(true)} 
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
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

      {/* Modal / Formulario */}
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
          <div className="card" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}
            >
              <X size={24} />
            </button>
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>AGREGAR PROVEEDOR</h3>
            
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>NOMBRE</label>
                <input 
                  required
                  value={newProvider.name}
                  onChange={e => setNewProvider({...newProvider, name: e.target.value})}
                  type="text" 
                  placeholder="Ej: Estudio 44"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-dark)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SERVICIO</label>
                <select 
                  value={newProvider.service}
                  onChange={e => setNewProvider({...newProvider, service: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-dark)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                >
                  <option value="Filmmaker">Filmmaker</option>
                  <option value="Fotógrafo">Fotógrafo</option>
                  <option value="Editor">Editor</option>
                  <option value="Diseñador">Diseñador</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-outline" 
                  style={{ flex: 1 }}
                >
                  CANCELAR
                </button>
                <button 
                  type="submit"
                  className="btn-primary" 
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Save size={18} />
                  GUARDAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
