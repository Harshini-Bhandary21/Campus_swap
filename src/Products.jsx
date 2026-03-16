import { useState } from "react";
import { NavBar, BottomBar } from "./Layout";

const CATS = ["All", "Books", "Electronics", "Clothing", "Stationery"];

export default function Products({
  nav,
  cartCount,
  activeTab,
  products,
  addToCart,
  wishlist,
  toggleWishlist,
  setSelectedProduct,
}) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("default");

  const wishedIds = new Set(wishlist.map((i) => i.id));

  let list = products.filter((p) => {
    const matchCat = cat === "All" || p.cat === cat;
    const matchSrch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSrch;
  });

  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  const openDetail = (p) => {
    setSelectedProduct(p);
    nav("detail");
  };

  return (
    <div className="screen">
      <NavBar
        title="Browse"
        right={
          <button
            className={`nav-btn ${cartCount > 0 ? "has-dot" : ""}`}
            onClick={() => nav("cart", { tab: "products" })}
          >
            🛒
          </button>
        }
      />

      {/* Search */}
      <div
        style={{
          padding: "12px 20px 8px",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 15,
              pointerEvents: "none",
              color: "var(--text-muted)",
            }}
          >
            🔍
          </span>
          <input
            className="input"
            style={{
              paddingLeft: 44,
              paddingTop: 11,
              paddingBottom: 11,
              borderRadius: "var(--r-full)",
            }}
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div
        style={{
          paddingTop: 10,
          paddingBottom: 6,
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="chips-row">
          {CATS.map((c) => (
            <button
              key={c}
              className={`chip ${c === cat ? "chip-on" : "chip-off"}`}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Sort + count */}
      <div
        style={{
          padding: "10px 20px",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}
        >
          {list.length} listings
        </span>
        <select
          className="select-f"
          style={{ width: "auto", padding: "6px 32px 6px 12px", fontSize: 13 }}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      <div className="scroll-area" style={{ padding: "0 16px 16px" }}>
        {list.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 24px",
              color: "var(--text-muted)",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <div className="t-h3 mb-8">No results</div>
            <p className="t-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="split-2" style={{ marginTop: 4 }}>
            {list.map((p, i) => (
              <div key={p.id} className={`p-card anim d${Math.min(i + 1, 6)}`}>
                <div
                  className="p-card-img"
                  style={{ position: "relative" }}
                  onClick={() => openDetail(p)}
                >
                  {p.emoji}
                  <button
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: 30,
                      height: 30,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 15,
                      transition: "transform 0.15s",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p);
                    }}
                  >
                    {wishedIds.has(p.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="p-card-body" onClick={() => openDetail(p)}>
                  <div className="p-card-cat">{p.cat}</div>
                  <div className="p-card-name">{p.name}</div>
                  <div className="flex items-c justify-b mt-4">
                    <div className="p-card-price">
                      ₹{p.price.toLocaleString()}
                    </div>
                    <span
                      className={`badge ${p.condition === "New" ? "badge-green" : p.condition === "Good" ? "badge-blue" : "badge-amber"}`}
                    >
                      {p.condition}
                    </span>
                  </div>
                  <button
                    className="btn btn-primary btn-full btn-sm mt-8"
                    style={{ borderRadius: "var(--r-md)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 16 }} />
      </div>

      <BottomBar active={activeTab} nav={nav} cartCount={cartCount} />
    </div>
  );
}
