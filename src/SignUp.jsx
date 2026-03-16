import { useState } from "react";

export default function SignUp({ nav }) {
  const [form, setForm] = useState({ email:"", password:"", repeat:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const hasLen = form.password.length >= 8;
  const hasNum = /\d/.test(form.password);
  const match  = form.password && form.password === form.repeat;

  return (
    <div className="screen" style={{ background:"var(--navy)" }}>
      <div style={{ padding:"48px 32px 28px", textAlign:"center" }}>
        <div className="anim" style={{ fontFamily:"var(--font-display)", fontSize:40, fontWeight:800, color:"#fff", letterSpacing:1, lineHeight:1.0 }}>
          CAMPUS<br/>SWAP
        </div>
      </div>

      <div className="anim d1" style={{ flex:1, background:"var(--bg)", borderRadius:"28px 28px 0 0", padding:"32px 28px 48px", display:"flex", flexDirection:"column" }}>
        <div className="t-h2 mb-8">Create account ✨</div>
        <p className="t-sm mb-24" style={{ color:"var(--text-secondary)" }}>Join thousands of MIT AOE students buying &amp; selling</p>

        <div className="flex-col gap-12 mb-16">
          <div className="form-group">
            <label className="input-label">Email</label>
            <input className="input" placeholder="your@mitaoe.ac.in" type="email" value={form.email} onChange={e=>set("email",e.target.value)} />
          </div>
          <div className="form-group">
            <label className="input-label">Choose Password</label>
            <input className="input" placeholder="Min 8 characters" type="password" value={form.password} onChange={e=>set("password",e.target.value)} />
          </div>
          <div className="form-group">
            <label className="input-label">Repeat Password</label>
            <input className="input" placeholder="Repeat password" type="password" value={form.repeat} onChange={e=>set("repeat",e.target.value)} />
          </div>
        </div>

        {/* Validation pills */}
        <div className="flex gap-8 mb-20" style={{ flexWrap:"wrap" }}>
          {[
            [hasLen, "8+ characters"],
            [hasNum, "Has number"],
            [match,  "Passwords match"],
          ].map(([ok, label]) => (
            <span key={label} style={{
              display:"inline-flex", alignItems:"center", gap:5,
              padding:"5px 12px", borderRadius:"var(--r-full)",
              fontSize:12, fontWeight:600,
              background: ok ? "rgba(16,185,129,0.12)" : "var(--surface-2)",
              color: ok ? "var(--green)" : "var(--text-muted)",
              border: `1.5px solid ${ok ? "rgba(16,185,129,0.3)" : "var(--border)"}`,
              transition:"all 0.2s"
            }}>
              {ok ? "✓" : "○"} {label}
            </span>
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg mb-16" onClick={() => nav("dashboard",{tab:"home"})}>
          Create account
        </button>

        <p className="text-c t-sm mb-16" style={{ color:"var(--text-muted)" }}>
          By signing up you agree to our <span className="c-blue fw-6" style={{cursor:"pointer"}}>Terms</span> &amp; <span className="c-blue fw-6" style={{cursor:"pointer"}}>Privacy Policy</span>
        </p>

        <div className="text-c">
          <span style={{ fontSize:14, color:"var(--text-secondary)" }}>Already have an account? </span>
          <button style={{ background:"none", border:"none", color:"var(--blue)", fontSize:14, fontWeight:700, cursor:"pointer" }} onClick={() => nav("signin")}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
