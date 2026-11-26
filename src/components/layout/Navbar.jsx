
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  UserRound,
  Store,
  LogOut,
  Heart,
  Menu,
  X,
} from "lucide-react";

import { useStore } from "@/context/useStore";

function Navbar() {
  const { cartItems, wishlist, user, logout } = useStore();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <Store className="text-blue-600 h-7 w-7" />

          <span className="text-2xl font-bold text-gray-900">
            ShopEase
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-red-500"
            title="Wishlist"
          >
            <Heart size={23} />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
            title="Shopping Cart"
          >
            <ShoppingCart size={23} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Authentication */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                title="Logout"
              >
                <LogOut size={21} />
                <span className="hidden sm:inline text-sm">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600"
              title="Login"
            >
              <UserRound size={23} />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-5">

            <NavLink
              to="/"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Products
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Wishlist ({wishlistCount})
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={navLinkClass}
            >
              Shopping Cart ({cartCount})
            </NavLink>

            {!user ? (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={navLinkClass}
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="text-left text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
