import { NavBar } from "./Layout";

export default function Cart({ nav, goBack, cart, removeFromCart, updateQty }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cart.length > 0 ? 0 : 0;
  const total = subtotal + delivery;

  return (
    <div className="screen">
      <NavBar
        title={`Cart (${cart.length})`}
        onBack={() => nav("products", { tab: "products" })}
      />

      <div className="scroll-area">
        {cart.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px 32px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <div className="t-h2 mb-8">Cart is empty</div>
            <p
              className="t-sm mb-24"
              style={{ color: "var(--text-secondary)" }}
            >
              Add some items from the shop to get started
            </p>
            <button
              className="btn btn-primary"
              onClick={() => nav("products", { tab: "products" })}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div style={{ padding: "16px 20px 4px" }}>
              {cart.map((item, i) => (
                <div
                  key={item.id}
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
                        flexShrink: 0,
                      }}
                    >
                      {item.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 11,
                          color: "var(--text-muted)",
                          fontWeight: 700,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 2,
                        }}
                      >
                        {item.cat}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          marginBottom: 2,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: "var(--blue)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        ₹{(item.price * item.qty).toLocaleString()}
                      </div>
                      <div className="flex items-c gap-12 mt-8">
                        <div className="qty-ctrl">
                          <button onClick={() => updateQty(item.id, -1)}>
                            −
                          </button>
                          <span className="qty-num">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}>
                            +
                          </button>
                        </div>
                        <button
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--red)",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div style={{ padding: "0 20px 20px" }}>
              <div className="card">
                <div className="card-pad">
                  <div className="t-caps mb-12">Order Summary</div>
                  <div className="info-row">
                    <span className="info-key">Subtotal</span>
                    <span className="info-val">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-key">Campus Pickup</span>
                    <span
                      className="info-val"
                      style={{ color: "var(--green)", fontWeight: 700 }}
                    >
                      FREE
                    </span>
                  </div>
                  <div className="info-row" style={{ paddingTop: 12 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 800,
                        color: "var(--blue)",
                      }}
                    >
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon */}
            <div style={{ padding: "0 20px 20px" }}>
              <div className="flex gap-8">
                <input
                  className="input"
                  placeholder="Promo code"
                  style={{ flex: 1 }}
                />
                <button
                  className="btn btn-ghost"
                  style={{ padding: "13px 16px" }}
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div
          style={{
            padding: "12px 20px 24px",
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => nav("payment")}
          >
            Proceed to Payment — ₹{total.toLocaleString()}
          </button>
        </div>
      )}
    </div>
  );
}
