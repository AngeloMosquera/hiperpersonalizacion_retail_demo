"use client"

import { Card, CardContent } from "@/components/ui/card"

// Jacket characteristics data
const jacketCharacteristics = [
  {
    id: "1",
    title: "Material y durabilidad",
    description: "Evalúa la calidad del tejido, resistencia al desgaste y si es apropiado para las condiciones climáticas donde la usarás.",
    icon: "🧵"
  },
  {
    id: "2", 
    title: "Nivel de abrigo",
    description: "Considera el tipo de aislamiento (plumón, sintético) y si es adecuado para las temperaturas que enfrentarás.",
    icon: "🌡️"
  },
  {
    id: "3",
    title: "Estilo y versatilidad",
    description: "Elige un diseño que combine con tu guardarropa y sea apropiado para diferentes ocasiones y outfits.",
    icon: "✨"
  },
  {
    id: "4",
    title: "Funcionalidad práctica", 
    description: "Verifica que tenga suficientes bolsillos, cremalleras de calidad y características útiles para tus actividades diarias.",
    icon: "⚙️"
  },
  {
    id: "5",
    title: "Talla y comodidad",
    description: "Asegúrate de que el corte permita movimiento libre y sea cómoda tanto para usar sola como con capas debajo.",
    icon: "📏"
  },
  {
    id: "6",
    title: "Características adicionales",
    description: "Considera extras como capucha, impermeabilidad, transpirabilidad y facilidad de cuidado y lavado.",
    icon: "�"
  }
]

export default function JacketCharacteristicsPage() {
  return (
    <>
      <main className="bg-[#fffac2] px-4 py-4">
        {/* Header */}
        <div className="text-left ml-2">
          <h1 className="text-l md:text-l font-bold text-black mb-2">
            Características de tomar en cuenta
          </h1>
        </div>

        {/* Characteristics List */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                {jacketCharacteristics.map((characteristic, index) => (
                  <div key={characteristic.id} className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                      <span className="text-lg">{characteristic.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {characteristic.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {characteristic.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
