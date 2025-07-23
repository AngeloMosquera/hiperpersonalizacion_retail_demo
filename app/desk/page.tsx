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
  name: "Sofka Pro Desk 2025",
  originalPrice: 3250000,
  currentPrice: 2437500,
  discountPercentage: 25,
  category: "Audio",
  image: "/desk.jpg", // You can replace with actual product image
  description: "Combina estilo, durabilidad y ergonomía con el Pro Desk 2025 de Sofka Muebles. Diseñado en madera de alta calidad con un elegante acabado en bambú, este escritorio aporta calidez y sofisticación a cualquier espacio de trabajo. Su amplia superficie de 160 x 80 cm brinda comodidad para múltiples dispositivos, y su altura ajustable entre 60 y 120 cm se adapta fácilmente a tu postura ideal, ya sea sentado o de pie. Respaldado por una garantía de 5 años contra defectos de fabricación y con una política de devolución de 90 días sin costo, es una inversión segura para tu home office o estudio profesional."
}

export default function ProductDetail() {
  return (
    <>
      <main className="min-h-screen bg-[#fffac2] px-4 py-4">
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
