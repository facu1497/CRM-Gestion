import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, UserSquare2, Camera, Menu, X, Sparkles } from 'lucide-react';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
      else setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar sidebar al navegar en móvil
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Propuestas', icon: Briefcase, path: '/proposals' },
    { name: 'Clientes', icon: Users, path: '/clients' },
    { name: 'Influencers', icon: UserSquare2, path: '/influencers' },
    { name: 'Proveedores', icon: Camera, path: '/providers' },
    { name: 'Prueba IA', icon: Sparkles, path: '/ai-test' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      {/* Mobile Header */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor: 'var(--bg-dark)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          zIndex: 40,
          justifyContent: 'space-between'
        }}>
          <h1 style={{ color: 'var(--accent-neon)', fontSize: '1.25rem', margin: 0 }}>AGENCIA</h1>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ color: 'var(--accent-neon)', padding: '0.5rem' }}
          >
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 45,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '260px',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        backgroundColor: 'var(--bg-dark)',
        position: isMobile ? 'fixed' : 'relative',
        left: isOpen ? 0 : '-260px',
        top: 0,
        bottom: 0,
        zIndex: 50,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ color: 'var(--accent-neon)', fontSize: '1.75rem', lineHeight: 1.1 }}>AGENCIA<br/>CREATIVA</h1>
            <div className="mono" style={{ fontSize: '0.75rem', marginTop: '1rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              MAGIC WRITER V1.0
            </div>
          </div>
          {isMobile && (
            <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
          )}
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
      <main style={{ 
        flex: 1, 
        padding: isMobile ? '80px 1.5rem 2rem' : '2rem 3rem', 
        backgroundColor: 'var(--bg-dark)', 
        overflowY: 'auto',
        height: '100vh'
      }}>
        <Outlet />
      </main>
    </div>
  );
}
