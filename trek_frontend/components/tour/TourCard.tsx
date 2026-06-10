'use client';
import Link from "next/link";
import StarRating from "@/components/commom/StarRating";

interface Tour {
  id: number;
  title: string;
  slug: string;
  destination: string;
  tour_type: string;
  difficulty: "easy" | "moderate" | "challenging";
  duration_days: number;
  price_per_person: string;
  discount_percent: number;
  average_rating: string;
  is_featured: boolean;
  images?: { image: string; is_cover: boolean }[];
}

const tourTypeConfig: Record<string, { icon: string; color: string; bg: string }> = {
  cultural:    { icon: '🛕', color: '#b45309', bg: 'rgba(245,158,11,0.1)' },
  adventure:   { icon: '🧗', color: '#0d9488', bg: 'rgba(20,184,166,0.1)' },
  wildlife:    { icon: '🐘', color: '#15803d', bg: 'rgba(22,163,74,0.1)'  },
  spiritual:   { icon: '🙏', color: '#6d28d9', bg: 'rgba(139,92,246,0.1)' },
  scenic:      { icon: '🏔️', color: '#0369a1', bg: 'rgba(14,165,233,0.1)' },
  photography: { icon: '📷', color: '#be185d', bg: 'rgba(236,72,153,0.1)' },
};

const difficultyConfig = {
  easy:        { label: 'Easy',        bg: 'rgba(20,184,166,0.12)',  color: '#0d9488' },
  moderate:    { label: 'Moderate',    bg: 'rgba(245,158,11,0.12)',  color: '#b45309' },
  challenging: { label: 'Challenging', bg: 'rgba(239,68,68,0.12)',   color: '#b91c1c' },
};

export default function TourCard({ tour }: { tour: Tour }) {
  const coverImage =
    tour.images?.find((img) => img.is_cover)?.image ||
    tour.images?.[0]?.image ||
    "/placeholder.jpg";

  const originalPrice = Number(tour.price_per_person);
  const discountedPrice = originalPrice - (originalPrice * tour.discount_percent) / 100;
  const typeConfig = tourTypeConfig[tour.tour_type] ?? tourTypeConfig.cultural;
  const diff = difficultyConfig[tour.difficulty] ?? difficultyConfig.easy;

  return (
    // <Link href={`/tours/${tour.slug}`}>
    <Link href={`/tours/${tour.slug}`}>
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
            alt={tour.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />

          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,46,69,0.5) 0%, transparent 60%)',
          }} />

          {/* Badges */}
          <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
            {tour.is_featured && (
              <span style={{
                padding: '4px 10px', borderRadius: '6px',
                background: 'rgba(15,61,87,0.85)',
                backdropFilter: 'blur(4px)',
                color: '#14b8a6', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.5px', textTransform: 'uppercase',
              }}>Featured</span>
            )}
            {tour.discount_percent > 0 && (
              <span style={{
                padding: '4px 10px', borderRadius: '6px',
                background: 'rgba(20,184,166,0.9)',
                color: '#fff', fontSize: '11px', fontWeight: 700,
              }}>{tour.discount_percent}% OFF</span>
            )}
          </div>

          {/* Duration */}
          <div style={{
            position: 'absolute', bottom: '12px', right: '12px',
            padding: '4px 10px', borderRadius: '6px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(6px)',
            color: '#fff', fontSize: '12px', fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            {tour.duration_days} {tour.duration_days === 1 ? 'day' : 'days'}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 20px' }}>

          {/* Destination + type badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
              📍 {tour.destination}
            </span>
            <span style={{
              padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
              background: typeConfig.bg, color: typeConfig.color,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              {typeConfig.icon} {tour.tour_type}
            </span>
          </div>

          <h3 style={{
            fontSize: '16px', fontWeight: 700, color: '#0a2e45',
            margin: '0 0 6px', lineHeight: 1.3,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{tour.title}</h3>

          {/* Difficulty */}
          <div style={{ marginBottom: '10px' }}>
            <span style={{
              padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
              background: diff.bg, color: diff.color,
            }}>{diff.label}</span>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: '14px' }}>
            <StarRating rating={Number(tour.average_rating)} />
          </div>

          {/* Price row */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              {tour.discount_percent > 0 && (
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
            }}>View Tour →</div>
          </div>
        </div>
      </div>
    </Link>
  );
}