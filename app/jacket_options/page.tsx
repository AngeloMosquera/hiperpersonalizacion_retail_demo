"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Colombian peso formatter
const formatCOPPrice = (price: number) => {
  return `$${price.toLocaleString('es-CO')}`
}

// Featured jackets data
const featuredJackets = [
  {
    id: "1",
    name: "THM Essential",
    price: 289900,
    category: "Vestimenta",
    image: "/jacket_thm.webp",
    categoryColor: "bg-orange-500"
  },
  {
    id: "2", 
    name: "Totto Urban",
    price: 224900,
    category: "Vestimenta",
    image: "/jacket_totto.jpeg",
    categoryColor: "bg-orange-500"
  },
  {
    id: "3",
    name: "Adidas Terrex3", 
    price: 399900,
    category: "Vestimenta",
    image: "/jacket_adidas.jpeg",
    categoryColor: "bg-orange-500"
  },
  {
    id: "4",
    name: "Nike Repel",
    price: 189900,
    category: "Vestimenta", 
    image: "/jacket_nike.jpeg",
    categoryColor: "bg-orange-500"
  }
]

export default function Dashboard() {
  return (
    <>
      <main className="bg-[#fffac2] px-4 py-4">

        {/* Jackets Grid - 2x2 */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-3">
            {featuredJackets.map((jacket) => (
              <Card key={jacket.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Category Badge */}
                  <div className="relative">
                    {/* Product Image */}
                    <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center p-0">
                      <img 
                        src={jacket.image} 
                        alt={jacket.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-2">
                    <h3 className="text-base font-bold text-gray-800 mb-2">
                      {jacket.name}
                    </h3>
                    <p className="text-lg font-bold text-orange-500">
                      {formatCOPPrice(jacket.price)}
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
