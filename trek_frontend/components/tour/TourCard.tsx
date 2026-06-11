import Link from "next/link";

export default function TourCard({ tour }: any) {
  const image =
    tour.cover_image ||
    tour.images?.[0]?.image ||
    "/placeholder.jpg";

  return (
    <Link href={`/tours/${tour.slug}`} style={{ textDecoration: "none" }}>
      <div style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        background: "#fff",
        cursor: "pointer",
      }}>

        {/* IMAGE */}
        <div
          style={{
            height: "200px",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* CONTENT */}
        <div style={{ padding: "14px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
            {tour.title}
          </h3>

          <p style={{ fontSize: "13px", color: "#666" }}>
            📍 {tour.destination}
          </p>

          <p style={{ fontWeight: 700, marginTop: "8px" }}>
            ${tour.price_per_person}
          </p>
        </div>
      </div>
    </Link>
  );
}