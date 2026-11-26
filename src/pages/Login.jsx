
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogIn,
  Store,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/context/useStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

function Login() {
  const { login, user } = useStore();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Error state
  const [error, setError] = useState("");

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  }

  // Handle login submission
  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError("Please enter your full name, email and password.");
      return;
    }

    const success = login(
      formData.name,
      formData.email,
      formData.password
    );

    if (success) {
      toast.success(`Welcome to ShopEase, ${formData.name.trim()}!`);
      navigate("/checkout");
    } else {
      setError("Unable to sign in. Please check your details.");
    }
  }

  // Already logged in
  if (user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Store className="h-12 w-12 text-blue-600 mx-auto mb-4" />

            <h1 className="text-2xl font-bold">
              You're Already Logged In
            </h1>

            <p className="text-gray-500 mt-3">
              Welcome back, {user.name}!
            </p>

            <Button
              className="w-full mt-6"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12 bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto bg-blue-100 p-4 rounded-full w-fit">
            <Store className="h-8 w-8 text-blue-600" />
          </div>

          <CardTitle className="text-3xl font-bold">
            Welcome Back
          </CardTitle>

          <CardDescription>
            Sign in to continue shopping with ShopEase.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full">
              <LogIn size={18} />
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/products"
              className="text-blue-600 font-semibold hover:underline"
            >
              Continue shopping
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
