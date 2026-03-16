import { NavBar, BottomBar } from "./Layout";

export default function Profile({
  nav,
  cartCount,
  activeTab,
  products,
  orders,
}) {
  const myListings = products.filter((p) => p.seller === "You");

  return (
    <div className="screen">
      <NavBar
        logo="CAMPUS SWAP"
        right={
          <button className="nav-btn" onClick={() => nav("signin")}>
            🚪
          </button>
        }
      />

      <div className="scroll-area">
        {/* Profile header */}
        <div
          style={{
            background:
              "linear-gradient(160deg,var(--navy) 0%,var(--navy-mid) 100%)",
            padding: "28px 20px 32px",
          }}
        >
          <div className="flex items-c gap-16 anim">
            <div className="avatar">M</div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                Mark Johnson
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 2,
                }}
              >
                mark@mitaoe.ac.in
              </div>
              <span
                className="badge badge-blue mt-8"
                style={{ marginTop: 6, display: "inline-block" }}
              >
                MIT AOE Student
              </span>
            </div>
          </div>

          {/* Stats */}
          <div
            className="flex anim d1"
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {[
              [orders.length, "Orders"],
              [myListings.length, "Listings"],
              ["4.9★", "Rating"],
            ].map(([val, label]) => (
              <div key={label} className="stat-cell">
                <div className="stat-val" style={{ color: "#fff" }}>
                  {val}
                </div>
                <div
                  className="stat-label"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Listings */}
        <div className="page-pad anim d2">
          <div className="sec-hd">
            <span className="sec-title">My Listings</span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => nav("sell", { tab: "profile" })}
            >
              + Sell Item
            </button>
          </div>
          {myListings.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px",
                background: "var(--surface-2)",
                borderRadius: "var(--r-lg)",
                color: "var(--text-muted)",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>🏪</div>
              <p className="t-sm">
                No listings yet.
                <br />
                Start selling to earn money!
              </p>
            </div>
          ) : (
            myListings.map((p) => (
              <div
                key={p.id}
                className="flex items-c gap-12 mb-12 card card-pad"
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--r-md)",
                    background: "var(--surface-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}
                >
                  {p.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {p.cat}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      color: "var(--blue)",
                    }}
                  >
                    ₹{p.price.toLocaleString()}
                  </div>
                  <span
                    className={`badge ${p.condition === "New" ? "badge-green" : p.condition === "Good" ? "badge-blue" : "badge-amber"}`}
                  >
                    {p.condition}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Menu items */}
        <div style={{ margin: "0 20px 20px" }} className="anim d3">
          <div className="card">
            {[
              ["📦", "My Orders", () => nav("orders", { tab: "orders" })],
              ["♥", "Wishlist", () => nav("wishlist")],
              ["📞", "Contact Support", () => nav("contact")],
              ["🔒", "Privacy & Security", null],
              ["❓", "FAQ", null],
              ["🚪", "Sign Out", () => nav("signin")],
            ].map(([ico, label, action], i) => (
              <div key={label}>
                <button
                  style={{
                    width: "100%",
                    padding: "15px 18px",
                    background: "none",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    cursor: "pointer",
                    transition: "background 0.15s",
                    textAlign: "left",
                    fontFamily: "var(--font-body)",
                    borderRadius:
                      i === 0
                        ? "var(--r-lg) var(--r-lg) 0 0"
                        : i === 5
                          ? "0 0 var(--r-lg) var(--r-lg)"
                          : "0",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--surface-2)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                  onClick={action}
                >
                  <span style={{ fontSize: 20 }}>{ico}</span>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color:
                        label === "Sign Out"
                          ? "var(--red)"
                          : "var(--text-primary)",
                    }}
                  >
                    {label}
                  </span>
                  <span className="spacer" />
                  <span style={{ color: "var(--text-muted)", fontSize: 18 }}>
                    ›
                  </span>
                </button>
                {i < 5 && (
                  <div className="divider" style={{ margin: "0 16px" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      <BottomBar active={activeTab} nav={nav} cartCount={cartCount} />
    </div>
  );
}
