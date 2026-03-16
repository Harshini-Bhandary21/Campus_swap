# Campus Swap 📚

> A college marketplace app — buy, sell & swap campus essentials.
> Built for MIT Academy of Engineering students.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 in your browser.

---

## 📱 Pages Included

| Page | Route (internal) | Description |
|------|-----------------|-------------|
| Sign In | `signin` | Email + Facebook login |
| Sign Up | `signup` | Registration with live password validation |
| Dashboard | `dashboard` | Home feed with hero banners, featured listings, stats |
| Browse Products | `products` | Search, filter by category, sort by price, wishlist |
| Product Detail | `detail` | Full item view, seller info, qty picker, buy/add to cart |
| Cart / Checkout | `cart` | Cart management, order summary, promo code |
| Payment | `payment` | Credit Card (2-step) / PayPal / Apple Pay |
| Pay Now | `paynow` | QR code + saved payment methods |
| Sell an Item | `sell` | List items with emoji picker, live preview |
| Order History | `orders` | All past orders with status badges |
| Wishlist | `wishlist` | Saved items, quick add to cart |
| Profile | `profile` | User stats, my listings, settings menu |
| Contact Us | `contact` | Contact card + send message form → thank you screen |

---

## 🛠 Tech Stack

- **React 18** (functional components + hooks)
- **Pure CSS** (no Tailwind, no UI library)
- **Vite** (dev server + build)
- **Google Fonts** — Syne (display) + Outfit (body)

## 🎨 Design System

CSS variables defined in `App.css`:
- `--navy`, `--blue`, `--cream` — core palette
- `--font-display` (Syne), `--font-body` (Outfit)
- `--r-*` — border radius scale
- `--shadow-*` — shadow scale
- Utility classes: `.flex`, `.card`, `.btn-*`, `.badge-*`, `.anim` etc.

## 📁 File Structure

```
src/
  App.jsx              # Root — navigation state, shared cart/wishlist
  App.css              # Global design system
  main.jsx             # Entry point
  components/
    Layout.jsx         # NavBar + BottomBar (shared)
  pages/
    SignIn.jsx
    SignUp.jsx
    Dashboard.jsx
    Products.jsx
    ProductDetail.jsx
    Cart.jsx
    Payment.jsx
    PayNow.jsx
    Sell.jsx
    OrderHistory.jsx
    Wishlist.jsx
    Profile.jsx
    Contact.jsx
```
# Campus_swap
