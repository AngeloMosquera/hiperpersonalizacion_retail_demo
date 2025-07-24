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
  name: "Samsung Galaxy S25+",
  originalPrice: 6440000,
  currentPrice: 5600000,
  discountPercentage: 15,
  category: "Audio",
  image: "/phone_img_1.jpg", // You can replace with actual product image
  description: "Potencia, elegancia e innovación en la palma de tu mano. El Galaxy S25 Plus cuenta con una impresionante pantalla Dynamic AMOLED 2X de 6,7 pulgadas para una experiencia visual fluida y vibrante. Equipado con el procesador Snapdragon 8 Gen 4 y 12 GB de RAM, ofrece un rendimiento ultrarrápido incluso en las tareas más exigentes. Su cámara principal de 50 MP captura imágenes nítidas y detalladas, mientras que su batería de 4,900 mAh con carga rápida e inalámbrica te acompaña todo el día. Con 256 GB de almacenamiento, resistencia al agua y polvo con certificación IP68, y conectividad de última generación (5G, WiFi 7, eSIM, USB-C 3.2 y más), este smartphone con Android 15 está diseñado para quienes exigen lo mejor en cada detalle. Todo en un cuerpo delgado, ligero y sofisticado de apenas 190 gramos."
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
