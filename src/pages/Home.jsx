
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
              Welcome to ShopEase
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mt-4 leading-tight">
              Discover Products You'll Love
            </h1>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              Explore our collection of quality products at amazing prices.
              Find everything you need in one place.
            </p>

            <div className="flex gap-4 mt-8">
              <Button asChild size="lg">
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link to="/products">
                  Explore Products
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900"
              alt="Modern fashion store"
              className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10">

          <div className="flex items-center gap-4">
            <Truck className="h-10 w-10 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
              <p className="text-gray-500 text-sm">
                Reliable delivery to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Secure Shopping</h3>
              <p className="text-gray-500 text-sm">
                Shop with confidence and security.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShoppingBag className="h-10 w-10 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Quality Products</h3>
              <p className="text-gray-500 text-sm">
                Discover products worth buying.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Products Heading */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-blue-600 font-semibold text-sm uppercase">
            Our Collection
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-3">
            Find Your Next Favourite
          </h2>

          <p className="text-gray-500 mt-4">
            Explore our carefully selected products.
          </p>

          <Button asChild className="mt-8">
            <Link to="/products">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
}

export default Home;
