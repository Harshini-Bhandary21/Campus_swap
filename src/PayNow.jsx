import { NavBar } from "./Layout";

export default function PayNow({
  nav,
  cart,
  setOrders,
  orders,
  setPaymentDone,
}) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const confirmPayment = () => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      items: cart.map((i) => ({
        name: i.name,
        emoji: i.emoji,
        price: i.price * i.qty,
      })),
      total,
      status: "In Transit",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setPaymentDone(true);
    nav("orders", { tab: "orders" });
  };

  return (
    <div className="screen">
      <div className="nav-bar" style={{ background: "var(--blue)" }}>
        <button className="nav-btn ghost">☰</button>
        <span
          className="nav-title"
          style={{ fontSize: 16, letterSpacing: 0.5 }}
        >
          Pay Now
        </span>
        <div style={{ width: 38 }} />
      </div>

      <div className="scroll-area">
        {/* QR code */}
        <div
          style={{
            padding: "28px 20px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="anim"
            style={{
              background: "var(--surface)",
              borderRadius: "var(--r-xl)",
              padding: 16,
              boxShadow: "var(--shadow-lg)",
              marginBottom: 20,
            }}
          >
            <svg width="160" height="160" viewBox="0 0 160 160">
              {/* Corners */}
              <rect x="8" y="8" width="44" height="44" rx="5" fill="#0f1c2e" />
              <rect x="14" y="14" width="32" height="32" rx="3" fill="#fff" />
              <rect x="22" y="22" width="16" height="16" fill="#0f1c2e" />
              <rect
                x="108"
                y="8"
                width="44"
                height="44"
                rx="5"
                fill="#0f1c2e"
              />
              <rect x="114" y="14" width="32" height="32" rx="3" fill="#fff" />
              <rect x="122" y="22" width="16" height="16" fill="#0f1c2e" />
              <rect
                x="8"
                y="108"
                width="44"
                height="44"
                rx="5"
                fill="#0f1c2e"
              />
              <rect x="14" y="114" width="32" height="32" rx="3" fill="#fff" />
              <rect x="22" y="122" width="16" height="16" fill="#0f1c2e" />
              {/* Data */}
              {[
                [60, 8],
                [68, 8],
                [76, 8],
                [84, 8],
                [60, 16],
                [84, 16],
                [76, 24],
                [60, 32],
                [68, 32],
                [84, 32],
                [60, 40],
                [68, 40],
                [76, 40],
                [84, 40],
                [8, 60],
                [24, 60],
                [40, 60],
                [8, 68],
                [32, 68],
                [8, 76],
                [16, 76],
                [32, 76],
                [40, 76],
                [8, 84],
                [24, 84],
                [40, 84],
                [8, 92],
                [16, 92],
                [40, 92],
                [60, 60],
                [76, 60],
                [84, 60],
                [60, 68],
                [68, 68],
                [76, 68],
                [84, 76],
                [60, 84],
                [76, 84],
                [84, 84],
                [108, 60],
                [116, 60],
                [132, 60],
                [140, 60],
                [108, 68],
                [124, 68],
                [140, 68],
                [116, 76],
                [132, 76],
                [108, 84],
                [116, 84],
                [124, 84],
                [132, 84],
                [108, 92],
                [124, 92],
                [60, 108],
                [76, 108],
                [84, 108],
                [100, 108],
                [60, 116],
                [68, 116],
                [100, 116],
                [76, 124],
                [84, 124],
                [100, 124],
                [60, 132],
                [68, 132],
                [84, 132],
                [100, 132],
                [60, 140],
                [76, 140],
                [92, 140],
                [100, 140],
              ].map(([x, y], k) => (
                <rect key={k} x={x} y={y} width="7" height="7" fill="#0f1c2e" />
              ))}
            </svg>
          </div>

          {/* Amount */}
          <div
            className="anim d1 card"
            style={{
              width: "100%",
              padding: "18px 20px",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                marginBottom: 4,
              }}
            >
              UX Design Online Course
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              ₹{total.toLocaleString()}
            </div>
            <span className="badge badge-blue mt-8">+$1,200.00 equivalent</span>
          </div>
        </div>

        {/* Payment methods */}
        <div className="sec-band anim d2">
          <span className="t-caps">Choose Payment Method</span>
        </div>
        <div
          className="card anim d2"
          style={{
            margin: "0 20px 16px",
            borderRadius: "var(--r-lg)",
            overflow: "hidden",
          }}
        >
          <div className="pay-row">
            <div className="flex items-c gap-14">
              <div className="pay-icon">💳</div>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  UPI / Wallet
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>
                  0873 6903 86
                </div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={confirmPayment}>
              PAY NOW
            </button>
          </div>
          <div className="divider" style={{ margin: "0 18px" }} />
          <div className="pay-row">
            <div className="flex items-c gap-14">
              <div className="pay-icon">🏦</div>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  VISA
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>9827-XXXX</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  Your Name
                </div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={confirmPayment}>
              PAY NOW
            </button>
          </div>
        </div>

        <div
          style={{
            padding: "4px 20px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <button className="btn btn-ghost" onClick={() => nav("payment")}>
            ← Back
          </button>
          <button className="btn btn-primary" onClick={confirmPayment}>
            Payment Done ✓
          </button>
        </div>
      </div>
    </div>
  );
}
