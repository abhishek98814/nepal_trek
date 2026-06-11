'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function TourDetailPage() {
  const { slug } = useParams();

  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(`http://127.0.0.1:8000/api/tours/${slug}/`);

        if (!res.ok) throw new Error('Failed');

        const data = await res.json();
        setTour(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchTour();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h2>Loading Tour...</h2>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: 'red' }}>
        <h2>Failed to load tour</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>

      {/* TITLE */}
      <h1 style={{ fontSize: '32px', fontWeight: 700 }}>
        {tour.title}
      </h1>

      <p style={{ color: '#666', marginTop: '6px' }}>
        📍 {tour.destination} · {tour.region}
      </p>

      {/* COVER + GALLERY */}
      <div style={{ marginTop: '24px' }}>

        {/* COVER IMAGE */}
        <div
          style={{
            width: '100%',
            height: '420px',
            borderRadius: '12px',
            background: tour.images?.length
              ? `url(${tour.images[0].image}) center/cover`
              : '#2563eb',
          }}
        />

        {/* THUMBNAILS */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '12px',
          overflowX: 'auto',
        }}>
          {tour.images?.map((img: any) => (
            <img
              key={img.id}
              src={img.image}
              alt={img.caption || 'tour image'}
              style={{
                width: '120px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: img.is_cover ? '2px solid #2563eb' : '1px solid #ddd',
              }}
            />
          ))}
        </div>
      </div>

      {/* INFO SECTION */}
      <div style={{ marginTop: '30px' }}>
        <h2>About This Tour</h2>
        <p style={{ color: '#555', lineHeight: 1.6 }}>
          {tour.description}
        </p>
      </div>

      {/* PRICE BOX */}
      <div style={{
        marginTop: '20px',
        padding: '16px',
        border: '1px solid #eee',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div>
          <p style={{ fontSize: '18px', fontWeight: 700 }}>
            ${tour.price_per_person} / person
          </p>

          {tour.discount_percent > 0 && (
            <p style={{ color: 'green' }}>
              Discount: {tour.discount_percent}%
            </p>
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <p>⭐ {tour.average_rating || 'New'}</p>
          <p>{tour.total_bookings} bookings</p>
        </div>
      </div>

      {/* ITINERARY */}
      <div style={{ marginTop: '40px' }}>
        <h2>Itinerary</h2>

        {tour.itinerary?.length === 0 && (
          <p style={{ color: '#777' }}>No itinerary added</p>
        )}

        {tour.itinerary?.map((day: any) => (
          <div
            key={day.id}
            style={{
              padding: '16px',
              border: '1px solid #eee',
              borderRadius: '10px',
              marginTop: '12px',
            }}
          >
            <h3>Day {day.day}: {day.title}</h3>
            <p style={{ color: '#555' }}>{day.description}</p>

            {day.accommodation && (
              <p><b>Stay:</b> {day.accommodation}</p>
            )}

            {day.meals && (
              <p><b>Meals:</b> {day.meals}</p>
            )}
          </div>
        ))}
      </div>

      {/* AVAILABILITY */}
      <div style={{ marginTop: '40px' }}>
        <h2>Availability</h2>

        {tour.availability?.map((slot: any) => (
          <div
            key={slot.id}
            style={{
              padding: '12px',
              border: '1px solid #eee',
              borderRadius: '8px',
              marginTop: '10px',
            }}
          >
            📅 {slot.start_date} → {slot.end_date} <br />
            🎟 Remaining slots: {slot.remaining_slots}
          </div>
        ))}
      </div>

      {/* GUIDE */}
      {tour.created_by && (
        <div style={{ marginTop: '40px' }}>
          <h2>Created By</h2>
          <p>{tour.created_by}</p>
        </div>
      )}

    </div>
  );
}