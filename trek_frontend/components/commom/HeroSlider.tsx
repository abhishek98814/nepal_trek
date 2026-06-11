'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import everest from '@/public/everest.jpg';
import annapurna from '@/public/ann.jpg';
import langtang from '@/public/Langtang.jpg';
import mustang from '@/public/mardi.jpg';

const slides = [
  {
    image: everest,
    title: 'Everest Base Camp Trek',
    subtitle: 'Khumbu · 14 Days · Difficult',
    price: 1200,
    slug: 'everest-base-camp',
    region: 'Khumbu Region',
  },
  {
    image: annapurna,
    title: 'Annapurna Circuit Trek',
    subtitle: 'Annapurna · 12 Days · Moderate',
    price: 900,
    slug: 'annapurna-circuit',
    region: 'Annapurna Region',
  },
  {
    image: langtang,
    title: 'Langtang Valley Trek',
    subtitle: 'Langtang · 7 Days · Moderate',
    price: 600,
    slug: 'langtang-valley',
    region: 'Langtang Region',
  },
  {
    image: mustang,
    title: 'Upper Mustang Trek',
    subtitle: 'Mustang · 15 Days · Moderate',
    price: 1800,
    slug: 'upper-mustang',
    region: 'Mustang Region',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index: number) => {
    if (animating || index === current) return;

    setAnimating(true);
    setPrev(current);
    setCurrent(index);

    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 700);
  };

  const slide = slides[current];

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        background: '#0a2e45',
      }}
    >
      {/* Previous Slide */}
      {prev !== null && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            backgroundImage: `url(${slides[prev].image.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Current Slide */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          backgroundImage: `url(${slide.image.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'zoomIn 6s ease forwards',
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background:
            'linear-gradient(to right, rgba(10,46,69,0.85) 0%, rgba(10,46,69,0.45) 50%, rgba(10,46,69,0.2) 100%)',
        }}
      />

      {/* Bottom Fade */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '200px',
          zIndex: 4,
          background: 'linear-gradient(to top, #f8f9fb, transparent)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
          left: 0,
          right: 0,
        }}
      >
        <div style={{ maxWidth: '650px' }}>
          {/* Region */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'rgba(20,184,166,0.15)',
              border: '1px solid rgba(20,184,166,0.4)',
              color: '#14b8a6',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            📍 {slide.region}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(42px, 7vw, 76px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.05,
              marginBottom: '18px',
              letterSpacing: '-2px',
            }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '18px',
            }}
          >
            {slide.subtitle}
          </p>

          {/* Price */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '34px',
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '15px',
              }}
            >
              From
            </span>

            <span
              style={{
                fontSize: '42px',
                fontWeight: 800,
                color: '#14b8a6',
              }}
            >
              ${slide.price}
            </span>

            <span
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '15px',
              }}
            >
              / person
            </span>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <Link
              href={`/trek/${slide.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  padding: '14px 32px',
                  border: 'none',
                  borderRadius: '10px',
                  background:
                    'linear-gradient(135deg,#14b8a6,#0d9488)',
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow:
                    '0 10px 25px rgba(20,184,166,0.35)',
                }}
              >
                View Trek →
              </button>
            </Link>

            <Link href="/trek" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: '14px 32px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                }}
              >
                All Treks
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Indicators */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '30px',
          transform: 'translateY(-50%)',
          zIndex: 6,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: '4px',
              height: i === current ? '42px' : '20px',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              background:
                i === current
                  ? '#14b8a6'
                  : 'rgba(255,255,255,0.3)',
              transition: 'all .3s ease',
            }}
          />
        ))}
      </div>

      {/* Thumbnails */}
      <div
        style={{
          position: 'absolute',
          bottom: '35px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
          display: 'flex',
          gap: '12px',
        }}
      >
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: '120px',
              height: '75px',
              borderRadius: '12px',
              overflow: 'hidden',
              padding: 0,
              cursor: 'pointer',
              opacity: i === current ? 1 : 0.5,
              border:
                i === current
                  ? '2px solid #14b8a6'
                  : '2px solid rgba(255,255,255,0.2)',
            }}
          >
            <img
              src={s.image.src}
              alt={s.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </button>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={() =>
          goTo(current === 0 ? slides.length - 1 : current - 1)
        }
        style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          zIndex: 6,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.1)',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
        }}
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={() =>
          goTo(current === slides.length - 1 ? 0 : current + 1)
        }
        style={{
          position: 'absolute',
          top: '50%',
          right: '80px',
          transform: 'translateY(-50%)',
          zIndex: 6,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.1)',
          color: '#fff',
          fontSize: '24px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
        }}
      >
        ›
      </button>

      <style jsx>{`
        @keyframes zoomIn {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}