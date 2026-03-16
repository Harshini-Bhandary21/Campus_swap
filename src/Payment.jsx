import { useState } from "react";
import { NavBar } from "./Layout";

export default function Payment({ nav, cart }) {
  const [tab, setTab] = useState("credit");
  const [saveCard, setSaveCard] = useState(true);
  const [form, setForm] = useState({
    cardType: "",
    cardNum: "",
    name: "",
    expiry: "",
    cvv: "",
    fullName: "",
    postcode: "",
    city: "",
    country: "",
    phone: "",
  });
  const [step, setStep] = useState(1); // 1=payment, 2=address
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="screen">
      <NavBar title="Payment" onBack={() => nav("cart")} />

      {/* Step progress */}
      <div className="step-prog">
        <div className={`step-dot ${step >= 1 ? "active" : ""}`} />
        <div className={`step-line ${step >= 2 ? "done" : ""}`} />
        <div className={`step-dot ${step >= 2 ? "active" : ""}`} />
        <div className={`step-line`} />
        <div className="step-dot" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 20px 16px",
        }}
      >
        {["Payment", "Address", "Confirm"].map((s, i) => (
          <span
            key={s}
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: step === i + 1 ? "var(--blue)" : "var(--text-muted)",
              letterSpacing: 0.5,
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {step === 1 && (
        <div className="scroll-area">
          {/* Amount banner */}
          <div
            style={{
              margin: "0 20px 16px",
              padding: "14px 18px",
              background: "var(--blue)",
              borderRadius: "var(--r-lg)",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600 }}>Total to Pay</span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              ₹{total.toLocaleString()}
            </span>
          </div>

          <div className="tabs-bar">
            {["credit", "paypal", "applepay"].map((t, i) => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {["💳 Credit Card", "🅿️ PayPal", "🍎 Apple Pay"][i]}
              </button>
            ))}
          </div>

          {tab === "credit" && (
            <div className="anim">
              <div className="sec-band">
                <span className="t-caps">Card Details</span>
              </div>
              <div
                style={{
                  padding: "16px 20px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div className="form-group">
                  <label className="input-label">Card Type</label>
                  <select
                    className="select-f"
                    value={form.cardType}
                    onChange={(e) => set("cardType", e.target.value)}
                  >
                    <option value="">Select card type</option>
                    <option>Visa</option>
                    <option>Mastercard</option>
                    <option>RuPay</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="input-label">Card Number</label>
                  <input
                    className="input"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={form.cardNum}
                    onChange={(e) => set("cardNum", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Name on Card</label>
                  <input
                    className="input"
                    placeholder="As printed on card"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>
                <div className="split-2">
                  <div className="form-group">
                    <label className="input-label">Expiry</label>
                    <input
                      className="input"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={form.expiry}
                      onChange={(e) => set("expiry", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-label">CVV</label>
                    <input
                      className="input"
                      placeholder="•••"
                      maxLength={4}
                      value={form.cvv}
                      onChange={(e) => set("cvv", e.target.value)}
                      type="password"
                    />
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    padding: "0 2px",
                  }}
                >
                  ℹ Your CVV is the last 3 digits on the signature strip on the
                  back of your card.
                </p>
                <div className="divider" />
                <div
                  className="flex items-c justify-b"
                  style={{ padding: "4px 0" }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600 }}>
                    Save card for next time?
                  </span>
                  <button
                    className={`toggle ${saveCard ? "on" : ""}`}
                    onClick={() => setSaveCard((s) => !s)}
                  />
                </div>
              </div>
            </div>
          )}
          {tab === "paypal" && (
            <div
              className="anim"
              style={{
                padding: 32,
                textAlign: "center",
                color: "var(--text-muted)",
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>🅿️</div>
              <div className="t-h3 mb-8">Pay with PayPal</div>
              <p className="t-sm mb-24">
                You'll be redirected to PayPal to complete your purchase
                securely.
              </p>
              <button className="btn btn-primary btn-full">
                Continue to PayPal
              </button>
            </div>
          )}
          {tab === "applepay" && (
            <div
              className="anim"
              style={{
                padding: 32,
                textAlign: "center",
                color: "var(--text-muted)",
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>🍎</div>
              <div className="t-h3 mb-8">Apple Pay</div>
              <p className="t-sm mb-24">
                Use Face ID or Touch ID to pay instantly and securely.
              </p>
              <button className="btn btn-dark btn-full">
                Pay with Apple Pay
              </button>
            </div>
          )}
          <div style={{ padding: "20px 20px 32px" }}>
            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={() => setStep(2)}
            >
              Continue to Address →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="scroll-area">
          <div className="sec-band mt-4">
            <span className="t-caps">Billing Address</span>
          </div>
          <div
            style={{
              padding: "16px 20px 0",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div className="form-group">
              <label className="input-label">Full Name *</label>
              <input
                className="input"
                placeholder="Full name"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
              />
            </div>
            <div className="split-2">
              <div className="form-group">
                <label className="input-label">Postcode *</label>
                <input
                  className="input"
                  placeholder="412105"
                  value={form.postcode}
                  onChange={(e) => set("postcode", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="input-label">City *</label>
                <input
                  className="input"
                  placeholder="Pune"
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="input-label">Country</label>
              <select
                className="select-f"
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
              >
                <option value="">Select country</option>
                <option>India</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="input-label">Phone Number</label>
              <div className="input-icon-wrap">
                <span className="ico">📱</span>
                <input
                  className="input"
                  placeholder="+91 82086 1xxxx"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
            </div>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              ℹ Please use your mobile number
            </p>
          </div>
          <div
            style={{
              padding: "20px 20px 32px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              ← Back
            </button>
            <button className="btn btn-primary" onClick={() => nav("paynow")}>
              Pay ₹{total.toLocaleString()} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
