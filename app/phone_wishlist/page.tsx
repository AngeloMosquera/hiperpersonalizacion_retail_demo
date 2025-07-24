"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Package, Calendar, User, Mail, Phone, ShoppingCart, Eye } from "lucide-react"

// Colombian peso formatter
const formatCOPPrice = (price: number) => {
  return `$${price.toLocaleString('es-CO')}`
}

// Product data (same as phone confirm page)
const product = {
  id: "1",
  name: "Samsung Galaxy S25+",
  originalPrice: 6440000,
  currentPrice: 5600000,
  discountPercentage: 15,
  category: "Smartphones",
  image: "/phone_img_1.jpg",
  description: "Diseño elegante, potencia sin límites. El Galaxy S25 Plus te acompaña en todo momento con un rendimiento fluido, fotos increíbles y batería para todo el día. Conectividad avanzada y resistencia total, listo para lo que venga."
}

// Wishlist details

export default function PhoneWishlistPage() {
  const router = useRouter()

  const handleReturnToDashboard = () => {
    router.push('/dashboard')
  }

  const handleBuyNow = () => {
    // Navigate to purchase flow
    router.push('/phone_confirm')
  }

  return (
    <>
      <main className="min-h-screen bg-[#fffac2] px-4 py-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Success Header Card */}
          <Card className="bg-white shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-100 rounded-full p-3">
                  <Heart className="h-8 w-8 text-red-600 fill-current" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    ¡Agregado a Favoritos!
                  </h1>
                  <p className="text-gray-600">
                    El producto ha sido añadido a tu lista de favoritos
                  </p>
                </div>
              </div>

              {/* Product Summary */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Producto Favorito
                </h3>
                
                <div className="flex items-start gap-4 mb-6">
                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <Badge className="absolute -top-2 -left-2 z-10 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discountPercentage}%
                    </Badge>
                    <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center w-24 h-24">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500 line-through">
                        {formatCOPPrice(product.originalPrice)}
                      </span>
                      <span className="text-lg font-bold text-orange-500">
                        {formatCOPPrice(product.currentPrice)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6 space-y-3">
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={handleReturnToDashboard}
                    variant="outline"
                    className="w-full border-[#2D7A4A] text-[#2D7A4A] hover:bg-[#FF7A2E] hover:text-white"
                  >
                    Ir al Inicio
                  </Button>
                  
                  <Button 
                    onClick={handleBuyNow}
                    variant="outline"
                    className="w-full bg-[#FF7A2E] hover:bg-[#FF640A] text-white"
                  >
                    Comprar ahora
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Message */}
          <div className="text-center text-sm text-gray-600 bg-white p-4 rounded-lg shadow">
            <p className="font-medium">¡Producto guardado en favoritos!</p>
            <p className="mt-1">Podrás encontrar este producto en tu lista de favoritos para comprarlo más tarde.</p>
            <p className="mt-1">Te notificaremos si hay cambios en el precio o disponibilidad.</p>
          </div>
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