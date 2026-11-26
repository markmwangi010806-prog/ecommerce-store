
import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/context/useStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useStore();

  // Store customer information
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "card",
  });

  // Store form errors
  const [errors, setErrors] = useState({});

  // Track order confirmation
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    // Clear the field error when the customer edits it
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  // Validate checkout form
  function validateForm() {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // Submit order
  function handleSubmit(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add products before checkout.");
      return;
    }

    if (validateForm()) {
      // Clear the cart after successful validation
      clearCart();

      // Show order confirmation
      setOrderPlaced(true);

      toast.success("Your order has been placed successfully!");
    } else {
      toast.error("Please complete all required fields correctly.");
    }
  }

  // Empty cart
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag className="h-20 w-20 text-gray-300 mb-6" />

        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-3 mb-8">
          Add products before proceeding to checkout.
        </p>

        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  // Order confirmation
  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <CheckCircle className="h-20 w-20 text-green-500 mb-6" />

        <h1 className="text-3xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-3 mb-8">
          Thank you for shopping with ShopEase.
          Your order has been received.
        </p>

        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Page Heading */}
      <div className="mb-10">
        <p className="text-blue-600 font-semibold uppercase text-sm">
          Final Step
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Checkout
        </h1>

        <p className="text-gray-500 mt-3">
          Enter your details to complete your order.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Customer Information */}
          <div className="lg:col-span-2 space-y-6">

            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Delivery Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, building, or house number"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City and Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Postal Code
                    </label>

                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">

                  <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                    />
                    <span>Credit / Debit Card</span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleChange}
                    />
                    <span>PayPal</span>
                  </label>

                  <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleChange}
                    />
                    <span>Cash on Delivery</span>
                  </label>

                </div>
              </CardContent>
            </Card>

          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-4 text-sm"
                    >
                      <span className="text-gray-600">
                        {item.title} × {item.quantity}
                      </span>

                      <span className="font-medium whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-5" />

                <div className="flex justify-between mb-3 text-gray-600">
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

                <Button type="submit" className="w-full mt-6">
                  Place Order
                </Button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  This is a demonstration checkout. No payment will be processed.
                </p>

              </CardContent>
            </Card>
          </div>

        </div>
      </form>
    </div>
  );
}

export default Checkout;
