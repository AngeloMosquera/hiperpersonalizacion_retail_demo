"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Package, Truck, Calendar, User, Mail, Phone, MapPin, CreditCard } from "lucide-react"

// Colombian peso formatter
const formatCOPPrice = (price: number) => {
  return `$${price.toLocaleString('es-CO')}`
}

// Product data (same as jacket confirm page)
const product = {
  id: "1",
  name: "Totto Urban Pro Negra",
  originalPrice: 250000,
  currentPrice: 225000,
  discountPercentage: 10,
  category: "Audio",
  image: "/jacket_totto_full.jpeg",
  description: "Impermeable, térmica y con capucha ajustable, perfecta para el clima urbano. Diseño moderno en color negro, fabricada en materiales resistentes y de alta calidad."
}

// Order details
const orderDetails = {
  orderId: "SOF-2025-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
  estimatedDelivery: "1 día",
  shippingCost: 0, // Free shipping
  totalAmount: product.currentPrice,
  orderDate: new Date().toLocaleDateString('es-CO'),
  orderTime: new Date().toLocaleTimeString('es-CO'),
  paymentMethod: "AutoCard Gold",
  shippingAddress: "Cr 41 No. 40BS-09, Envigado, Antioquia",
  customerName: "Jorge Alberto Valderrama Palacio",
  customerEmail: "jorge@sofka.com.co",
  customerPhone: "312 541 8596"
}

export default function JacketSuccessPage() {
  const router = useRouter()

  const handleReturnToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <main className="bg-[#fffac2] px-4 py-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Success Header Card */}
          <Card className="bg-white shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    ¡Compra Exitosa!
                  </h1>
                  <p className="text-gray-600">
                    Tu pedido ha sido procesado correctamente
                  </p>
                </div>
              </div>

              {/* Order Information */}
              <div className="border-t pt-6 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Información del Pedido
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-[#2D7A4A]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Número de Pedido
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.orderId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#2D7A4A]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Fecha y Hora
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.orderDate} - {orderDetails.orderTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-[#2D7A4A]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Envío Estimado
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.estimatedDelivery}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-[#2D7A4A]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Método de Pago
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-[#2D7A4A]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Cliente</p>
                      <p className="text-sm text-gray-600">{orderDetails.customerName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-[#2D7A4A]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Correo</p>
                      <p className="text-sm text-gray-600">{orderDetails.customerEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#2D7A4A]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Teléfono</p>
                      <p className="text-sm text-gray-600">{orderDetails.customerPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#2D7A4A]" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Dirección de Envío</p>
                      <p className="text-sm text-gray-600">{orderDetails.shippingAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Summary */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Producto Comprado
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

              {/* Price Summary */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Total Pagado
                </h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">{formatCOPPrice(product.currentPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío:</span>
                    <span className="text-green-600 font-medium">¡Gratis!</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-orange-500">{formatCOPPrice(orderDetails.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="border-t pt-6">
                <Button 
                  onClick={handleReturnToDashboard}
                  className="w-full bg-[#2D7A4A] hover:bg-[#245a3a] text-white"
                >
                  Regresar al Menú de Inicio
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Information Message */}
          <div className="text-center text-sm text-gray-600 bg-white p-4 rounded-lg shadow">
            <p className="font-medium">¡Gracias por tu compra!</p>
            <p className="mt-1">Recibirás una confirmación por correo electrónico y SMS con el seguimiento de tu pedido.</p>
            <p className="mt-1">El producto llegará a tu dirección en {orderDetails.estimatedDelivery}.</p>
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