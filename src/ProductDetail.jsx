import { useState } from "react";
import { NavBar } from "./Layout";

export default function ProductDetail({
  nav,
  goBack,
  selectedProduct,
  addToCart,
  wishlist,
  toggleWishlist,
  showToast,
}) {
  const p = selectedProduct || {
    id: 4,
    name: "Casio FX-991ES Plus Calculator",
    cat: "Electronics",
    price: 400,
    emoji: "🔢",
    condition: "Good",
    seller: "Neha P.",
    rating: 4.7,
    reviews: 19,
    desc: "Scientific calculator in perfect working condition. All functions intact, comes with cover.",
  };
  const [qty, setQty] = useState(1);
  const wished = wishlist.find((i) => i.id === p.id);

  return (
    <div className="screen">
      <NavBar
        title=""
        onBack={goBack}
        right={
          <button
            className="nav-btn ghost"
            style={{ fontSize: 20 }}
            onClick={() => toggleWishlist(p)}
          >
            {wished ? "❤️" : "🤍"}
          </button>
        }
      />

      <div className="scroll-area">
        {/* Product image hero */}
        <div
          style={{
            background: "var(--surface-2)",
            height: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 100,
            position: "relative",
          }}
        >
          {p.emoji}
          <span
            className={`badge ${p.condition === "New" ? "badge-green" : p.condition === "Good" ? "badge-blue" : "badge-amber"}`}
            style={{ position: "absolute", top: 16, right: 16, fontSize: 12 }}
          >
            {p.condition}
          </span>
        </div>

        <div className="page-pad">
          <div className="anim">
            <div className="t-caps mb-4">{p.cat}</div>
            <div className="t-h2 mb-8">{p.name}</div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 800,
                color: "var(--blue)",
                marginBottom: 12,
              }}
            >
              ₹{p.price.toLocaleString()}
            </div>

            {/* Rating */}
            <div className="flex items-c gap-8 mb-20">
              <span className="stars">
                {"★".repeat(Math.floor(p.rating))}
                {"☆".repeat(5 - Math.floor(p.rating))}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{p.rating}</span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                ({p.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="t-h3 mb-8">Description</div>
            <p
              className="t-md mb-20"
              style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
            >
              {p.desc}
            </p>

            {/* Seller info */}
            <div className="card mb-20">
              <div className="card-pad flex items-c gap-12">
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,var(--blue),var(--navy))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                  }}
                >
                  {p.seller?.[0] || "S"}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    Seller
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>
                    {p.seller}
                  </div>
                </div>
                <div className="spacer" />
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => nav("contact")}
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="card mb-24">
              <div className="card-pad">
                <div className="t-caps mb-12">Item Details</div>
                {[
                  ["Condition", p.condition],
                  ["Category", p.cat],
                  ["Listed", p.seller],
                ].map(([k, v]) => (
                  <div className="info-row" key={k}>
                    <span className="info-key">{k}</span>
                    <span className="info-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QTY + Add to cart */}
            <div className="flex items-c gap-12 mb-12">
              <div className="qty-ctrl">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span className="qty-num">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  addToCart(p, qty);
                  goBack();
                }}
              >
                Add to Cart — ₹{(p.price * qty).toLocaleString()}
              </button>
            </div>
            <button
              className="btn btn-ghost btn-full"
              onClick={() => {
                addToCart(p, qty);
                nav("cart", { tab: "products" });
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
