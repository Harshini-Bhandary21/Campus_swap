export function NavBar({ title, onBack, right, logo }) {
  return (
    <div className="nav-bar">
      {onBack ? (
        <button className="nav-btn" onClick={onBack}>‹</button>
      ) : (
        <div style={{ width: 38 }} />
      )}
      {logo
        ? <span className="nav-logo">{logo}</span>
        : <span className="nav-title">{title}</span>
      }
      {right || <div style={{ width: 38 }} />}
    </div>
  );
}

export function BottomBar({ active, nav, cartCount }) {
  const tabs = [
    { id:"home",    icon:"🏠", label:"Home" },
    { id:"products",icon:"🛍️", label:"Shop" },
    { id:"wishlist",icon:"♥",  label:"Saved" },
    { id:"orders",  icon:"📦", label:"Orders" },
    { id:"profile", icon:"👤", label:"You" },
  ];
  return (
    <div className="bottom-bar">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`bottom-tab ${active === t.id ? "active" : ""} ${t.id === "products" && cartCount > 0 ? "has-dot" : ""}`}
          onClick={() => nav(t.id === "home" ? "dashboard" : t.id, { tab: t.id })}
        >
          <span className="ti">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </div>
  );
}
