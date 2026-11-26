
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LoaderCircle,
  AlertCircle,
  Star,
  ShoppingCart,
  ArrowLeft,
  Check,
} from "lucide-react";
import { toast } from "sonner";

import { useStore } from "@/context/useStore";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

function ProductDetails() {
  const { id } = useParams();

  // Access the shared cart
  const { addToCart } = useStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  // Fetch the selected product
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Add product to cart
  function handleAddToCart() {
    addToCart(product);

    // Show success notification
    toast.success(`${product.title} added to cart!`);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <LoaderCircle className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-500" />

        <h2 className="text-xl font-semibold">
          Product Not Found
        </h2>

        <p className="text-gray-500">
          {error || "This product does not exist."}
        </p>

        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <Card className="overflow-hidden">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
          {/* Product Image */}
          <div className="bg-white rounded-xl flex items-center justify-center p-8 min-h-[350px]">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[400px] max-w-full object-contain"
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-4 capitalize">
              {product.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-5">
              <Star
                size={20}
                fill="currentColor"
                className="text-yellow-500"
              />

              <span className="font-semibold">
                {product.rating?.rate ?? "N/A"}
              </span>

              <span className="text-gray-500">
                ({product.rating?.count ?? 0} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-blue-600 mt-6">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <div className="mt-6">
              <h2 className="font-semibold text-lg mb-2">
                Description
              </h2>

              <p className="text-gray-600 leading-7">
                {product.description}
              </p>
            </div>

            {/* Functional Add to Cart Button */}
            <Button
              size="lg"
              className="mt-8 w-full md:w-fit"
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <Check size={20} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={20} />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetails;
