'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';

const navLinks = [
  { href: '/trek', label: 'Treks', icon: '🥾' },
  { href: '/tours', label: 'Tours', icon: '🗺️' },
  { href: '/gear', label: 'Gear', icon: '🎒' },
  { href: '/about', label: 'About', icon: '📖' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.07)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}>🏔️</div>
              <div>
                <div style={{
                  fontWeight: 700,
                  fontSize: '17px',
                  color: scrolled ? '#0a2e45' : '#fff',
                  letterSpacing: '-0.3px',
                  lineHeight: 1,
                  transition: 'color 0.3s',
                }}>Trek Nepal</div>
                <div style={{
                  fontSize: '10px',
                  color: scrolled ? '#14b8a6' : 'rgba(255,255,255,0.6)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s',
                }}>Explore · Book · Discover</div>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }} className="desktop-nav">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: active ? 600 : 500,
                    color: active
                      ? '#14b8a6'
                      : scrolled ? '#334155' : 'rgba(255,255,255,0.85)',
                    background: active
                      ? scrolled ? 'rgba(20,184,166,0.08)' : 'rgba(255,255,255,0.1)'
                      : 'transparent',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    borderBottom: active ? '2px solid #14b8a6' : '2px solid transparent',
                  }}>
                    <span style={{ fontSize: '13px' }}>{link.icon}</span>
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 12px 5px 5px',
                    borderRadius: '24px',
                    border: `1.5px solid ${scrolled ? 'rgba(20,184,166,0.3)' : 'rgba(255,255,255,0.25)'}`,
                    background: scrolled ? 'rgba(20,184,166,0.05)' : 'rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: scrolled ? '#0a2e45' : '#fff',
                  }}>{user.username}</span>
                  <span style={{
                    fontSize: '10px',
                    color: scrolled ? '#94a3b8' : 'rgba(255,255,255,0.6)',
                  }}>▾</span>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '52px',
                    right: 0,
                    background: '#fff',
                    borderRadius: '14px',
                    boxShadow: '0 8px 40px rgba(10,46,69,0.14)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    padding: '8px',
                    minWidth: '210px',
                    animation: 'fadeDown 0.15s ease',
                  }}>
                    {/* User info */}
                    <div style={{
                      padding: '10px 12px 14px',
                      borderBottom: '1px solid #f1f5f9',
                      marginBottom: '4px',
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0a2e45' }}>{user.username}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{user.email}</div>
                      <div style={{
                        marginTop: '8px',
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: 'rgba(20,184,166,0.1)',
                        color: '#0d9488',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        letterSpacing: '0.3px',
                      }}>{user.role}</div>
                    </div>

                    {[
                      { href: '/dashboard', label: '🏠 Dashboard' },
                      { href: '/dashboard/my-bookings', label: '📋 My Bookings' },
                      { href: '/dashboard/profile', label: '👤 Profile' },
                      ...(user.role === 'admin' ? [{ href: '/admin-panel', label: '⚙️ Admin Panel' }] : []),
                    ].map((item) => (
                      <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                        <div
                          style={{
                            padding: '9px 12px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            color: '#334155',
                            cursor: 'pointer',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                          onClick={() => setProfileOpen(false)}
                        >
                          {item.label}
                        </div>
                      </Link>
                    ))}

                    <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '4px', paddingTop: '4px' }}>
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          color: '#e11d48',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#fff1f2')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: `1.5px solid ${scrolled ? 'rgba(10,46,69,0.2)' : 'rgba(255,255,255,0.4)'}`,
                    background: 'transparent',
                    color: scrolled ? '#0a2e45' : '#fff',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    Login
                  </button>
                </Link>
                <Link href="/auth/register" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.2px',
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Get Started
                  </button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                padding: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: scrolled ? '#0a2e45' : '#fff',
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            background: '#fff',
            borderTop: '1px solid #f1f5f9',
            padding: '12px 24px 20px',
            animation: 'fadeDown 0.2s ease',
          }}>
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                  <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                      padding: '13px 0',
                      fontSize: '15px',
                      fontWeight: active ? 600 : 500,
                      color: active ? '#14b8a6' : '#334155',
                      borderBottom: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                    {link.icon} {link.label}
                  </div>
                </Link>
              );
            })}
            {!user && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <Link href="/auth/login" style={{ textDecoration: 'none', flex: 1 }}>
                  <button style={{
                    width: '100%', padding: '10px', borderRadius: '8px',
                    border: '1.5px solid rgba(10,46,69,0.2)',
                    background: 'transparent', color: '#0a2e45',
                    fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                  }}>Login</button>
                </Link>
                <Link href="/auth/register" style={{ textDecoration: 'none', flex: 1 }}>
                  <button style={{
                    width: '100%', padding: '10px', borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                    color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  }}>Get Started</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}