import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Users, X, Save, Loader2 } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  type: string;
  contact: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', type: 'Restaurant', contact: '' });

  // Cargar datos de Supabase
  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clients:', error);
    } else {
      setClients(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('clients')
      .insert([newClient]);

    if (error) {
      alert('Error guardando cliente: ' + error.message);
    } else {
      setIsModalOpen(false);
      setNewClient({ name: '', type: 'Restaurant', contact: '' });
      fetchClients();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>CLIENTES</h2>
          <p style={{ color: 'var(--text-muted)' }}>Directorio de marcas y negocios</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={20} />
          NUEVO CLIENTE
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
          <Loader2 className="animate-spin" size={48} color="var(--accent-neon)" />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {clients.length === 0 && (
            <div className="card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No hay clientes registrados aún. ¡Crea el primero!
            </div>
          )}
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
                <strong>Contacto:</strong> {p.contact || 'No especificado'}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button className="btn-outline" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal ... (mismo código) ... */}
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
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>AGREGAR CLIENTE</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>NOMBRE DE MARCA</label>
                <input required value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} type="text" placeholder="Ej: Starbucks" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }} />
              </div>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TIPO</label>
                <select value={newClient.type} onChange={e => setNewClient({...newClient, type: e.target.value})} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }}>
                  <option value="Restaurant">Restaurante</option>
                  <option value="Cafe">Café</option>
                  <option value="Brand">Marca / Retail</option>
                  <option value="Services">Servicios</option>
                </select>
              </div>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>EMAIL / CONTACTO</label>
                <input value={newClient.contact} onChange={e => setNewClient({...newClient, contact: e.target.value})} type="email" placeholder="contacto@marca.com" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline" style={{ flex: 1 }}>CANCELAR</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Save size={18} />GUARDAR</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
