"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Colombian peso formatter
const formatCOPPrice = (price: number) => {
  return `$${price.toLocaleString('es-CO')}`
}

// Featured products data
const featuredProducts = [
  {
    id: "1",
    name: "Samsung Galaxy S25+",
    price: 5600000,
    category: "Smartphones",
    image: "/phone_img_1.jpg", // You can replace with actual product images
    categoryColor: "bg-orange-500"
  },
  {
    id: "2", 
    name: "On Roger ADV Z5",
    price: 648260,
    category: "Calzado",
    image: "/tenis.jpg",
    categoryColor: "bg-orange-500"
  },
  {
    id: "3",
    name: "Base Monitor", 
    price: 149900,
    category: "Oficina",
    image: "/base_monitor.jpg",
    categoryColor: "bg-orange-500"
  }
]

export default function Dashboard() {
  return (
    <>
      <main className="min-h-screen bg-[#fffac2] px-4 py-4">
        {/* Header */}
        <div className="text-left ml-2">
          <h1 className="text-l md:text-l font-bold text-black mb-2">
            Productos Destacados
          </h1>
        </div>

        {/* Featured Products Grid */}
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Main Featured Product - iPhone */}
          <div className="w-full">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  {/* Left side - Product Image */}
                  <div className="relative flex-shrink-0 w-1/2">
                    <Badge 
                      className={`absolute top-3 left-3 z-10 ${featuredProducts[0].categoryColor} text-white px-2 py-0.5 rounded-full text-xs font-medium`}
                    >
                      {featuredProducts[0].category}
                    </Badge>
                    
                    {/* Product Image */}
                    <div className="h-full bg-gray-100 flex items-center justify-center p-3">
                      <img 
                        src={featuredProducts[0].image} 
                        alt={featuredProducts[0].name}
                        className="w-32 h-50 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Right side - Product Info */}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {featuredProducts[0].name}
                    </h3>
                    <p className="text-xl font-bold text-orange-500">
                      {formatCOPPrice(featuredProducts[0].price)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Products - 2 Columns */}
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.slice(1).map((product) => (
              <Card key={product.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Category Badge */}
                  <div className="relative">
                    <Badge 
                      className={`absolute top-2 left-2 z-10 ${product.categoryColor} text-white px-2 py-1 rounded-full text-xs font-medium`}
                    >
                      {product.category}
                    </Badge>
                    
                    {/* Product Image */}
                    <div className="aspect-auto bg-gray-100 flex items-center justify-center p-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-40 h-24 object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-2">
                    <h3 className="text-base font-bold text-gray-800 mb-1">
                      {product.name}
                    </h3>
                      <p className="text-lg font-bold text-orange-500">
                        {formatCOPPrice(product.price)}
                      </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional spacing for half-screen layout */}
        <div className="pb-8"></div>
      </main>
      
      <footer className="bg-[#103B3C] text-white text-center py-4">
        <p className="text-sm">2025© Sofka Technologies / All Rights Reserved.</p>
      </footer>
    </>
  )
}
