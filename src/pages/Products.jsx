
import { useEffect, useState } from "react";
import {
  LoaderCircle,
  AlertCircle,
  Search,
} from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

function Products() {
  // Store the products retrieved from the API
  const [products, setProducts] = useState([]);

  // Track whether products are loading
  const [loading, setLoading] = useState(true);

  // Store API errors
  const [error, setError] = useState("");

  // Store the search input
  const [searchTerm, setSearchTerm] = useState("");

  // Store the selected category
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch products when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Get unique product categories
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products using search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <LoaderCircle className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-10 w-10 text-red-500" />

        <h2 className="text-xl font-semibold">
          Something went wrong
        </h2>

        <p className="text-gray-500">{error}</p>

        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Page Heading */}
      <div className="mb-10">
        <p className="text-blue-600 font-semibold uppercase text-sm">
          Our Collection
        </p>

        <h1 className="text-4xl font-bold mt-2">
          All Products
        </h1>

        <p className="text-gray-500 mt-3">
          Discover our collection of quality products.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all"
                ? "All Categories"
                : category}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-12">
            No products found. Try another search or category.
          </p>
        )}
      </div>

    </div>
  );
}

export default Products;
