
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/context/useStore";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useStore();

  // Increase product quantity
  function handleIncrease(item) {
    updateQuantity(item.id, item.quantity + 1);
    toast.success("Product quantity increased");
  }

  // Decrease product quantity
  function handleDecrease(item) {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
      toast.info("Product quantity decreased");
    }
  }

  // Remove product from cart
  function handleRemove(item) {
    removeFromCart(item.id);
    toast.success(`${item.title} removed from cart`);
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag className="h-20 w-20 text-gray-300 mb-6" />

        <h1 className="text-3xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-3 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>

        <Button asChild>
          <Link to="/products">
            Start Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Page Heading */}
      <div className="mb-10">
        <p className="text-blue-600 font-semibold uppercase text-sm">
          Your Shopping Bag
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Shopping Cart
        </h1>

        <p className="text-gray-500 mt-3">
          You have {cartItems.length} different products in your cart.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-5">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row gap-5">

                  {/* Product Image */}
                  <div className="h-32 w-full sm:w-32 flex-shrink-0 bg-white flex items-center justify-center p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900 line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-blue-600 font-bold mt-2">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={item.quantity <= 1}
                        onClick={() => handleDecrease(item)}
                      >
                        <Minus size={16} />
                      </Button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleIncrease(item)}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="flex sm:flex-col justify-between items-end">
                    <p className="font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(item)}
                      title="Remove product"
                    >
                      <Trash2 size={20} />
                    </Button>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-4"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-4 text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <Separator className="my-5" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <Button asChild className="w-full mt-6">
                <Link to="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>

              <p className="text-xs text-gray-400 text-center mt-4">
                Shipping calculated at checkout.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default Cart;
