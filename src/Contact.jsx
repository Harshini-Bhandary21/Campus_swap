import { useState } from "react";
import { NavBar, BottomBar } from "./Layout";

export default function Contact({ nav, goBack, activeTab, cartCount }) {
  const [form, setForm] = useState({ name: "Mark", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  if (sent)
    return (
      <div className="screen">
        <NavBar title="Contact" onBack={() => setSent(false)} />
        <div className="success-screen">
          <div className="success-icon">📬</div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            Message sent!
          </div>
          <p
            className="t-md"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Your message has been sent to our team.
            <br />
            Your problems will be sorted shortly.
          </p>
          <div
            style={{
              padding: "8px 0",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                fontWeight: 800,
              }}
            >
              Thank You !!
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => nav("dashboard", { tab: "home" })}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );

  return (
    <div className="screen">
      <NavBar title="Get in Touch" onBack={goBack} />

      <div className="scroll-area">
        {/* Contact card */}
        <div className="anim" style={{ margin: "20px 20px 0" }}>
          <div className="card">
            <div className="card-pad flex gap-14">
              <div
                style={{
                  width: 80,
                  height: 72,
                  borderRadius: "var(--r-md)",
                  background: "var(--surface-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  flexShrink: 0,
                }}
              >
                📚
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.8,
                  color: "var(--text-secondary)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 4,
                  }}
                >
                  Campus Swap
                </div>
                <a
                  href="mailto:Om@mitaoe.ac.in"
                  style={{
                    color: "var(--blue)",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Om@mitaoe.ac.in
                </a>
                <br />
                +91 82086 1xxxx
                <br />
                MIT Academy of Engineering
                <br />
                Alandi, Pune – 412105
              </div>
            </div>
          </div>
        </div>

        {/* Quick contact options */}
        <div
          className="anim d1 page-pad"
          style={{ paddingTop: 16, paddingBottom: 8 }}
        >
          <div className="split-3">
            {[
              ["📧", "Email"],
              ["📱", "WhatsApp"],
              ["📍", "Location"],
            ].map(([ico, label]) => (
              <button
                key={label}
                className="btn btn-ghost btn-sm flex-col"
                style={{ height: 64, gap: 4, borderRadius: "var(--r-lg)" }}
              >
                <span style={{ fontSize: 20 }}>{ico}</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Send mail form */}
        <div className="anim d2 page-pad" style={{ paddingTop: 8 }}>
          <div className="t-h2 mb-4">Send a message</div>
          <p className="t-sm mb-20" style={{ color: "var(--text-secondary)" }}>
            We typically respond within a few hours
          </p>

          <div className="flex-col gap-12">
            <div className="form-group">
              <label className="input-label">Your Name *</label>
              <input
                className="input"
                placeholder="First name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                style={{
                  borderColor: "var(--blue)",
                  boxShadow: "0 0 0 3px var(--blue-glow)",
                }}
              />
            </div>
            <div className="form-group">
              <label className="input-label">Email *</label>
              <input
                className="input"
                placeholder="your@email.com"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="input-label">Message</label>
              <textarea
                className="textarea"
                placeholder="Describe your issue or question…"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                style={{ minHeight: 120 }}
              />
            </div>
          </div>
        </div>

        <div style={{ padding: "0 20px 36px" }}>
          <button
            className="btn btn-primary btn-full btn-lg"
            onClick={() => form.email && setSent(true)}
          >
            Send Message 📨
          </button>
        </div>
      </div>

      <BottomBar active={activeTab} nav={nav} cartCount={cartCount} />
    </div>
  );
}
