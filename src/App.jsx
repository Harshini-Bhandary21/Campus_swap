import { useState } from "react";
import "./App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Payment from "./Payment";
import PayNow from "./PayNow";
import Sell from "./Sell";
import OrderHistory from "./OrderHistory";
import Contact from "./Contact";
import Profile from "./Profile";
import Wishlist from "./Wishlist";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Civil Engineering Books Bundle",
    cat: "Books",
    price: 3000,
    emoji: "📚",
    condition: "Good",
    seller: "Rahul M.",
    rating: 4.8,
    reviews: 12,
    desc: "Full set of Civil Engineering textbooks, 2nd year. All in good condition with minimal highlighting.",
  },
  {
    id: 2,
    name: "Mechanical Engineering Design 3rd Ed",
    cat: "Books",
    price: 250,
    emoji: "📘",
    condition: "Fair",
    seller: "Priya K.",
    rating: 4.5,
    reviews: 7,
    desc: "Shigley's Mechanical Engineering Design, 3rd edition SI version by Ansel Ugural. Good condition.",
  },
  {
    id: 3,
    name: "Lab Coat (Size M)",
    cat: "Clothing",
    price: 100,
    emoji: "🥼",
    condition: "New",
    seller: "Amit S.",
    rating: 5.0,
    reviews: 3,
    desc: "Unused white lab coat, size M. Bought for chemistry lab but have a different size.",
  },
  {
    id: 4,
    name: "Casio FX-991ES Plus Calculator",
    cat: "Electronics",
    price: 400,
    emoji: "🔢",
    condition: "Good",
    seller: "Neha P.",
    rating: 4.7,
    reviews: 19,
    desc: "Scientific calculator in perfect working condition. All functions intact, comes with cover.",
  },
  {
    id: 5,
    name: "Drawing Board A2",
    cat: "Stationery",
    price: 180,
    emoji: "📐",
    condition: "Fair",
    seller: "Vijay R.",
    rating: 4.2,
    reviews: 5,
    desc: "A2 size drawing board used for first year engineering drawing. Minor scratches on surface.",
  },
  {
    id: 6,
    name: "Engineering Drawing Instruments Set",
    cat: "Stationery",
    price: 120,
    emoji: "🧭",
    condition: "Good",
    seller: "Sneha T.",
    rating: 4.6,
    reviews: 8,
    desc: "Complete set of drawing instruments in box. Compass, divider, mini drafter etc.",
  },
  {
    id: 7,
    name: "Physics Irodov Problems Book",
    cat: "Books",
    price: 200,
    emoji: "⚛️",
    condition: "Good",
    seller: "Ankit B.",
    rating: 4.9,
    reviews: 22,
    desc: "Problems in General Physics by I.E. Irodov. All solutions marked, great for competitive prep.",
  },
  {
    id: 8,
    name: "Laptop Cooling Pad",
    cat: "Electronics",
    price: 350,
    emoji: "💻",
    condition: "Good",
    seller: "Deepa M.",
    rating: 4.4,
    reviews: 11,
    desc: "USB powered laptop cooling pad with 2 fans. Works perfectly, compatible with 13-15 inch laptops.",
  },
];

const INITIAL_ORDERS = [
  {
    id: "ORD-2024-001",
    date: "Jan 15, 2024",
    items: [{ name: "Fluid Mechanics Book", emoji: "📗", price: 320 }],
    total: 320,
    status: "Delivered",
  },
  {
    id: "ORD-2024-002",
    date: "Feb 03, 2024",
    items: [
      { name: "Graph Paper Bundle", emoji: "📄", price: 80 },
      { name: "Pencil Set", emoji: "✏️", price: 60 },
    ],
    total: 140,
    status: "Delivered",
  },
  {
    id: "ORD-2024-003",
    date: "Mar 10, 2024",
    items: [{ name: "Casio Watch", emoji: "⌚", price: 1200 }],
    total: 1200,
    status: "In Transit",
  },
];

export default function App() {
  const [page, setPage] = useState("signin");
  const [prevPage, setPrevPage] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [toast, setToast] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const nav = (p, opts = {}) => {
    setPrevPage(page);
    setPage(p);
    if (opts.tab) setActiveTab(opts.tab);
    if (opts.product !== undefined) setSelectedProduct(opts.product);
  };

  const goBack = () => nav(prevPage || "dashboard");

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      return [...prev, { ...product, qty }];
    });
    showToast(`${product.name.split(" ").slice(0, 3).join(" ")} added to cart`);
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  };

  const toggleWishlist = (product) => {
    const has = wishlist.find((i) => i.id === product.id);
    setWishlist(
      has
        ? wishlist.filter((i) => i.id !== product.id)
        : [...wishlist, product],
    );
    showToast(has ? "Removed from wishlist" : "Added to wishlist ♥");
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const sharedProps = {
    nav,
    goBack,
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    cartCount,
    wishlist,
    toggleWishlist,
    products,
    setProducts,
    orders,
    setOrders,
    showToast,
    paymentDone,
    setPaymentDone,
    selectedProduct,
    setSelectedProduct,
    activeTab,
    setActiveTab,
  };

  const renderPage = () => {
    switch (page) {
      case "signin":
        return <SignIn {...sharedProps} />;
      case "signup":
        return <SignUp {...sharedProps} />;
      case "dashboard":
        return <Dashboard {...sharedProps} />;
      case "products":
        return <Products {...sharedProps} />;
      case "detail":
        return <ProductDetail {...sharedProps} />;
      case "cart":
        return <Cart {...sharedProps} />;
      case "payment":
        return <Payment {...sharedProps} />;
      case "paynow":
        return <PayNow {...sharedProps} />;
      case "sell":
        return <Sell {...sharedProps} />;
      case "orders":
        return <OrderHistory {...sharedProps} />;
      case "contact":
        return <Contact {...sharedProps} />;
      case "profile":
        return <Profile {...sharedProps} />;
      case "wishlist":
        return <Wishlist {...sharedProps} />;
      default:
        return <SignIn {...sharedProps} />;
    }
  };

  return (
    <div className="app-shell">
      {renderPage()}
      {toast && <div className="toast">✓ {toast}</div>}
    </div>
  );
}
