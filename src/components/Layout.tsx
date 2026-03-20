import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare2, Briefcase, Camera } from 'lucide-react';

export default function Layout() {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Propuestas', icon: Briefcase, path: '/proposals' },
    { name: 'Clientes', icon: Users, path: '/clients' },
    { name: 'Influencers', icon: UserSquare2, path: '/influencers' },
    { name: 'Proveedores', icon: Camera, path: '/providers' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      {/* Sidebar */}
      <aside style={{
        width: '260px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        backgroundColor: 'var(--bg-dark)'
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ color: 'var(--accent-neon)', fontSize: '1.75rem', lineHeight: 1.1 }}>AGENCIA<br/>CREATIVA</h1>
          <div className="mono" style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            MAGIC WRITER V1.0
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.1em' }}>
            NEW DRAFT
          </div>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '4px',
                color: isActive ? 'var(--text-dark)' : 'var(--text-main)',
                backgroundColor: isActive ? 'var(--accent-neon)' : 'transparent',
                fontWeight: isActive ? '600' : '400',
                transition: 'all 0.2s',
              })}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem 3rem', backgroundColor: 'var(--bg-dark)', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
