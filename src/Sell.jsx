import { useState } from "react";
import { NavBar } from "./Layout";

export default function Sell({
  nav,
  goBack,
  products,
  setProducts,
  showToast,
  activeTab,
}) {
  const [form, setForm] = useState({
    name: "",
    cat: "",
    price: "",
    condition: "Good",
    desc: "",
    emoji: "📦",
  });
  const [done, setDone] = useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const emojis = [
    "📚",
    "📘",
    "🥼",
    "🔢",
    "📐",
    "🧭",
    "💻",
    "⚛️",
    "🧪",
    "📝",
    "🎒",
    "🏋️",
  ];

  const submit = () => {
    if (!form.name || !form.cat || !form.price) {
      showToast("Please fill required fields");
      return;
    }
    const newProduct = {
      id: Date.now(),
      name: form.name,
      cat: form.cat,
      price: parseInt(form.price),
      emoji: form.emoji,
      condition: form.condition,
      seller: "You",
      rating: 0,
      reviews: 0,
      desc: form.desc,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setDone(true);
  };

  if (done)
    return (
      <div className="screen">
        <div className="success-screen">
          <div className="success-icon">✅</div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Listed!
            <br />
            You're good.
          </div>
          <p className="t-md" style={{ color: "var(--text-secondary)" }}>
            Your item is now live on Campus Swap. Buyers can find it in the
            shop!
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: 8 }}
            onClick={() => nav("products", { tab: "products" })}
          >
            View Listings
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setDone(false);
              setForm({
                name: "",
                cat: "",
                price: "",
                condition: "Good",
                desc: "",
                emoji: "📦",
              });
            }}
          >
            List Another
          </button>
        </div>
      </div>
    );

  return (
    <div className="screen">
      <NavBar title="List an Item" onBack={goBack} />

      <div className="scroll-area">
        <div className="page-pad flex-col gap-16">
          {/* Emoji picker */}
          <div className="form-group">
            <label className="input-label">Item Icon</label>
            <div className="flex" style={{ gap: 8, flexWrap: "wrap" }}>
              {emojis.map((e) => (
                <button
                  key={e}
                  onClick={() => set("emoji", e)}
                  style={{
                    width: 44,
                    height: 44,
                    fontSize: 22,
                    border: "2px solid",
                    borderColor:
                      form.emoji === e ? "var(--blue)" : "var(--border)",
                    background:
                      form.emoji === e ? "var(--blue-glow)" : "var(--surface)",
                    borderRadius: "var(--r-md)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Item Name *</label>
            <input
              className="input"
              placeholder="e.g. Casio FX-991ES Calculator"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </div>

          <div className="split-2">
            <div className="form-group">
              <label className="input-label">Category *</label>
              <select
                className="select-f"
                value={form.cat}
                onChange={(e) => set("cat", e.target.value)}
              >
                <option value="">Select…</option>
                {[
                  "Books",
                  "Electronics",
                  "Clothing",
                  "Stationery",
                  "Sports",
                  "Misc",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="input-label">Price (₹) *</label>
              <input
                className="input"
                placeholder="350"
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Condition</label>
            <div className="flex gap-8" style={{ flexWrap: "wrap" }}>
              {["New", "Good", "Fair"].map((c) => (
                <button
                  key={c}
                  className={`chip ${form.condition === c ? "chip-on" : "chip-off"}`}
                  onClick={() => set("condition", c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="input-label">Description</label>
            <textarea
              className="textarea"
              placeholder="Describe the item, its condition, any accessories included…"
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
              style={{ minHeight: 110 }}
            />
          </div>

          {/* Preview */}
          {form.name && (
            <div className="card anim">
              <div className="card-pad">
                <div className="t-caps mb-10">Preview</div>
                <div className="flex items-c gap-12">
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "var(--r-md)",
                      background: "var(--surface-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    }}
                  >
                    {form.emoji}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>
                      {form.name || "Item Name"}
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: 12 }}>
                      {form.cat || "Category"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        color: "var(--blue)",
                        fontSize: 16,
                      }}
                    >
                      {form.price
                        ? `₹${parseInt(form.price).toLocaleString()}`
                        : "₹—"}
                    </div>
                  </div>
                  <div className="spacer" />
                  <span
                    className={`badge ${form.condition === "New" ? "badge-green" : form.condition === "Good" ? "badge-blue" : "badge-amber"}`}
                  >
                    {form.condition}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "8px 20px 36px" }}>
          <button className="btn btn-primary btn-full btn-lg" onClick={submit}>
            Publish Listing 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
