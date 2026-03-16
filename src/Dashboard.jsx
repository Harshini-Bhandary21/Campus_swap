import { NavBar, BottomBar } from "./Layout";

export default function Dashboard({
  nav,
  cartCount,
  activeTab,
  setActiveTab,
  products,
  wishlist,
}) {
  const featured = products.slice(0, 4);

  return (
    <div className="screen">
      <NavBar
        logo="CAMPUS SWAP"
        right={
          <div className="flex gap-8">
            <button
              className={`nav-btn has-dot`}
              onClick={() => nav("cart", { tab: "products" })}
            >
              🛒
            </button>
          </div>
        }
      />

      <div className="scroll-area">
        {/* Greeting */}
        <div className="page-pad" style={{ paddingBottom: 12 }}>
          <div className="anim">
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 0.5,
                marginBottom: 2,
              }}
            >
              Good morning 👋
            </div>
            <div className="t-h1">Hey, Mark!</div>
          </div>
        </div>

        {/* Search bar */}
        <div className="anim d1" style={{ padding: "0 20px 16px" }}>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16,
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              className="input"
              placeholder="Search books, calculators, lab coats…"
              style={{
                paddingLeft: 44,
                borderRadius: "var(--r-full)",
                background: "var(--surface)",
              }}
              onClick={() => nav("products", { tab: "products" })}
              readOnly
            />
          </div>
        </div>

        {/* Hero cards */}
        <div
          className="flex-col gap-12 anim d2"
          style={{ padding: "0 20px 20px" }}
        >
          {/* Buy hero */}
          <div
            className="hero-card"
            style={{
              background: "linear-gradient(135deg,#1a2d45 0%,#2563eb 100%)",
            }}
            onClick={() => nav("products", { tab: "products" })}
          >
            <div className="hero-body" style={{ color: "#fff" }}>
              <div className="hero-tag">Shop Now</div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                Buy &amp; swap
                <br />
                campus essentials
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 16,
                }}
              >
                Books, instruments, clothing &amp; more
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {["📚", "🔢", "🥼", "📐"].map((e) => (
                  <span
                    key={e}
                    style={{
                      fontSize: 24,
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))",
                    }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sell hero */}
          <div
            className="hero-card"
            style={{
              background: "linear-gradient(135deg,#0f1c2e 0%,#243a56 100%)",
            }}
            onClick={() => nav("sell", { tab: "profile" })}
          >
            <div
              className="hero-body"
              style={{
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="hero-tag">Earn Money</div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 800,
                    marginBottom: 6,
                  }}
                >
                  Sell your items
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                  Turn old stuff into cash
                </p>
              </div>
              <div style={{ fontSize: 52 }}>💵</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 20 }}>
          <div
            className="page-pad"
            style={{ paddingTop: 0, paddingBottom: 10 }}
          >
            <div className="sec-hd anim d2">
              <span className="sec-title">Categories</span>
            </div>
          </div>
          <div className="chips-row anim d3">
            {[
              "All",
              "Books",
              "Electronics",
              "Clothing",
              "Stationery",
              "Sports",
              "Misc",
            ].map((c) => (
              <button
                key={c}
                className={`chip ${c === "All" ? "chip-on" : "chip-off"}`}
                onClick={() => nav("products", { tab: "products" })}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured products */}
        <div className="page-pad" style={{ paddingTop: 4 }}>
          <div className="sec-hd anim d3">
            <span className="sec-title">Featured Listings</span>
            <button
              className="see-all"
              onClick={() => nav("products", { tab: "products" })}
            >
              See all →
            </button>
          </div>
          <div className="split-2">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className={`p-card anim d${i + 2}`}
                onClick={() => {
                  nav("detail");
                }}
              >
                <div className="p-card-img">{p.emoji}</div>
                <div className="p-card-body">
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div className="page-pad anim d5">
          <div className="card">
            <div className="card-pad">
              <div className="t-caps mb-12">Campus Swap Stats</div>
              <div className="split-3">
                {[
                  ["1,240+", "Listings"],
                  ["580+", "Students"],
                  ["₹2.4L", "Traded"],
                ].map(([v, l]) => (
                  <div key={l} className="text-c">
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 800,
                      }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        marginTop: 2,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      <BottomBar active={activeTab} nav={nav} cartCount={cartCount} />
    </div>
  );
}
