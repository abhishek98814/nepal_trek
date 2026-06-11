'use client';
import { useTreks } from '@/hooks/useTreks';
import Link from 'next/link';
import { useState } from 'react';

const difficultyConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  easy:      { label: 'Easy',      color: '#0d9488', bg: 'rgba(20,184,166,0.12)',  dot: '#14b8a6' },
  moderate:  { label: 'Moderate',  color: '#b45309', bg: 'rgba(245,158,11,0.12)', dot: '#f59e0b' },
  difficult: { label: 'Difficult', color: '#b91c1c', bg: 'rgba(239,68,68,0.12)',  dot: '#ef4444' },
  extreme:   { label: 'Extreme',   color: '#6d28d9', bg: 'rgba(139,92,246,0.12)', dot: '#8b5cf6' },
};

function TrekCard({ trek }: { trek: any }) {
  const [hovered, setHovered] = useState(false);
  const diff = difficultyConfig[trek.difficulty] ?? difficultyConfig.moderate;
  const price = Number(trek.discounted_price || trek.price_per_person);
  const original = Number(trek.price_per_person);
  const hasDiscount = trek.discount_percent > 0;

  const coverImage = trek.cover_image || trek.images?.find((i: any) => i.is_cover)?.image || trek.images?.[0]?.image || null;

  return (
    <Link href={`/trek/${trek.slug}`} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          border: hovered ? '1px solid rgba(20,184,166,0.4)' : '1px solid #e8ecf0',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? '0 24px 60px rgba(10,46,69,0.15)' : '0 2px 12px rgba(10,46,69,0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Image area */}
        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
          {coverImage ? (
            <img
              src={coverImage}
              alt={trek.title}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #0f3d57 0%, #0a2e45 50%, #14b8a6 150%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '64px',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>🏔️</div>
          )}

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,46,69,0.75) 0%, rgba(10,46,69,0.1) 50%, transparent 100%)',
            transition: 'opacity 0.3s',
            opacity: hovered ? 1 : 0.8,
          }} />

          {/* Top badges */}
          <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '5px 11px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
              background: diff.bg, color: diff.color,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${diff.dot}30`,
              display: 'flex', alignItems: 'center', gap: '5px',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: diff.dot, display: 'inline-block' }} />
              {diff.label}
            </span>
            {trek.is_featured && (
              <span style={{
                padding: '5px 11px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
                background: 'rgba(245,158,11,0.15)', color: '#d97706',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(245,158,11,0.25)',
              }}>⭐ Featured</span>
            )}
            {hasDiscount && (
              <span style={{
                padding: '5px 11px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
                background: 'rgba(20,184,166,0.85)', color: '#fff',
                backdropFilter: 'blur(8px)',
              }}>{trek.discount_percent}% OFF</span>
            )}
          </div>

          {/* Bottom info bar on image */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '16px 18px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          }}>
            <div>
              <h3 style={{
                fontSize: '17px', fontWeight: 700, color: '#fff',
                margin: 0, lineHeight: 1.25,
                textShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}>{trek.title}</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                📍 {trek.region}
              </p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px', padding: '5px 10px', textAlign: 'center', flexShrink: 0,
            }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>{trek.duration_days}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>days</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 18px 18px' }}>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px', marginBottom: '14px',
          }}>
            {[
              { icon: '🧭', label: 'Altitude', value: trek.max_altitude ? `${(trek.max_altitude / 1000).toFixed(1)}k m` : 'N/A' },
              { icon: '⭐', label: 'Rating',   value: trek.average_rating ? Number(trek.average_rating).toFixed(1) : 'New' },
              { icon: '👥', label: 'Bookings', value: trek.total_bookings ?? 0 },
            ].map((stat, i) => (
              <div key={i} style={{
                background: '#f8f9fb', borderRadius: '10px',
                padding: '8px 10px', textAlign: 'center',
                border: '1px solid #f1f5f9',
              }}>
                <div style={{ fontSize: '13px', marginBottom: '2px' }}>{stat.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0a2e45' }}>{stat.value}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Price + CTA */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '1px solid #f1f5f9', paddingTop: '14px',
          }}>
            <div>
              {hasDiscount && (
                <p style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through', margin: '0 0 2px' }}>
                  ${original.toFixed(0)}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#0a2e45', letterSpacing: '-0.5px' }}>
                  ${price.toFixed(0)}
                </span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>/person</span>
              </div>
            </div>

            <div style={{
              padding: '10px 18px', borderRadius: '10px',
              background: hovered
                ? 'linear-gradient(135deg, #14b8a6, #0d9488)'
                : 'linear-gradient(135deg, #0f3d57, #14b8a6)',
              color: '#fff', fontSize: '13px', fontWeight: 700,
              transition: 'background 0.3s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              View Trek
              <span style={{
                transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                transition: 'transform 0.2s',
                display: 'inline-block',
              }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TreksPage() {
  const { data, isLoading, isError } = useTreks();
  const [filter, setFilter] = useState<string>('all');

  const allTreks: any[] = data?.results || data || [];
  console.log(allTreks, "This is alltrek")
  const treks = filter === 'all' ? allTreks : allTreks.filter(t => t.difficulty === filter);

  if (isLoading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '16px',
      background: '#f8f9fb',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '50%',
        border: '3px solid #e8ecf0', borderTopColor: '#14b8a6',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: '#64748b', fontSize: '15px', fontWeight: 500 }}>Loading treks...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (isError) return (
    <div style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '12px',
    }}>
      <div style={{ fontSize: '48px' }}>⚠️</div>
      <p style={{ color: '#b91c1c', fontSize: '16px', fontWeight: 600 }}>Failed to load treks</p>
      <p style={{ color: '#64748b', fontSize: '14px' }}>Make sure the Django server is running.</p>
    </div>
  );

  return (
    <main style={{ background: '#f8f9fb', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Page hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f3d57 0%, #0a2e45 60%, #061e30 100%)',
        padding: '60px 24px 50px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(ellipse at 10% 60%, rgba(20,184,166,0.12) 0%, transparent 50%), radial-gradient(ellipse at 90% 10%, rgba(20,184,166,0.07) 0%, transparent 40%)',
        }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#14b8a6', marginBottom: '12px' }}>
            Himalayan Expeditions
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-1px' }}>
            Trek Packages
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            {allTreks.length} curated routes through Nepal's most iconic landscapes
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e8ecf0', position: 'sticky', top: '68px', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', height: '56px' }}>
          {[
            { key: 'all', label: 'All Treks' },
            { key: 'easy', label: '🟢 Easy' },
            { key: 'moderate', label: '🟡 Moderate' },
            { key: 'difficult', label: '🔴 Difficult' },
            { key: 'extreme', label: '🟣 Extreme' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
                border: filter === f.key ? 'none' : '1px solid #e8ecf0',
                background: filter === f.key ? 'linear-gradient(135deg, #0f3d57, #14b8a6)' : 'transparent',
                color: filter === f.key ? '#fff' : '#64748b',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >{f.label}</button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '13px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
            {treks.length} result{treks.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 80px' }}>
        {treks.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: '#fff', borderRadius: '20px',
            border: '1px dashed #cbd5e1',
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🏔️</div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a2e45', marginBottom: '8px' }}>No treks found</h3>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
              {filter !== 'all' ? `No ${filter} treks available. Try a different filter.` : 'Add treks from the admin panel.'}
            </p>
            {filter !== 'all' ? (
              <button
                onClick={() => setFilter('all')}
                style={{
                  padding: '10px 24px', borderRadius: '8px', border: 'none',
                  background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                  color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                }}
              >Show all treks</button>
            ) : (
              <Link href="/admin-panel/treks">
                <button style={{
                  padding: '10px 24px', borderRadius: '8px', border: 'none',
                  background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                  color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                }}>Add Trek →</button>
              </Link>
            )}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}>
            {treks.map((trek: any) => (
              <TrekCard key={trek.id} trek={trek} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}