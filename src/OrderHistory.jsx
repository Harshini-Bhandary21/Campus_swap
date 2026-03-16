import { NavBar, BottomBar } from "./Layout";

const STATUS_COLOR = {
  Delivered: "badge-green",
  "In Transit": "badge-blue",
  Cancelled: "badge-red",
  Pending: "badge-amber",
};

export default function OrderHistory({
  nav,
  goBack,
  orders,
  cartCount,
  activeTab,
  paymentDone,
}) {
  return (
    <div className="screen">
      <NavBar
        title="My Orders"
        onBack={() => nav("dashboard", { tab: "home" })}
      />

      {/* Payment success banner */}
      {paymentDone && (
        <div
          className="anim"
          style={{
            background: "var(--green)",
            color: "#fff",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>✅</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>
              Payment Successful!
            </div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>
              Your order has been placed
            </div>
          </div>
        </div>
      )}

      <div className="scroll-area">
        {orders.length === 0 ? (
          <div
            style={{
              padding: "80px 32px",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 16 }}>📦</div>
            <div className="t-h2 mb-8">No orders yet</div>
            <p className="t-sm mb-24">
              Your orders will appear here once you make a purchase
            </p>
            <button
              className="btn btn-primary"
              onClick={() => nav("products", { tab: "products" })}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          orders.map((order, i) => (
            <div
              key={order.id}
              className={`card anim d${Math.min(i + 1, 5)}`}
              style={{ margin: "12px 20px 0", overflow: "hidden" }}
            >
              {/* Order header */}
              <div
                style={{
                  background: "var(--surface-2)",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    ORDER
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {order.id}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      marginBottom: 4,
                    }}
                  >
                    {order.date}
                  </div>
                  <span
                    className={`badge ${STATUS_COLOR[order.status] || "badge-navy"}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              {/* Items */}
              {order.items.map((item, j) => (
                <div key={j} className="order-row">
                  <div className="order-thumb">{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        color: "var(--blue)",
                        fontSize: 15,
                      }}
                    >
                      ₹{item.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              {/* Footer */}
              <div
                style={{
                  padding: "12px 16px",
                  background: "var(--surface-2)",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    fontWeight: 600,
                  }}
                >
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 16,
                  }}
                >
                  Total: ₹{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
        <div style={{ height: 28 }} />
      </div>

      <BottomBar active={activeTab} nav={nav} cartCount={cartCount} />
    </div>
  );
}
