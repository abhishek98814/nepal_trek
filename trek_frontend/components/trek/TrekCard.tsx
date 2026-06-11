import Link from "next/link";

export default function TrekCard({ trek }: any) {
  const image =
    trek.cover_image ||
    trek.images?.[0]?.image ||
    trek.banner ||
    "/placeholder.jpg";

  return (
    <Link href={`/trek/${trek.slug}`} style={{ textDecoration: "none" }}>
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
            {trek.title}
          </h3>

          <p style={{ fontSize: "13px", color: "#666" }}>
            📍 {trek.location || trek.destination}
          </p>

          <p style={{ fontWeight: 700, marginTop: "8px" }}>
            ${trek.price || trek.price_per_person}
          </p>
        </div>
      </div>
    </Link>
  );
}