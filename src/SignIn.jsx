import { useState } from "react";

export default function SignIn({ nav }) {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="screen" style={{ background: "var(--navy)", minHeight:"100vh" }}>
      {/* Top decorative area */}
      <div style={{ padding:"56px 32px 32px", textAlign:"center" }}>
        <div className="anim" style={{
          display:"inline-flex", alignItems:"center", justifyContent:"center",
          width:72, height:72, borderRadius:"50%",
          background:"rgba(255,255,255,0.1)", fontSize:32, marginBottom:20
        }}>📚</div>
        <div className="anim d1" style={{
          fontFamily:"var(--font-display)", fontSize:42, fontWeight:800,
          color:"#fff", letterSpacing:1, lineHeight:1.0, marginBottom:8
        }}>CAMPUS<br/>SWAP</div>
        <p className="anim d2" style={{ color:"rgba(255,255,255,0.5)", fontSize:14, letterSpacing:2, fontWeight:600, textTransform:"uppercase" }}>
          Just tap it, and get it
        </p>
      </div>

      {/* Form card */}
      <div className="anim d2" style={{
        flex:1, background:"var(--bg)", borderRadius:"28px 28px 0 0",
        padding:"36px 28px 48px",
        display:"flex", flexDirection:"column", gap:0
      }}>
        <div className="t-h2 mb-16">Welcome back 👋</div>
        <p className="t-sm mb-20" style={{ color:"var(--text-secondary)" }}>Sign in to your Campus Swap account</p>

        <div className="flex-col gap-12 mb-20">
          <div className="form-group">
            <label className="input-label">Email</label>
            <div className="input-icon-wrap">
              <span className="ico">📧</span>
              <input className="input" placeholder="your@email.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="input-label">Password</label>
            <div className="input-icon-wrap">
              <span className="ico">🔒</span>
              <input className="input" placeholder="••••••••" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-full btn-lg mb-16" onClick={() => nav("dashboard", {tab:"home"})}>
          Sign in
        </button>

        <div className="or-divider mb-16">OR</div>

        <button className="btn btn-dark btn-full mb-20" style={{ gap:12 }}>
          <span style={{ fontWeight:900, fontSize:17, fontFamily:"Georgia" }}>f</span>
          Sign in with Facebook
        </button>

        <div className="text-c">
          <span style={{ fontSize:14, color:"var(--text-secondary)" }}>Don't have an account? </span>
          <button style={{ background:"none", border:"none", color:"var(--blue)", fontSize:14, fontWeight:700, cursor:"pointer" }} onClick={() => nav("signup")}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
