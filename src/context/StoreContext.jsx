
import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopease-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("shopease-wishlist");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch {
      return [];
    }
  });

  // Load authenticated user
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("shopease-user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "shopease-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "shopease-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add product to cart
  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  // Remove product from cart
  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

  // Clear all cart items after successful checkout
  function clearCart() {
    setCartItems([]);
  }

  // Update product quantity
  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  // Toggle wishlist
  function toggleWishlist(product) {
    setWishlist((currentItems) => {
      const alreadySaved = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadySaved) {
        return currentItems.filter(
          (item) => item.id !== product.id
        );
      }

      return [...currentItems, product];
    });
  }

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Log in user using full name, email and password
  function login(name, email, password) {
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      return false;
    }

    const loggedInUser = {
      name: name.trim(),
      email: email.trim(),
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "shopease-user",
      JSON.stringify(loggedInUser)
    );

    return true;
  }

  // Log out user
  function logout() {
    setUser(null);
    localStorage.removeItem("shopease-user");
  }

  const value = {
    cartItems,
    wishlist,
    cartTotal,
    user,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}
