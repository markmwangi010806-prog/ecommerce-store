
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  UserRound,
  Store,
  LogOut,
  Heart,
} from "lucide-react";

import { useStore } from "@/context/useStore";

function Navbar() {
  const { cartItems, wishlist, user, logout } = useStore();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Store className="text-blue-600 h-7 w-7" />

          <span className="text-2xl font-bold text-gray-900">
            ShopEase
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-600"
            }
          >
            Products
          </NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">

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

        </div>
      </nav>
    </header>
  );
}

export default Navbar;
