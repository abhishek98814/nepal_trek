'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCreateBooking } from '@/hooks/useBooking';
import useAuthStore from '@/store/authStore';
import Link from 'next/link';

const steps = ['Trip Details', 'Participants', 'Contact', 'Review & Pay'];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: createBooking, isPending } = useCreateBooking();

  const type = searchParams.get('type') || 'trek';
  const id = searchParams.get('id') || '';
  const slug = searchParams.get('slug') || '';

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    booking_type: type,
    trek_id: type === 'trek' ? parseInt(id) : null,
    tour_id: type === 'tour' ? parseInt(id) : null,
    start_date: '',
    end_date: '',
    num_participants: 1,
    special_requests: '',
    contact_name: user?.username || '',
    contact_email: user?.email || '',
    contact_phone: '',
    emergency_contact: '',
    unit_price: 0,
    total_price: 0,
    discount_amount: 0,
    currency: 'USD',
    payment_method: 'esewa',
  });

  const [participants, setParticipants] = useState([
    { full_name: '', age: '', nationality: 'Nepali', passport_number: '', medical_conditions: '' }
  ]);

  // Redirect if not logged in
//   if (!user) {
//     return (
//       <div style={{
//         minHeight: '100vh', display: 'flex',
//         alignItems: 'center', justifyContent: 'center',
//         background: '#f8f9fb',
//       }}>
//         <div style={{
//           textAlign: 'center', padding: '48px',
//           background: '#fff', borderRadius: '20px',
//           border: '1px solid #e8ecf0', maxWidth: '400px',
//         }}>
//           <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔐</div>
//           <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0a2e45', margin: '0 0 8px' }}>
//             Login Required
//           </h2>
//           <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
//             Please login to book this {type}.
//           </p>
//           <Link href={`/auth/login?next=/booking?type=${type}&id=${id}&slug=${slug}`}>
//             <button style={{
//               width: '100%', padding: '12px',
//               background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
//               color: '#fff', border: 'none', borderRadius: '10px',
//               fontSize: '15px', fontWeight: 700, cursor: 'pointer',
//             }}>
//               Login to Continue →
//             </button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    const bookingData = {
      ...form,
      participants,
      total_price: form.unit_price * form.num_participants,
    };
    createBooking(bookingData, {
      onSuccess: (data) => {
        router.push(`/booking/${data.booking_reference}`);
      },
    });
  };

  const updateParticipant = (index: number, field: string, value: string) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], [field]: value };
    setParticipants(updated);
  };

  const addParticipant = () => {
    setParticipants([...participants, {
      full_name: '', age: '', nationality: 'Nepali',
      passport_number: '', medical_conditions: '',
    }]);
    setForm({ ...form, num_participants: form.num_participants + 1 });
  };

  const removeParticipant = (index: number) => {
    if (participants.length === 1) return;
    setParticipants(participants.filter((_, i) => i !== index));
    setForm({ ...form, num_participants: form.num_participants - 1 });
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    borderRadius: '10px', fontSize: '14px',
    border: '1.5px solid #e5e7eb',
    outline: 'none', boxSizing: 'border-box' as const,
    color: '#0a2e45', background: '#fff',
    transition: 'border 0.2s',
  };

  const labelStyle = {
    fontSize: '13px', fontWeight: 600 as const,
    color: '#374151', display: 'block' as const,
    marginBottom: '6px',
  };

  return (
    <div style={{ background: '#f8f9fb', minHeight: '100vh', paddingTop: '88px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Link href={`/${type}/${slug}`} style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '13px', color: '#14b8a6', fontWeight: 600 }}>← Back to {type}</span>
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0a2e45', margin: '12px 0 4px', letterSpacing: '-0.5px' }}>
            Complete Your Booking
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0, textTransform: 'capitalize' }}>
            {type} booking · {slug.replace(/-/g, ' ')}
          </p>
        </div>

        {/* Steps */}
        <div style={{
          display: 'flex', alignItems: 'center',
          marginBottom: '32px', gap: '0',
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i < step ? '#14b8a6' : i === step
                    ? 'linear-gradient(135deg, #0f3d57, #14b8a6)'
                    : '#e5e7eb',
                  color: i <= step ? '#fff' : '#94a3b8',
                  fontSize: i < step ? '14px' : '13px',
                  fontWeight: 700,
                  transition: 'all 0.3s',
                }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{
                  fontSize: '11px', fontWeight: 600,
                  color: i === step ? '#0a2e45' : '#94a3b8',
                  whiteSpace: 'nowrap',
                }}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  flex: 1, height: '2px', margin: '0 8px',
                  marginBottom: '20px',
                  background: i < step ? '#14b8a6' : '#e5e7eb',
                  transition: 'background 0.3s',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div style={{
          background: '#fff', borderRadius: '20px',
          border: '1px solid #e8ecf0', padding: '32px',
          marginBottom: '20px',
        }}>

          {/* STEP 0 — Trip Details */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0a2e45', margin: '0 0 24px' }}>
                Trip Details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Start Date *</label>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={e => setForm({ ...form, start_date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    style={inputStyle}
                    onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                    onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>End Date</label>
                  <input
                    type="date"
                    value={form.end_date}
                    onChange={e => setForm({ ...form, end_date: e.target.value })}
                    min={form.start_date}
                    style={inputStyle}
                    onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                    onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Number of Participants *</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => form.num_participants > 1 && setForm({ ...form, num_participants: form.num_participants - 1 })}
                      style={{
                        width: '40px', height: '40px', borderRadius: '8px',
                        border: '1.5px solid #e5e7eb', background: '#f8f9fb',
                        fontSize: '20px', cursor: 'pointer', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >−</button>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#0a2e45', minWidth: '32px', textAlign: 'center' }}>
                      {form.num_participants}
                    </span>
                    <button
                      onClick={() => setForm({ ...form, num_participants: form.num_participants + 1 })}
                      style={{
                        width: '40px', height: '40px', borderRadius: '8px',
                        border: '1.5px solid #14b8a6', background: '#f0fdfa',
                        fontSize: '20px', cursor: 'pointer', fontWeight: 700,
                        color: '#14b8a6',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >+</button>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Price per person (USD)</label>
                  <input
                    type="number"
                    value={form.unit_price}
                    onChange={e => setForm({ ...form, unit_price: parseFloat(e.target.value) || 0 })}
                    placeholder="e.g. 1200"
                    style={inputStyle}
                    onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                    onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Special Requests</label>
                  <textarea
                    value={form.special_requests}
                    onChange={e => setForm({ ...form, special_requests: e.target.value })}
                    placeholder="Dietary requirements, accessibility needs, special occasions..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                    onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 — Participants */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0a2e45', margin: 0 }}>
                  Participant Details
                </h2>
                <button
                  onClick={addParticipant}
                  style={{
                    padding: '8px 16px', borderRadius: '8px',
                    border: '1.5px solid #14b8a6', background: '#f0fdfa',
                    color: '#14b8a6', fontSize: '13px', fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >+ Add Participant</button>
              </div>

              {participants.map((p, i) => (
                <div key={i} style={{
                  padding: '20px', borderRadius: '12px',
                  border: '1px solid #e8ecf0', marginBottom: '16px',
                  background: '#f8f9fb',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0a2e45' }}>
                      Participant {i + 1}
                    </span>
                    {participants.length > 1 && (
                      <button
                        onClick={() => removeParticipant(i)}
                        style={{
                          padding: '4px 10px', borderRadius: '6px',
                          border: '1px solid #fecaca', background: '#fef2f2',
                          color: '#dc2626', fontSize: '12px', cursor: 'pointer',
                        }}
                      >Remove</button>
                    )}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        type="text"
                        value={p.full_name}
                        onChange={e => updateParticipant(i, 'full_name', e.target.value)}
                        placeholder="As in passport"
                        style={inputStyle}
                        onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                        onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Age *</label>
                      <input
                        type="number"
                        value={p.age}
                        onChange={e => updateParticipant(i, 'age', e.target.value)}
                        placeholder="Age"
                        style={inputStyle}
                        onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                        onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Nationality</label>
                      <input
                        type="text"
                        value={p.nationality}
                        onChange={e => updateParticipant(i, 'nationality', e.target.value)}
                        placeholder="e.g. Nepali"
                        style={inputStyle}
                        onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                        onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Passport Number</label>
                      <input
                        type="text"
                        value={p.passport_number}
                        onChange={e => updateParticipant(i, 'passport_number', e.target.value)}
                        placeholder="Optional"
                        style={inputStyle}
                        onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                        onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                      />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Medical Conditions</label>
                      <input
                        type="text"
                        value={p.medical_conditions}
                        onChange={e => updateParticipant(i, 'medical_conditions', e.target.value)}
                        placeholder="Any medical conditions we should know about"
                        style={inputStyle}
                        onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                        onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 2 — Contact */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0a2e45', margin: '0 0 24px' }}>
                Contact Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    value={form.contact_name}
                    onChange={e => setForm({ ...form, contact_name: e.target.value })}
                    placeholder="Your full name"
                    style={inputStyle}
                    onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                    onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    value={form.contact_email}
                    onChange={e => setForm({ ...form, contact_email: e.target.value })}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                    onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input
                    type="tel"
                    value={form.contact_phone}
                    onChange={e => setForm({ ...form, contact_phone: e.target.value })}
                    placeholder="+977 98XXXXXXXX"
                    style={inputStyle}
                    onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                    onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Emergency Contact</label>
                  <input
                    type="text"
                    value={form.emergency_contact}
                    onChange={e => setForm({ ...form, emergency_contact: e.target.value })}
                    placeholder="Name & phone number"
                    style={inputStyle}
                    onFocus={e => (e.target.style.border = '1.5px solid #14b8a6')}
                    onBlur={e => (e.target.style.border = '1.5px solid #e5e7eb')}
                  />
                </div>
              </div>

              {/* Payment method */}
              <div style={{ marginTop: '24px' }}>
                <label style={labelStyle}>Payment Method *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '4px' }}>
                  {[
                    { value: 'esewa', label: 'eSewa', color: '#16a34a' },
                    { value: 'khalti', label: 'Khalti', color: '#7c3aed' },
                    { value: 'stripe', label: 'Stripe', color: '#2563eb' },
                    { value: 'bank', label: 'Bank', color: '#0a2e45' },
                  ].map(m => (
                    <button
                      key={m.value}
                      onClick={() => setForm({ ...form, payment_method: m.value })}
                      style={{
                        padding: '12px 8px', borderRadius: '10px',
                        border: form.payment_method === m.value
                          ? `2px solid ${m.color}`
                          : '1.5px solid #e5e7eb',
                        background: form.payment_method === m.value
                          ? `${m.color}10`
                          : '#fff',
                        color: form.payment_method === m.value ? m.color : '#64748b',
                        fontSize: '13px', fontWeight: 700,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Review */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#0a2e45', margin: '0 0 24px' }}>
                Review & Confirm
              </h2>

              {/* Summary card */}
              <div style={{
                padding: '20px', borderRadius: '12px',
                background: '#f0fdfa', border: '1px solid rgba(20,184,166,0.2)',
                marginBottom: '20px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0d9488', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Booking Summary
                </div>
                {[
                  { label: 'Type', value: form.booking_type.toUpperCase() },
                  { label: 'Start Date', value: form.start_date || 'Not set' },
                  { label: 'End Date', value: form.end_date || 'Not set' },
                  { label: 'Participants', value: `${form.num_participants} person(s)` },
                  { label: 'Price per person', value: `$${form.unit_price}` },
                  { label: 'Payment', value: form.payment_method.toUpperCase() },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: i < 5 ? '1px solid rgba(20,184,166,0.1)' : 'none',
                  }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>{item.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0a2e45' }}>{item.value}</span>
                  </div>
                ))}

                {/* Total */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: '16px', paddingTop: '16px',
                  borderTop: '2px solid rgba(20,184,166,0.3)',
                }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0a2e45' }}>Total Amount</span>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#14b8a6' }}>
                    ${(form.unit_price * form.num_participants).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Participants summary */}
              {participants.length > 0 && (
                <div style={{
                  padding: '16px', borderRadius: '12px',
                  border: '1px solid #e8ecf0', marginBottom: '20px',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0a2e45', marginBottom: '10px' }}>
                    Participants ({participants.length})
                  </div>
                  {participants.map((p, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '12px', padding: '8px 0',
                      borderBottom: i < participants.length - 1 ? '1px solid #f1f5f9' : 'none',
                    }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '13px', fontWeight: 700, flexShrink: 0,
                      }}>{i + 1}</div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#0a2e45' }}>
                          {p.full_name || 'No name'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>
                          Age: {p.age || 'N/A'} · {p.nationality}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Terms */}
              <div style={{
                padding: '14px 16px', borderRadius: '10px',
                background: '#fefce8', border: '1px solid #fef08a',
                fontSize: '12px', color: '#854d0e',
                lineHeight: 1.5,
              }}>
                ⚠️ By confirming this booking you agree to our cancellation policy. Free cancellation up to 30 days before the start date. 50% refund within 30-15 days. No refund within 14 days.
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          <button
            onClick={handleBack}
            disabled={step === 0}
            style={{
              padding: '13px 28px', borderRadius: '10px',
              border: '1.5px solid #e5e7eb', background: '#fff',
              color: step === 0 ? '#94a3b8' : '#0a2e45',
              fontSize: '14px', fontWeight: 600,
              cursor: step === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            ← Back
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={handleNext}
              style={{
                padding: '13px 36px', borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #0f3d57, #14b8a6)',
                color: '#fff', fontSize: '14px', fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isPending}
              style={{
                padding: '13px 36px', borderRadius: '10px',
                border: 'none',
                background: isPending ? '#94a3b8' : 'linear-gradient(135deg, #14b8a6, #0d9488)',
                color: '#fff', fontSize: '14px', fontWeight: 700,
                cursor: isPending ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              {isPending ? (
                <>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                  Confirming...
                </>
              ) : '✓ Confirm Booking'}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}