
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStore } from "@/context/useStore";

function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useStore();
  const navigate = useNavigate();

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  function handleWishlist() {
    toggleWishlist(product);

    if (isWishlisted) {
      toast.info("Removed from your wishlist");
    } else {
      toast.success("Added to your wishlist");
    }
  }

  // Navigate to the selected product's details page
  function handleViewProduct() {
    navigate(`/products/${product.id}`);
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 rounded-full bg-white p-2 shadow hover:scale-110 transition"
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={21}
            className={
              isWishlisted
                ? "text-red-500 fill-red-500"
                : "text-gray-500"
            }
          />
        </button>
      </div>

      <CardContent className="space-y-3">
        <Badge variant="secondary">
          {product.category}
        </Badge>

        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-12">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 text-yellow-500">
          <Star size={16} fill="currentColor" />

          <span className="text-sm text-gray-600">
            {product.rating?.rate || "N/A"}
          </span>

          <span className="text-xs text-gray-400">
            ({product.rating?.count || 0} reviews)
          </span>
        </div>

        <p className="text-xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={handleViewProduct}
        >
          View Product
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
