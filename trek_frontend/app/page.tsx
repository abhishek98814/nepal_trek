import Link from "next/link";
import TrekCard from "@/components/trek/TrekCard";
import TourCard from "@/components/tour/TourCard";

async function getTreks() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/treks/", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.results || data || [];
  } catch {
    return [];
  }
}

async function getTours() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/tours/", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.results || data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const treks = await getTreks();
  const tours = await getTours();
  const featuredTreks = treks.filter((t: any) => t.is_featured).slice(0, 3);
  const featuredTours = tours.filter((t: any) => t.is_featured).slice(0, 3);

  return (
    <main style={{ background: '#f8f9fb', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f3d57 0%, #0a2e45 55%, #061e30 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 24px',
      }}>
        {/* Ambient blobs */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(ellipse at 15% 60%, rgba(20,184,166,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 20%, rgba(20,184,166,0.08) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 100%, rgba(15,61,87,0.4) 0%, transparent 60%)
          `,
        }} />

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: '760px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '20px',
            border: '1px solid rgba(20,184,166,0.35)',
            color: '#14b8a6', fontSize: '12px', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase',
            marginBottom: '28px',
          }}>
            🏔️ &nbsp;Nepal's premier trekking platform
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 8vw, 76px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.05,
            margin: '0 0 24px',
            letterSpacing: '-2px',
          }}>
            The Himalayas<br />
            <span style={{
              background: 'linear-gradient(90deg, #14b8a6, #67e8f9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>are calling.</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.75,
            margin: '0 auto 40px',
            maxWidth: '520px',
          }}>
            Curated treks, guided tours, and gear rentals — crafted by locals who know every pass, every teahouse, every summit view.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/trek" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '14px 32px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                color: '#fff', fontSize: '15px', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.2px',
              }}>Browse Treks</button>
            </Link>
            <Link href="/tours" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '14px 32px', borderRadius: '10px',
                border: '1.5px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff', fontSize: '15px', fontWeight: 600,
                cursor: 'pointer',
              }}>Explore Tours</button>
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}>
          <span>Scroll</span>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
          }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e8ecf0' }}>
        <div style={{
          maxWidth: '1000px', margin: '0 auto', padding: '0 24px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { n: '6,000+', label: 'Trekkers guided' },
            { n: '40+',    label: 'Routes available' },
            { n: '98%',    label: 'Satisfaction rate' },
            { n: '7 yrs',  label: 'Operating in Nepal' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '28px 20px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid #e8ecf0' : 'none',
            }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#0a2e45', letterSpacing: '-1px', marginBottom: '4px' }}>{s.n}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED TREKS ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#14b8a6', marginBottom: '8px' }}>
              Trekking
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a2e45', margin: 0, letterSpacing: '-0.5px' }}>
              Popular Treks
            </h2>
          </div>
          <Link href="/trek" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#14b8a6' }}>View all treks →</span>
          </Link>
        </div>

        {featuredTreks.length === 0 ? (
          <EmptyState label="treks" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {featuredTreks.map((trek: any) => (
              <TrekCard key={trek.id} trek={trek} />
            ))}
          </div>
        )}
      </section>

      {/* ── DIVIDER BANNER ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f3d57, #0a2e45)',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#14b8a6', margin: '0 0 12px' }}>
            Why Trek Nepal
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', margin: '0 0 32px', lineHeight: 1.3 }}>
            Local guides. Small groups. Authentic experiences.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            {['🧭 Expert local guides', '🛡️ Safety certified', '🌿 Responsible travel', '📡 Transparent pricing'].map((f, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500 }}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURS ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#14b8a6', marginBottom: '8px' }}>
              Tours
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0a2e45', margin: 0, letterSpacing: '-0.5px' }}>
              Featured Tours
            </h2>
          </div>
          <Link href="/tours" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#14b8a6' }}>View all tours →</span>
          </Link>
        </div>

        {featuredTours.length === 0 ? (
          <EmptyState label="tours" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {featuredTours.map((tour: any) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: 'linear-gradient(135deg, #0f3d57 0%, #0a2e45 100%)',
        padding: '100px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-1px' }}>
            Ready for your<br />next adventure?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', margin: '0 0 40px', lineHeight: 1.75 }}>
            Join thousands of trekkers who've trusted Trek Nepal to make their Himalayan journey unforgettable.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/register" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '14px 36px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              }}>Get Started — Free</button>
            </Link>
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '14px 32px', borderRadius: '10px',
                border: '1.5px solid rgba(255,255,255,0.3)',
                background: 'transparent',
                color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              }}>Learn About Us</button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div style={{
      textAlign: 'center', padding: '64px 24px',
      background: '#fff', borderRadius: '16px',
      border: '1px dashed #cbd5e1',
    }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏔️</div>
      <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 4px' }}>No {label} yet.</p>
      <a href="http://127.0.0.1:8000/admin" style={{ fontSize: '13px', color: '#14b8a6', fontWeight: 600 }}>
        Add from Django admin →
      </a>
    </div>
  );
}