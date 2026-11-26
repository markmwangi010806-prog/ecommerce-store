
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingBag } from "lucide-react";

import { useStore } from "@/context/useStore";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function Wishlist() {
  const { wishlist, toggleWishlist } = useStore();

  // Empty wishlist
  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <Heart className="h-20 w-20 text-gray-300 mb-6" />

        <h1 className="text-3xl font-bold">
          Your Wishlist is Empty
        </h1>

        <p className="text-gray-500 mt-3 mb-8">
          Save products you love and find them here later.
        </p>

        <Button asChild>
          <Link to="/products">Explore Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Heading */}
      <div className="mb-10">
        <p className="text-pink-600 font-semibold uppercase text-sm">
          Your Favorites
        </p>

        <h1 className="text-4xl font-bold mt-2">
          My Wishlist
        </h1>

        <p className="text-gray-500 mt-3">
          You have saved {wishlist.length} products.
        </p>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <Card key={product.id} className="overflow-hidden">

            {/* Product Image */}
            <Link to={`/products/${product.id}`}>
              <div className="h-56 bg-white p-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </Link>

            <CardContent className="p-4">
              <Link to={`/products/${product.id}`}>
                <h2 className="font-semibold line-clamp-2 min-h-12 hover:text-blue-600">
                  {product.title}
                </h2>
              </Link>

              <p className="text-xl font-bold text-blue-600 mt-3">
                ${product.price.toFixed(2)}
              </p>

              <div className="flex gap-2 mt-5">
                <Button asChild className="flex-1">
                  <Link to={`/products/${product.id}`}>
                    View Product
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => toggleWishlist(product)}
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </CardContent>

          </Card>
        ))}
      </div>

      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-10"
      >
        <ShoppingBag size={18} />
        Continue Shopping
      </Link>

    </div>
  );
}

export default Wishlist;
