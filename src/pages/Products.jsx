
import { useCallback, useEffect, useState } from "react";
import {
  LoaderCircle,
  AlertCircle,
  Search,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // Fetch products from the API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://fakestoreapi.com/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products. Please try again.");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOption("default");
  };

  // Check whether any filter or sorting option is active
  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategory !== "all" ||
    sortOption !== "default";

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;

      case "price-high":
        return b.price - a.price;

      case "rating":
        return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);

      case "name":
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
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

        <p className="text-gray-500 text-center max-w-md">
          {error}
        </p>

        <Button
          onClick={fetchProducts}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
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

      {/* Search, Category and Sorting Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search Input */}
        <div className="relative">
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
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>

        {/* Sorting Dropdown */}
        <div className="relative">
          <ArrowUpDown
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={19}
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default Sorting</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end mb-6">
        <Button
          variant="outline"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Clear Filters
        </Button>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing {sortedProducts.length} of {products.length} products
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
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
