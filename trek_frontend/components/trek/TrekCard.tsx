'use client';
import Link from "next/link";
import StarRating from "@/components/commom/StarRating";

interface Trek {
  id: number;
  title: string;
  slug: string;
  region: string;
  difficulty: "easy" | "moderate" | "difficult" | "extreme";
  duration_days: number;
  price_per_person: string;
  discount_percent: number;
  average_rating: string;
  is_featured: boolean;
  images?: { image: string; is_cover: boolean }[];
}

const difficultyConfig = {
  easy:     { label: 'Easy',     bg: 'rgba(20,184,166,0.12)',  color: '#0d9488' },
  moderate: { label: 'Moderate', bg: 'rgba(245,158,11,0.12)',  color: '#b45309' },
  difficult:{ label: 'Difficult',bg: 'rgba(239,68,68,0.12)',   color: '#b91c1c' },
  extreme:  { label: 'Extreme',  bg: 'rgba(139,92,246,0.12)',  color: '#6d28d9' },
};

export default function TrekCard({ trek }: { trek: Trek }) {
  const coverImage =
    trek.images?.find((img) => img.is_cover)?.image ||
    trek.images?.[0]?.image ||
    "/placeholder.jpg";

  const originalPrice = Number(trek.price_per_person);
  const discountedPrice = originalPrice - (originalPrice * trek.discount_percent) / 100;
  const diff = difficultyConfig[trek.difficulty] ?? difficultyConfig.moderate;

  return (
    // <Link href={`/trek/${trek.slug}`} style={{ textDecoration: 'none' }}>
      <Link href={`/trek/${trek.slug}`}>
  {/* <div style={{ textDecoration: 'none', ... }}></div> */}
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #e8ecf0',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(10,46,69,0.12)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img
            src={coverImage}
            alt={trek.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,46,69,0.5) 0%, transparent 60%)',
          }} />

          {/* Badges */}
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            display: 'flex', gap: '6px',
          }}>
            {trek.is_featured && (
              <span style={{
                padding: '4px 10px', borderRadius: '6px',
                background: 'rgba(15,61,87,0.85)',
                backdropFilter: 'blur(4px)',
                color: '#14b8a6', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.5px', textTransform: 'uppercase',
              }}>Featured</span>
            )}
            {trek.discount_percent > 0 && (
              <span style={{
                padding: '4px 10px', borderRadius: '6px',
                background: 'rgba(20,184,166,0.9)',
                color: '#fff', fontSize: '11px', fontWeight: 700,
              }}>{trek.discount_percent}% OFF</span>
            )}
          </div>

          {/* Duration pill at bottom */}
          <div style={{
            position: 'absolute', bottom: '12px', right: '12px',
            padding: '4px 10px', borderRadius: '6px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(6px)',
            color: '#fff', fontSize: '12px', fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            {trek.duration_days} days
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 20px' }}>

          {/* Region + difficulty */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
              📍 {trek.region}
            </span>
            <span style={{
              padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
              background: diff.bg, color: diff.color,
            }}>{diff.label}</span>
          </div>

          <h3 style={{
            fontSize: '16px', fontWeight: 700, color: '#0a2e45',
            margin: '0 0 10px', lineHeight: 1.3,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{trek.title}</h3>

          {/* Rating */}
          <div style={{ marginBottom: '14px' }}>
            <StarRating rating={Number(trek.average_rating)} />
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              {trek.discount_percent > 0 && (
                <p style={{ fontSize: '12px', color: '#94a3b8', textDecoration: 'line-through', margin: '0 0 2px' }}>
                  ${originalPrice.toFixed(0)}
                </p>
              )}
              <p style={{ fontSize: '22px', fontWeight: 700, color: '#0a2e45', margin: 0, letterSpacing: '-0.5px' }}>
                ${discountedPrice.toFixed(0)}
              </p>
              <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0' }}>per person</p>
            </div>

            <div style={{
              padding: '8px 16px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
              color: '#fff', fontSize: '13px', fontWeight: 600,
            }}>View Trek →</div>
          </div>
        </div>
      </div>
    </Link>
  );
}