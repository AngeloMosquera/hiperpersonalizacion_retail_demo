"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Check, Package, CreditCard, Truck, Calendar, ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Colombian peso formatter
const formatCOPPrice = (price: number) => {
  return `$${price.toLocaleString('es-CO')}`
}

// Product data (same as desk page)
const product = {
  id: "1",
  name: "Sofka Pro Desk 2025",
  originalPrice: 3250000,
  currentPrice: 2437500,
  discountPercentage: 25,
  category: "Audio",
  image: "/desk.jpg",
  description: "Combina estilo, durabilidad y ergonomía con el Pro Desk 2025 de Sofka Muebles. Diseñado en madera de alta calidad con un elegante acabado en bambú."
}

// Order details
const orderDetails = {
  orderId: "SOF-2025-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
  estimatedDelivery: "1-2 días hábiles",
  shippingCost: 0, // Free shipping
  totalAmount: product.currentPrice
}

export default function DeskConfirmPage() {
  const router = useRouter()
  
  // Form state
  const [selectedCard, setSelectedCard] = useState("AutoCard Gold")
  const [selectedAddress, setSelectedAddress] = useState("Cr 41 No. 40BS-09, Envigado, Antioquia")
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta de crédito")
  const [customerName, setCustomerName] = useState("Jorge Alberto Valderrama Palacio")
  const [customerEmail, setCustomerEmail] = useState("jorge@sofka.com.co")
  const [customerPhone, setCustomerPhone] = useState("312 541 8596")

  const handleConfirmOrder = () => {
    // Navigate to a success page or dashboard
    router.push("/desk_success")
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <>
      <main className="min-h-screen bg-[#fffac2] px-4 py-4">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Order Summary Card */}
          <Card className="bg-white shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-l font-semibold text-gray-900">
                    ¡Pedido Listo para Confirmar!
                  </h2>
                  <p className="text-gray-600">
                    Revisa los detalles de tu compra antes de finalizar
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="border-t pt-6 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Detalles del Pedido
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Envío Estimado
                      </p>
                      <p className="text-sm text-gray-600">
                        {orderDetails.estimatedDelivery}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Pago
                    </label>
                    <div className="relative">
                      <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DEA742] focus:border-[#DEA742]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                          <SelectItem value="Tarjeta de crédito">Tarjeta de crédito</SelectItem>
                          <SelectItem value="Tarjeta debito">Tarjeta debito</SelectItem>
                          <SelectItem value="Pago contra entrega">Pago contra entrega</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Customer Information Form */}
                <div className="space-y-4">
                  {/* Tarjeta */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tarjeta
                    </label>
                    <div className="relative">
                      <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                      <Select value={selectedCard} onValueChange={setSelectedCard}>
                        <SelectTrigger className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DEA742] focus:border-[#DEA742]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                          <SelectItem value="AutoCard Gold">AutoCard Gold</SelectItem>
                          <SelectItem value="AutoCard Platinum">AutoCard Platinum</SelectItem>
                          <SelectItem value="AutoCard Classic">AutoCard Classic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Direccion */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                      <Select value={selectedAddress} onValueChange={setSelectedAddress}>
                        <SelectTrigger className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DEA742] focus:border-[#DEA742]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                          <SelectItem value="Cr 41 No. 40BS-09, Envigado, Antioquia">Cr 41 No. 40BS-09, Envigado, Antioquia</SelectItem>
                          <SelectItem value="Cl 10 No. 15-25, Medellín, Antioquia">Cl 10 No. 15-25, Medellín, Antioquia</SelectItem>
                          <SelectItem value="Av 80 No. 30-40, Bello, Antioquia">Av 80 No. 30-40, Bello, Antioquia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DEA742] focus:border-[#DEA742]"
                      />
                    </div>
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DEA742] focus:border-[#DEA742]"
                      />
                    </div>
                  </div>

                  {/* Telefono */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DEA742] focus:border-[#DEA742]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Summary */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resumen del Producto
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
                  Total del Pedido
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

              {/* Action Buttons */}
              <div className="border-t pt-6">
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleGoBack}
                    className="flex-1"
                  >
                    Volver Atrás
                  </Button>
                  <Button 
                    onClick={handleConfirmOrder}
                    className="flex-1 bg-[#2D7A4A] hover:bg-[#245a3a] text-white"
                  >
                    Confirmar Pedido
                  </Button>
                </div>
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
