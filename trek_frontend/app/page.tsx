import Link from "next/link";
import TrekCard from "@/components/trek/TrekCard";
import TourCard from "@/components/tour/TourCard";
import HeroSlider from "@/components/commom/HeroSlider";

async function getTreks() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/treks/", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.results || data || [];
  } catch {
    return [];
  }
}

async function getTours() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/tours/", {
      cache: "no-store",
    });
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

  const featuredTreks = (treks || [])
    .filter((t: any) => t.is_featured)
    .slice(0, 4);

  const featuredTours = (tours || [])
    .filter((t: any) => t.is_featured)
    .slice(0, 4);

  return (
    <main style={{ background: "#f8f9fb", minHeight: "100vh" }}>

      {/* HERO */}
      <HeroSlider />

      {/* ================= TREKS ================= */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "20px" }}>
          Featured Treks
        </h2>

        {featuredTreks.length === 0 ? (
          <EmptyState label="treks" />
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}>
            {featuredTreks.map((trek: any) => (
              <TrekCard key={trek.id} trek={trek} />
            ))}
          </div>
        )}
      </section>

      {/* ================= TOURS ================= */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "20px" }}>
          Featured Tours
        </h2>

        {featuredTours.length === 0 ? (
          <EmptyState label="tours" />
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}>
            {featuredTours.map((tour: any) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}
      </section>

    </main>
  );
}

/* ================= EMPTY STATE ================= */
function EmptyState({ label }: { label: string }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "60px",
      border: "1px dashed #ccc",
      borderRadius: "12px",
      background: "#fff",
    }}>
      <h3 style={{ marginBottom: "8px" }}>No {label} found</h3>
      <p style={{ color: "#666" }}>Add some from Django admin</p>
    </div>
  );
}