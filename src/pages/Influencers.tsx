import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, UserSquare2, TrendingUp, X, Save, Loader2 } from 'lucide-react';

interface Influencer {
  id: string;
  name: string;
  niche: string;
  followers: number;
}

export default function Influencers() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInfluencer, setNewInfluencer] = useState({ name: '', niche: 'LifeStyle', followers: 0 });

  const fetchInfluencers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('influencers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setInfluencers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('influencers').insert([newInfluencer]);

    if (error) alert(error.message);
    else {
      setIsModalOpen(false);
      setNewInfluencer({ name: '', niche: 'LifeStyle', followers: 0 });
      fetchInfluencers();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', margin: 0 }}>INFLUENCERS</h2>
          <p style={{ color: 'var(--text-muted)' }}>Carpeta de influencers subcontratados</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={20} />
          NUEVO INFLUENCER
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
          <Loader2 className="animate-spin" size={48} color="var(--accent-neon)" />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {influencers.length === 0 && (
            <div className="card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No hay influencers registrados.
            </div>
          )}
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
            </div>
          ))}
        </div>
      )}
      {/* Modal ... */}
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
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>AGREGAR INFLUENCER</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>NOMBRE ARTÍSTICO</label>
                <input required value={newInfluencer.name} onChange={e => setNewInfluencer({...newInfluencer, name: e.target.value})} type="text" placeholder="Ej: Influencer Pro" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }} />
              </div>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>NICHO / CATEGORÍA</label>
                <select value={newInfluencer.niche} onChange={e => setNewInfluencer({...newInfluencer, niche: e.target.value})} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }}>
                  <option value="LifeStyle">Lifestyle</option>
                  <option value="Foodie">Foodie</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Tech">Technology</option>
                  <option value="Fitness">Fitness</option>
                </select>
              </div>
              <div>
                <label className="mono" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SEGUIDORES (CANTIDAD)</label>
                <input required value={newInfluencer.followers} onChange={e => setNewInfluencer({...newInfluencer, followers: parseInt(e.target.value) || 0})} type="number" style={{ width: '100%', padding: '0.75rem', backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-main)', outline: 'none' }} />
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
