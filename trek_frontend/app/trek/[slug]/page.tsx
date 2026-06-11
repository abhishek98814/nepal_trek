import { notFound } from 'next/navigation';

async function getTrek(slug: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/treks/${slug}/`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TrekDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trek = await getTrek(slug);

  if (!trek) notFound();

  const price = Number(trek.discounted_price || trek.price_per_person);
  const original = Number(trek.price_per_person);
  const hasDiscount = trek.discount_percent > 0;

  return (
    <main style={{ background: '#f8f9fb', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0f3d57 0%, #0a2e45 60%, #061e30 100%)',
        padding: '60px 24px',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#14b8a6', marginBottom: '12px' }}>
            {trek.region} · {trek.duration_days} Days
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-1px' }}>
            {trek.title}
          </h1>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '6px 14px', borderRadius: '8px',
              background: 'rgba(20,184,166,0.15)', color: '#14b8a6',
              fontSize: '13px', fontWeight: 600, textTransform: 'capitalize',
            }}>{trek.difficulty}</span>
            <span style={{
              padding: '6px 14px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              fontSize: '13px',
            }}>📍 {trek.start_point} → {trek.end_point}</span>
            <span style={{
              padding: '6px 14px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.1)', color: '#fff',
              fontSize: '13px',
            }}>🏔️ {trek.max_altitude}m max altitude</span>
            {trek.tims_required && (
              <span style={{
                padding: '6px 14px', borderRadius: '8px',
                background: 'rgba(245,158,11,0.15)', color: '#f59e0b',
                fontSize: '13px', fontWeight: 600,
              }}>📋 TIMS Required</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>

          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Images */}
            {trek.images?.length > 0 && (
              <div style={{
                background: '#fff', borderRadius: '16px',
                padding: '24px', border: '1px solid #e8ecf0',
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#0a2e45' }}>
                  Gallery
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '12px',
                }}>
                  {trek.images.map((img: any) => (
                    <div key={img.id} style={{ borderRadius: '10px', overflow: 'hidden' }}>
                      <img
                        src={img.image}
                        alt={img.caption || trek.title}
                        style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                      />
                      {img.caption && (
                        <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div style={{
              background: '#fff', borderRadius: '16px',
              padding: '24px', border: '1px solid #e8ecf0',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#0a2e45' }}>
                About this trek
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '15px' }}>
                {trek.description}
              </p>
              {trek.highlight && (
                <div style={{
                  marginTop: '20px', padding: '16px',
                  background: '#f0fdfa', borderRadius: '10px',
                  borderLeft: '3px solid #14b8a6',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0d9488', marginBottom: '8px' }}>
                    HIGHLIGHTS
                  </div>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                    {trek.highlight}
                  </p>
                </div>
              )}
            </div>

            {/* Itinerary */}
            {trek.itinerary?.length > 0 && (
              <div style={{
                background: '#fff', borderRadius: '16px',
                padding: '24px', border: '1px solid #e8ecf0',
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#0a2e45' }}>
                  Day by Day Itinerary
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {trek.itinerary.map((day: any) => (
                    <div key={day.id} style={{
                      display: 'flex', gap: '16px',
                      padding: '16px', borderRadius: '12px',
                      background: '#f8f9fb', border: '1px solid #f1f5f9',
                    }}>
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: '14px', flexShrink: 0,
                      }}>
                        {day.day}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0a2e45', margin: '0 0 6px' }}>
                          {day.title}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                          {day.description}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                          {day.altitude_m && (
                            <span style={{ fontSize: '12px', color: '#0d9488' }}>🏔️ {day.altitude_m}m</span>
                          )}
                          {day.accommodation && (
                            <span style={{ fontSize: '12px', color: '#64748b' }}>🏠 {day.accommodation}</span>
                          )}
                          {day.meals && (
                            <span style={{ fontSize: '12px', color: '#64748b' }}>🍽️ {day.meals}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included / Excluded */}
            {(trek.included || trek.excluded) && (
              <div style={{
                background: '#fff', borderRadius: '16px',
                padding: '24px', border: '1px solid #e8ecf0',
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#0a2e45' }}>
                  What's included
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {trek.included && (
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#16a34a', marginBottom: '10px' }}>
                        ✅ INCLUDED
                      </div>
                      {trek.included.split(',').map((item: string, i: number) => (
                        <div key={i} style={{ fontSize: '13px', color: '#475569', padding: '4px 0', display: 'flex', gap: '8px' }}>
                          <span style={{ color: '#16a34a' }}>✓</span> {item.trim()}
                        </div>
                      ))}
                    </div>
                  )}
                  {trek.excluded && (
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#dc2626', marginBottom: '10px' }}>
                        ❌ NOT INCLUDED
                      </div>
                      {trek.excluded.split(',').map((item: string, i: number) => (
                        <div key={i} style={{ fontSize: '13px', color: '#475569', padding: '4px 0', display: 'flex', gap: '8px' }}>
                          <span style={{ color: '#dc2626' }}>✗</span> {item.trim()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Permit Info */}
            {trek.permit_info && (
              <div style={{
                background: '#fff', borderRadius: '16px',
                padding: '24px', border: '1px solid #e8ecf0',
              }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#0a2e45' }}>
                  Permits & Requirements
                </h2>
                <div style={{
                  padding: '16px', background: '#fefce8',
                  borderRadius: '10px', borderLeft: '3px solid #f59e0b',
                }}>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                    📋 {trek.permit_info}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN — Booking Card */}
          <div>
            <div style={{
              background: '#fff', borderRadius: '16px',
              border: '1px solid #e8ecf0', padding: '24px',
              position: 'sticky', top: '88px',
            }}>
              {/* Price */}
              <div style={{ marginBottom: '20px' }}>
                {hasDiscount && (
                  <p style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through', margin: '0 0 4px' }}>
                    ${original.toFixed(0)} per person
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '36px', fontWeight: 800, color: '#0a2e45' }}>
                    ${price.toFixed(0)}
                  </span>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>per person</span>
                </div>
                {hasDiscount && (
                  <span style={{
                    display: 'inline-block', marginTop: '6px',
                    padding: '3px 10px', borderRadius: '6px',
                    background: '#dcfce7', color: '#16a34a',
                    fontSize: '12px', fontWeight: 600,
                  }}>
                    Save {trek.discount_percent}%
                  </span>
                )}
              </div>

              {/* Quick stats */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '10px', marginBottom: '20px',
              }}>
                {[
                  { label: 'Duration', value: `${trek.duration_days} days` },
                  { label: 'Difficulty', value: trek.difficulty },
                  { label: 'Max altitude', value: `${trek.max_altitude}m` },
                  { label: 'Group size', value: `Max ${trek.max_group_size}` },
                  { label: 'Best season', value: trek.best_season },
                  { label: 'Min age', value: `${trek.min_age}+` },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '10px', background: '#f8f9fb',
                    borderRadius: '8px', border: '1px solid #f1f5f9',
                  }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0a2e45', textTransform: 'capitalize' }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability */}
              {trek.availability?.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0a2e45', marginBottom: '10px' }}>
                    Available Dates
                  </div>
                  {trek.availability.slice(0, 3).map((av: any) => (
                    <div key={av.id} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '8px 12px', marginBottom: '6px',
                      background: '#f8f9fb', borderRadius: '8px',
                      fontSize: '12px',
                    }}>
                      <span style={{ color: '#475569' }}>
                        {new Date(av.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {' → '}
                        {new Date(av.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span style={{ color: av.remaining_slots > 3 ? '#16a34a' : '#f59e0b', fontWeight: 600 }}>
                        {av.remaining_slots} slots left
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Book Button */}
              <a href={`/bookings`} style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                  color: '#fff', border: 'none', borderRadius: '12px',
                  fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  marginBottom: '10px',
                }}>
                  Book This Trek →
                </button>
              </a>
              <button style={{
                width: '100%', padding: '12px',
                background: 'transparent', color: '#0f3d57',
                border: '1.5px solid #0f3d57', borderRadius: '12px',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              }}>
                💬 Ask a Question
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
                Free cancellation up to 30 days before
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}