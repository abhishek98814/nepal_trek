'use client';
import { useState } from 'react';
import { useTours } from '@/hooks/useTours';
import Link from 'next/link';

const TOUR_TYPES = ['all', 'cultural', 'adventure', 'wildlife', 'spiritual', 'scenic', 'photography'];
const DIFFICULTIES = ['all', 'easy', 'moderate', 'challenging'];

export default function ToursPage() {
  const [tourType, setTourType] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useTours({
    tour_type: tourType !== 'all' ? tourType : undefined,
    difficulty: difficulty !== 'all' ? difficulty : undefined,
    search: search || undefined,
  });

  const tours = data?.results || data || [];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
          Tour Packages
        </h1>
        <p style={{ color: '#666' }}>
          Explore Nepal — cultural tours, wildlife safaris, adventure and more
        </p>
      </div>

      {/* Search & Filters */}
      <div style={{
        background: '#f9fafb', borderRadius: '12px',
        padding: '20px', marginBottom: '32px',
        display: 'flex', gap: '12px', flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search tours..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: '200px', padding: '10px 14px',
            borderRadius: '8px', border: '1px solid #e5e7eb',
            fontSize: '14px', outline: 'none',
          }}
        />

        {/* Tour Type Filter */}
        <select
          value={tourType}
          onChange={e => setTourType(e.target.value)}
          style={{
            padding: '10px 14px', borderRadius: '8px',
            border: '1px solid #e5e7eb', fontSize: '14px',
            background: '#fff', cursor: 'pointer', outline: 'none',
          }}
        >
          {TOUR_TYPES.map(t => (
            <option key={t} value={t}>
              {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        {/* Difficulty Filter */}
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          style={{
            padding: '10px 14px', borderRadius: '8px',
            border: '1px solid #e5e7eb', fontSize: '14px',
            background: '#fff', cursor: 'pointer', outline: 'none',
          }}
        >
          {DIFFICULTIES.map(d => (
            <option key={d} value={d}>
              {d === 'all' ? 'All Difficulties' : d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>

        {/* Reset */}
        {(tourType !== 'all' || difficulty !== 'all' || search) && (
          <button
            onClick={() => { setTourType('all'); setDifficulty('all'); setSearch(''); }}
            style={{
              padding: '10px 16px', borderRadius: '8px',
              border: '1px solid #e5e7eb', background: '#fff',
              cursor: 'pointer', fontSize: '13px', color: '#666',
            }}
          >
            Reset ✕
          </button>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '80px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🗺️</div>
          <p style={{ color: '#666', fontSize: '16px' }}>Loading tours...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div style={{
          textAlign: 'center', padding: '80px',
          background: '#fef2f2', borderRadius: '12px',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚠️</div>
          <p style={{ color: '#dc2626', fontSize: '16px' }}>
            Failed to load tours. Make sure Django server is running at port 8000.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && tours.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '80px',
          background: '#f9fafb', borderRadius: '12px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>
            No tours found
          </h3>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            {search || tourType !== 'all' || difficulty !== 'all'
              ? 'Try adjusting your filters'
              : 'No tours added yet'}
          </p>
          <Link href="/admin-panel/tours">
            <button style={{
              padding: '10px 24px', background: '#2563eb',
              color: '#fff', border: 'none', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 500,
            }}>
              Add Tour →
            </button>
          </Link>
        </div>
      )}

      {/* Tour Count */}
      {!isLoading && tours.length > 0 && (
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          Showing {tours.length} tours
        </p>
      )}

      {/* Tours Grid */}
      {!isLoading && tours.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {tours.map((tour: any) => (
            <Link key={tour.id} href={`/tours/${tour.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{
                border: '1px solid #e5e7eb', borderRadius: '12px',
                overflow: 'hidden', cursor: 'pointer',
                transition: 'all 0.2s', background: '#fff',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {/* Cover Image */}
                <div style={{
                  height: '200px',
                  background: tour.cover_image
                    ? `url(${tour.cover_image}) center/cover no-repeat`
                    : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '52px',
                  position: 'relative',
                }}>
                  {!tour.cover_image && '🗺️'}

                  {/* Featured badge */}
                  {tour.is_featured && (
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      background: '#f59e0b', color: '#fff',
                      padding: '4px 10px', borderRadius: '20px',
                      fontSize: '11px', fontWeight: 600,
                    }}>
                      ⭐ Featured
                    </div>
                  )}
                </div>

                <div style={{ padding: '16px' }}>
                  {/* Badges */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '20px',
                      fontSize: '11px', fontWeight: 600,
                      background: '#dbeafe', color: '#2563eb',
                      textTransform: 'capitalize',
                    }}>{tour.tour_type}</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: '20px',
                      fontSize: '11px', fontWeight: 600,
                      background: tour.difficulty === 'easy' ? '#dcfce7'
                        : tour.difficulty === 'moderate' ? '#fef9c3' : '#fee2e2',
                      color: tour.difficulty === 'easy' ? '#16a34a'
                        : tour.difficulty === 'moderate' ? '#ca8a04' : '#dc2626',
                      textTransform: 'capitalize',
                    }}>{tour.difficulty}</span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: '16px', fontWeight: 600,
                    marginBottom: '6px', color: '#111',
                    lineHeight: 1.3,
                  }}>
                    {tour.title}
                  </h3>

                  {/* Meta */}
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                    📍 {tour.destination} · {tour.duration_days} days
                    {tour.duration_hours ? ` (${tour.duration_hours}h)` : ''}
                  </p>

                  {/* Inclusions */}
                  <div style={{
                    display: 'flex', gap: '8px', marginBottom: '12px',
                    flexWrap: 'wrap',
                  }}>
                    {tour.guide_included && (
                      <span style={{ fontSize: '11px', color: '#16a34a' }}>✓ Guide</span>
                    )}
                    {tour.transport_included && (
                      <span style={{ fontSize: '11px', color: '#16a34a' }}>✓ Transport</span>
                    )}
                    {tour.meals_included && (
                      <span style={{ fontSize: '11px', color: '#16a34a' }}>✓ Meals</span>
                    )}
                    {tour.entry_fee_included && (
                      <span style={{ fontSize: '11px', color: '#16a34a' }}>✓ Entry fees</span>
                    )}
                  </div>

                  {/* Price & Rating */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', paddingTop: '12px',
                    borderTop: '1px solid #f3f4f6',
                  }}>
                    <div>
                      <span style={{
                        fontSize: '20px', fontWeight: 700, color: '#2563eb',
                      }}>
                        ${tour.discounted_price || tour.price_per_person}
                      </span>
                      <span style={{ fontSize: '12px', color: '#888' }}>/person</span>
                      {tour.discount_percent > 0 && (
                        <span style={{
                          marginLeft: '6px', fontSize: '11px',
                          color: '#16a34a', fontWeight: 600,
                        }}>
                          -{tour.discount_percent}%
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666' }}>
                      ⭐ {tour.average_rating > 0 ? tour.average_rating : 'New'}
                      {tour.total_bookings > 0 && (
                        <span style={{ color: '#999' }}> · {tour.total_bookings} booked</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}