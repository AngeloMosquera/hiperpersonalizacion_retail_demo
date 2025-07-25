"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Colombian peso formatter
const formatCOPPrice = (price: number) => {
  return `$${price.toLocaleString('es-CO')}`
}

// Product data
const product = {
  id: "1",
  name: "Totto Urban Pro Negra",
  originalPrice: 249900,
  currentPrice: 224900,
  discountPercentage: 10,
  category: "Audio",
  image: "/jacket_totto_full.jpeg", // You can replace with actual product image
  description: "Versátil, resistente y con un estilo moderno, la chaqueta Toto Urban está pensada para acompañarte en el ritmo de la ciudad. Su diseño impermeable y su aislamiento térmico te mantienen seco y abrigado en días fríos o lluviosos, mientras que la capucha ajustable brinda protección adicional sin sacrificar comodidad. Confeccionada en nailon y poliéster de alta calidad, garantiza durabilidad y ligereza. Disponible únicamente en color negro, es la prenda ideal para quienes buscan funcionalidad y estilo urbano en su día a día."
}

export default function ProductDetail() {
  return (
    <>
      <main className="bg-[#fffac2] px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg overflow-hidden">
            <CardContent className="p-2">
              {/* Product Header Section - Image, Title, and Price */}
              <div className="flex items-start gap-4 mb-8">
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                  {/* Discount Badge */}
                  <Badge className="absolute -top-2 -left-2 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{product.discountPercentage}%
                  </Badge>
                  
                  {/* Product Image Container */}
                  <div className="bg-white rounded-lg p-0 flex items-center justify-center w-32 h-32">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Product Info - Title and Price */}
                <div className="flex-1 space-y-2">
                  {/* Product Title */}
                  <h1 className="text-2xl lg:text-2xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>

                  {/* Pricing */}
                  <div className="flex flex-col gap-1">
                    <span className="text-m text-gray-500 line-through">
                      {formatCOPPrice(product.originalPrice)}
                    </span>
                    <span className="text-2xl font-bold text-orange-500">
                      {formatCOPPrice(product.currentPrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Descripción
                </h2>
                <p className="text-gray-600 leading-relaxed text-base">
                  {product.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional spacing */}
        <div className="pb-8"></div>
      </main>
      
      <footer className="bg-[#103B3C] text-white text-center py-4">
        <p className="text-sm">2025© Sofka Technologies / All Rights Reserved.</p>
      </footer>
    </>
  )
}
