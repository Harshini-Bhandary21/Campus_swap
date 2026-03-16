import { NavBar, BottomBar } from "./Layout";

export default function Wishlist({
  nav,
  goBack,
  wishlist,
  toggleWishlist,
  addToCart,
  cartCount,
  activeTab,
  setSelectedProduct,
}) {
  return (
    <div className="screen">
      <NavBar
        title={`Wishlist (${wishlist.length})`}
        onBack={() => nav("dashboard", { tab: "home" })}
      />

      <div className="scroll-area">
        {wishlist.length === 0 ? (
          <div style={{ padding: "80px 32px", textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🤍</div>
            <div className="t-h2 mb-8">Nothing saved yet</div>
            <p
              className="t-sm mb-24"
              style={{ color: "var(--text-secondary)" }}
            >
              Tap the heart icon on any item to save it here
            </p>
            <button
              className="btn btn-primary"
              onClick={() => nav("products", { tab: "products" })}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div style={{ padding: "16px 20px" }}>
            {wishlist.map((p, i) => (
              <div
                key={p.id}
                className={`card mb-12 anim d${Math.min(i + 1, 5)}`}
              >
                <div className="card-pad flex gap-14">
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "var(--r-md)",
                      background: "var(--surface-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 34,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                    onClick={() => {
                      setSelectedProduct(p);
                      nav("detail");
                    }}
                  >
                    {p.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {p.cat}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        marginTop: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        color: "var(--blue)",
                        fontSize: 16,
                        marginTop: 4,
                      }}
                    >
                      ₹{p.price.toLocaleString()}
                    </div>
                    <div className="flex gap-8 mt-8">
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => addToCart(p)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn-icon"
                        style={{
                          border: "none",
                          background: "none",
                          color: "var(--red)",
                          fontSize: 20,
                        }}
                        onClick={() => toggleWishlist(p)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>

      <BottomBar active={activeTab} nav={nav} cartCount={cartCount} />
    </div>
  );
}
