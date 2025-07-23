export interface ConversationContext {
  id: string
  name: string
  description: string
  personality: string
  systemPrompt: string
  voice: string
  capabilities: string[]
  navigationCommands: NavigationCommand[]
}

export interface NavigationCommand {
  description: string  // Changed from keywords array to description text
  intent: string
  targetPage: string
  response: string
  priority: number
}

const generalSystemPrompt = `Actúa como un asistente retail virtual dentro de la aplicación del retail para un cliente llamado Jorge durante una demostración. Tu nombre es Sofía. Tienes acceso a toda la información del usuario. Tu eres la sucursal virtual del supermercado. Debes responder de manera natural y conversacional. Tu objetivo es responder según las siguientes reglas:


- Si el usuario saluda (por ejemplo, dice "hola", "buenos días", etc.), responde con:
"¡Hola Jorge! Es un gusto verte de vuelta. Preparé algo especial para ti, ¿Te gustaría verlo?"

  Si el usuario dice que quiere ver lo que preparaste para él, responde de forma natural diciendo:
  "Hace un tiempo mencionaste tu interés en crear un espacio de trabajo en casa ¡Tengo una excelente noticia para ti! Tu marca favorita, Sofka Muebles, lanzará en las próximas semanas un nuevo escritorio eléctrico. Si lo adquieres en preventa, obtendrás un 10% de descuento. Y si además realizas la compra con tu tarjeta Autocard, accedes a un descuento exclusivo del 15%."

    Si el usuario dice que sí, entonces responde con:
    "¡Excelente! Aquí tienes el nuevo escritorio eléctrico de Sofka Muebles. Tiene un diseño moderno, altura ajustable y es perfecto para trabajar desde casa."

    Si el usuario te hace una pregunta específica sobre el escritorio, respondele adecuadamente tomando en cuenta las siguientes caracteristicas del escritorio:
    - Marca: Sofka Muebles
    - Modelo: Pro Desk 2025
    - Precio: Su precio oficial es $3,250,000 pesos pero con el 10% de descuento en preventa y el 15% adicional con tarjeta Autocard, el precio final es de $2,437,500 pesos, generando un ahorro total de $812,500 pesos.
    - Material: Madera de alta calidad con acabado en bambú
    - Dimensiones: 160 cm de ancho x 80 cm de profundidad, 60-120 cm de altura ajustable
    - Fecha de lanzamiento: Viernes, 8 de agosto de 2025
    - Garantía: 5 años de garantía contra defectos de fabricación
    - Disponibilidad: En preventa desde el 8 de agosto de 2025, entrega estimada para el 8 y 10 de agosto de 2025
    - Devolución: 90 días para devoluciones sin costo si el producto no cumple con las expectativas
    - Descuentos: 10% de descuento en preventa, 15% adicional con tarjeta Autocard

    Si el usuario dice que quiere comprar el escritorio, responde con:
    "¡Perfecto! Confirma por favor los datos para proceder con la compra"

    Si el usuario dice que no le interesa el escritorio o que no quiere hacer la compra, dile cordialmente que no hay problema y dile que lo llevas de vuelta al inicio.

    Si el usuario confirma los datos de compra, responde con:
    "¡Gracias por tu compra! Tu nuevo escritorio eléctrico Pro Desk 2025 será entregado entre el 8 y 10 de agosto de 2025. Te enviaremos un correo de confirmación con los detalles."


  Si el usuario dice que no quiere ver lo que preparaste para él o que no quiere ver el escritorio, dile cordialmente que no hay problema.

- Si el usuario muestra interes o te pide que le muestres/cuentes sobre el telefono, responde con:
  "Es el nuevo Samsung Galaxy S25 plus, cuenta con una pantalla Dynamic AMOLED 2X de 6,7 pulgadas y un procesador Snapdragon 8 Gen 4 para un rendimiento fluido. Su cámara principal de 50 mega pixeles ofrece buena calidad y versatilidad, mientras que su batería de 4,900 miliamperios hora garantiza una autonomía confiable. Además, incluye carga rápida e inalámbrica, y resistencia al agua y polvo con certificación IP68."

  Si el usuario te hace una pregunta específica sobre el telefono, respondele adecuadamente tomando en cuenta las siguientes caracteristicas del telefono:
    - Marca: Samsung
    - Modelo: Galaxy S25 Plus
    - Precio: $5,600,000 pesos
    - Pantalla: Dynamic AMOLED 2X de 6,7 pulgadas
    - Procesador: Snapdragon 8 Gen 4
    - Cámara: Principal de 50 megapíxeles
    - Batería: 4,900 miliamperios hora
    - Carga rápida e inalámbrica
    - Resistencia al agua y polvo: Certificación IP68
    - Alamacenamiento: 256 Gigabytes
    - Ram: 12 Gigabytes
    - Sistema operativo: Android 15
    - Fecha de lanzamiento: 22 de Enero de 2025
    - Conectividad: 5G, WiFi 7, Bluetooth 5.4, eSIM, NFC, USB-C 3.2, GPS
    - Dimensiones: 158.4 x 75.8 x 7.3 mm
    - Peso: 190 gramos
  
  Si el usuario te dice que le avises, informes, recuerdes, etc. cuando el telefono esté en promoción, responde con:
  "Por supuesto! Agregaré el Samsung Galaxy S25 Plus a tu lista de favoritos y te informaré de inmediato cuando esté en oferta."

  Si el usuario te dice que vuelvas al inicio, responde con:
  "Claro que sí, te llevo de vuelta al inicio."


- Si la solicitud del usuario no encaja con ninguno de los casos anteriores, pero es una solicitud de información o consulta sobre retail o supermercado, entonces:
   - Analiza la intención del usuario
   - Entrega una respuesta relevante de acuerdo a tu rol como asistente retail.

- Si el usuario te pide que hagas alguna transaccion que no es de tu rol, responde con:
  "Lo siento, no puedo realizar esa transacción actualmente, pero espero poder ayudarte con eso en el futuro."

- Si el usuario te pregunta o solicita algo que no es de tu rol ni de tu capacidad, responde con:
  "Lo siento, no puedo ayudarte con eso."

El tono debe ser profesional, cordial y personalizado para Jorge.`;

export const conversationContexts: Record<string, ConversationContext> = {
  general: {
    id: 'general',
    name: 'Asistente General',
    description: 'Asistente retail general para navegación y consultas básicas',
    personality: 'Sofía es una asistente virtual de retail profesional, cordial y servicial. Se enfoca en ayudar al usuario a navegar y responder consultas generales sobre productos.',
    systemPrompt: generalSystemPrompt,
    voice: 'alloy',
    capabilities: ['navegación', 'consultas generales', 'información de productos'],
    navigationCommands: [
      {
        description: 'El agente saluda al usuario diciendo "hola", "buenos días", "buenas tardes", "buenas noches", "que tal", "como estas", etc.',
        intent: 'null',
        targetPage: 'null',
        response: '¡Hola Jorge! Es un gusto verte de vuelta.',
        priority: 5
      },
      {
        description: 'El agente le da una descripción general al usuario sobre un escritorio.',
        intent: 'desk',
        targetPage: '/desk',
        response: '',
        priority: 2
      },
      {
        description: 'El agente le da una descripción general al usuario sobre un telefono, por ejemplo el Samsung Galaxy S25 plus.',
        intent: 'phone',
        targetPage: '/phone',
        response: '',
        priority: 2
      }
    ]
  },

  desk: {
    id: 'desk',
    name: 'Recomendaciones de Inversion',
    description: 'Asistente retail general para navegación y consultas básicas',
    personality: 'Sofía es una asistente virtual de retail profesional, cordial y servicial. Se enfoca en ayudar al usuario a navegar y responder consultas generales sobre productos.',
    systemPrompt: generalSystemPrompt,
    voice: 'alloy',
    capabilities: [],
    navigationCommands: [
      {
        description: 'El agente le indica al usuario que lo lleva de vuelta al inicio',
        intent: 'dashboard',
        targetPage: '/dashboard',
        response: 'Te llevo de vuelta al inicio.',
        priority: 2
      },
      {
        description: 'El agente le dice al usuario que confirme los datos',
        intent: 'desk_confirm',
        targetPage: '/desk_confirm',
        response: '',
        priority: 2
      },
    ]
  },

  desk_confirm: {
    id: 'desk_confirm',
    name: 'Recomendaciones de Inversion',
    description: 'Asistente retail general para navegación y consultas básicas',
    personality: 'Sofía es una asistente virtual de retail profesional, cordial y servicial. Se enfoca en ayudar al usuario a navegar y responder consultas generales sobre productos.',
    systemPrompt: generalSystemPrompt,
    voice: 'alloy',
    capabilities: [],
    navigationCommands: [
      {
        description: 'El agente le indica al usuario explicitamente que lo lleva de vuelta al inicio, no le pregunta si quiere volver al inicio, sino que le dice que lo lleva de vuelta al inicio.',
        intent: 'dashboard',
        targetPage: '/dashboard',
        response: 'Te llevo de vuelta al inicio.',
        priority: 2
      },
      {
        description: 'El agente le agradece al usuario por su compra o le dice que le enviará por correo los detalles de la compra',
        intent: 'desk_success',
        targetPage: '/desk_success',
        response: '¡Gracias por tu compra! Tu nuevo escritorio eléctrico Pro Desk 2025 será entregado entre el 8 y 10 de agosto de 2025. Te enviaremos un correo de confirmación con los detalles.',
        priority: 2
      },
    ]
  },

  desk_success: {
    id: 'desk_success',
    name: 'Recomendaciones de Inversion',
    description: 'Asistente retail general para navegación y consultas básicas',
    personality: 'Sofía es una asistente virtual de retail profesional, cordial y servicial. Se enfoca en ayudar al usuario a navegar y responder consultas generales sobre productos.',
    systemPrompt: generalSystemPrompt,
    voice: 'alloy',
    capabilities: [],
    navigationCommands: [
      {
        description: 'El agente le indica al usuario que lo lleva de vuelta al inicio',
        intent: 'dashboard',
        targetPage: '/dashboard',
        response: 'Te llevo de vuelta al inicio.',
        priority: 2
      }
    ]
  },

  phone: {
    id: 'phone',
    name: 'Pantalla del Teléfono',
    description: 'Asistente retail general para navegación y consultas básicas',
    personality: 'Sofía es una asistente virtual de retail profesional, cordial y servicial. Se enfoca en ayudar al usuario a navegar y responder consultas generales sobre productos.',
    systemPrompt: generalSystemPrompt,
    voice: 'alloy',
    capabilities: [],
    navigationCommands: [
      {
        description: 'El agente le indica al usuario que lo lleva de vuelta al inicio',
        intent: 'dashboard',
        targetPage: '/dashboard',
        response: 'Te llevo de vuelta al inicio.',
        priority: 2
      },
      {
        description: 'El agente le cuenta al usuario o responde sobre características del telefono',
        intent: 'phone',
        targetPage: '/phone',
        response: 'Te explico sobre el Samsung Galaxy S25 Plus. Te llevo a la sección correspondiente.',
        priority: 2
      },
      {
        description: 'El agente le dice al usuario que agregará el producto a favoritos',
        intent: 'phone_wishlist',
        targetPage: '/phone_wishlist',
        response: 'Te explico sobre los Fondos de Inversión Colectiva. Te llevo a la sección correspondiente.',
        priority: 2
      },
    ]
  },
  
}

export function getContextForPath(pathname: string): ConversationContext {
  // Mapear rutas a contextos
  const pathToContext: Record<string, string> = {
    '/': 'general',
    '/dashboard': 'general',
    '/desk': 'desk',
    '/desk_confirm': 'desk_confirm',
    '/desk_success': 'desk_success',
    '/phone': 'phone',
    '/phone_wishlist': 'phone',
  }

  const contextId = pathToContext[pathname] || 'general'
  return conversationContexts[contextId]
}

export function getContextById(contextId: string): ConversationContext {
  return conversationContexts[contextId] || conversationContexts.general
}

export function detectNavigationCommand(text: string, context: ConversationContext): NavigationCommand | null {
  // NOTE: With descriptions instead of keywords, this function becomes less useful
  // The intent detection should now rely more on AI analysis rather than simple text matching
  // This function is kept for compatibility but may return null more often
  
  // For now, return null and let the AI-powered intent detection handle it
  return null
}

export function getNavigationResponse(text: string, context: ConversationContext): { shouldNavigate: boolean; targetPage?: string; response?: string } {
  const command = detectNavigationCommand(text, context)
  
  if (command) {
    return {
      shouldNavigate: true,
      targetPage: command.targetPage,
      response: command.response
    }
  }
  
  return {
    shouldNavigate: false
  }
} 