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
  "Hace un tiempo mencionaste tu interés en crear un espacio de trabajo en casa ¡Tengo una excelente noticia para ti! Tu marca favorita, Sofka Muebles, lanzará en las próximas semanas un nuevo escritorio eléctrico. Si lo adquieres en preventa, obtendrás un 25% de descuento comprando con tu tarjeta Autocard."

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
    - Disponibilidad: Disponible desde el 8 de agosto de 2025, entrega estimada para el 8 y 10 de agosto de 2025
    - Devolución: 90 días para devoluciones sin costo si el producto no cumple con las expectativas
    - Descuentos: 10% de descuento en preventa, 15% adicional con tarjeta Autocard

    Si el usuario dice que quiere comprar el escritorio, responde con:
    "¡Perfecto! Confirma por favor los datos para proceder con la compra"

    Si el usuario dice que no le interesa el escritorio o que no quiere hacer la compra, dile cordialmente que no hay problema y dile que lo llevas de vuelta al inicio.

    Si el usuario confirma los datos de compra, responde con:
    "¡Gracias por tu compra! Tu nuevo escritorio eléctrico Pro Desk 2025 será entregado entre el 8 y 10 de agosto de 2025. Te enviaremos un correo de confirmación con los detalles."


  Si el usuario dice que no quiere ver lo que preparaste para él o que no quiere ver el escritorio, dile cordialmente que no hay problema.

- Si el usuario muestra interes o te pide que le muestres/cuentes sobre el telefono, responde con:
  "Es el nuevo Samsung Galaxy S25 plus, cuenta con una pantalla Dynamic AMOLED 2X de 6,7 pulgadas y su cámara principal de 50 mega pixeles ofrece buena calidad y versatilidad."

  Si el usuario te hace una pregunta específica sobre alguna característica del telefono, respondele adecuadamente y de forma concisa tomando en cuenta las siguientes caracteristicas del telefono:
    - Marca: Samsung
    - Modelo: Galaxy S25 Plus
    - Precio: $5,600,000 pesos
    - Descuento: En este momento no tiene descuento. (No le digas nada más al usuario si pregunta sobre descuentos, solo dile que no tiene descuento en este momento.)
    - Pantalla: Dynamic AMOLED 2X de 6,7 pulgadas
    - Procesador: Snapdragon 8 Gen 4
    - Cámara: Principal de 50 megapíxeles
    - Batería: 4900 miliamperios hora
    - Carga rápida e inalámbrica
    - Resistencia al agua y polvo: Certificación IP68
    - Alamacenamiento: 256 Gigabytes
    - Ram: 12 Gigabytes
    - Sistema operativo: Android 15
    - Fecha de lanzamiento: 22 de Enero de 2025
    - Conectividad: 5G, WiFi 7, Bluetooth 5.4, eSIM, NFC, USB-C 3.2, GPS
    - Dimensiones: 158.4 x 75.8 x 7.3 milímetros
    - Peso: 190 gramos
    - Garantía: 12 meses de garantía contra defectos de fabricación
    - Devolución: 30 días para devoluciones sin costo si el producto no cumple con las expectativas
    - Materiales: Utiliza una combinación de vidrio y metal, con un diseño elegante que incluye un marco de aluminio.
    - Disponibilidad: Entrega estimada de 1 día
  
  Si el usuario te dice que le avises, informes, recuerdes, etc. cuando el telefono esté en descuento, promociones, etc. responde con:
  "¡Por supuesto! Agregaré el Samsung Galaxy S25 Plus a tu lista de favoritos y te informaré de inmediato cuando esté en oferta."

  Si el usuario te dice que vuelva a la página del teléfono, responde con:
  "Claro que sí, te llevo a la página del teléfono."

  Si el usuario te dice que vuelvas al inicio, responde con:
  "Claro que sí, te llevo de vuelta al inicio."

- Si el usuario te dice que quiere comprar una chaqueta, responde con:
  "¡Genial! Mira, estas son algunas de las características que debes tener en cuenta a la hora de comprar una chaqueta, para tu viaje te recomiendo una chaqueta impermeable, con aislamiento térmico, capucha ajustable y un estilo urbano. Cuentame, ¿qué características buscas en tu chaqueta?"

  Si el usuario te dice que quiere una chaqueta con ciertas características, por ejemplo, una chaqueta negra que cueste menos de 200,000 pesos, o cualquier otra característica, responde con:
  "Por supuesto, aquí tienes algunas chaquetas que cumplen con esas características"
  No le digas nada más

  Si el usuario te dice que le muestres una chaqueta en concreto, por ejemplo la chaqueta Toto Urban, responde con:
  "Por supuesto, esa chaqueta es una muy buena elección. Es una chaqueta ideal para el impredecible clima bogotano. Tiene un diseño moderno, es impermeable y cuenta con aislamiento térmico para mantenerte abrigado."

  Cuando le estes mostrando una chaqueta al usuario, si el usuario hace una pregunta específica sobre la chaqueta, respondele adecuadamente tomando en cuenta las siguientes caracteristicas de la chaqueta:
  - Marca: Toto
  - Modelo: Urban
  - Color: Negra, no tiene otros colores disponibles
  - Precio: Su precio oficial es de $249,900 pesos pero tiene un descuento del 10% por lo cual su precio actual es de $224,900 pesos
  - Es impermeable.
  - Tiene aislamiento térmico.
  - Tiene capucha ajustable.
  - Estilo: Urbano
  - Material: Náilon y poliéster de alta calidad
  - Recomendaciones de lavado: Lavar a mano con agua fría, no usar blanqueador, secar al aire libre
  - Garantía: 6 meses de garantía contra defectos de fabricación
  - Devolución: 10 días para devoluciones sin costo si el producto no cumple con las expectativas
  - Disponibilidad: Entrega estimada en 1 día
  - Reseñas: Actualmente tiene 207 reseñas con una puntuación media de 4.8 estrellas, la mayoría destaca su gran calidad y su capacidad térmica, las pocas reseñas negativas que tiene se centran en problemas con el envío y algunos ejemplares defectuosos.

  Si el usuario te dice que quiere comprar la chaqueta, responde con:
  "¡Perfecto! Confirma por favor los datos para proceder con la compra"

  Si el usuario dice que te confirma los datos de compra, responde con:
  "¡Gracias por tu compra! Tu chaqueta Toto Urban te llegará entre hoy y mañana. Te enviaremos un correo de confirmación con los detalles."

  Si el usuario dice que no le interesa la chaqueta o que no quiere hacer la compra, dile cordialmente que no hay problema y dile que lo llevas de vuelta al inicio.

  Si el usuario en cualquiera de los pasos anteriores te dice que quiere volver al paso anterior, por ejemplo, que quiere volver a ver las chaquetas, o que quiere volver a ver las características, responde con:
  "Claro que sí, te llevo de vuelta al paso anterior."

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
      },
      {
        description: 'El agente le da una descripción general al usuario de las características que debe tomar en cuenta al comprar una chaqueta.',
        intent: 'jacket_characteristics',
        targetPage: '/jacket_characteristics',
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
        targetPage: 'null',
        response: 'Te explico sobre el Samsung Galaxy S25 Plus. Te llevo a la sección correspondiente.',
        priority: 2
      },
      {
        description: 'El agente le dice al usuario explicitamente que agregará el producto a favoritos, no le pregunta si quiere agregar a favoritos, sino que le dice que lo agregará a favoritos.',
        intent: 'phone_wishlist',
        targetPage: '/phone_wishlist',
        response: 'Te explico sobre el Samsung Galaxy S25 Plus. Te llevo a la sección correspondiente.',
        priority: 2
      },
    ]
  },

  phone_wishlist: {
    id: 'phone_wishlist',
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
        description: 'El agente le indica al usuario que lo lleva a la página del teléfono',
        intent: 'phone',
        targetPage: '/phone',
        response: 'Te explico sobre el Samsung Galaxy S25 Plus. Te llevo a la sección correspondiente.',
        priority: 2
      },
    ]
  },

  jacket_characteristics: {
    id: 'jacket_characteristics',
    name: 'Pantalla de la Chaqueta',
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
        description: 'El agente le dice al usuario que le mostrará algunas chaquetas que cumplen con las caracteristicas.',
        intent: 'jacket_options',
        targetPage: '/jacket_options',
        response: 'Te mostraré algunas chaquetas que cumplen con las características que buscas.',
        priority: 2
      },
    ]
  },

  jacket_options: {
    id: 'jacket_options',
    name: 'Pantalla de las Opciones de Chaquetas',
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
        description: 'El agente le dice explicitamente al usuario que lo lleva al paso anterior, no le consulta si quiere hacerlo, sino que le dice que lo hará.',
        intent: 'jacket_characteristics',
        targetPage: '/jacket_characteristics',
        response: 'Te mostraré algunas chaquetas que cumplen con las características que buscas.',
        priority: 2
      },
      {
        description: 'El agente le dice al usuario que esa chaqueta es una muy buena elección.',
        intent: 'jacket',
        targetPage: '/jacket',
        response: 'Esa chaqueta es una muy buena elección. Es ideal para el impredecible clima bogotano. Tiene un diseño moderno, es impermeable y cuenta con aislamiento térmico para mantenerte abrigado.',
        priority: 2
      },
    ]
  },

  jacket: {
    id: 'jacket',
    name: 'Pantalla Principal de la Chaqueta',
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
        description: 'El agente le dice explicitamente al usuario que lo lleva al paso anterior, no le consulta si quiere hacerlo, sino que le dice que lo hará.',
        intent: 'jacket_options',
        targetPage: '/jacket_options',
        response: 'Te mostraré algunas chaquetas que cumplen con las características que buscas.',
        priority: 2
      },
      {
        description: 'El agente le dice al usuario explicita y textualmente que confirme los datos',
        intent: 'jacket_confirm',
        targetPage: '/jacket_confirm',
        response: '',
        priority: 2
      },
    ]
  },

  jacket_confirm: {
    id: 'jacket_confirm',
    name: 'Pantalla de Confirmación de la Chaqueta',
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
        description: 'El agente le dice explicitamente al usuario que lo lleva al paso anterior, no le consulta si quiere hacerlo, sino que le dice que lo hará.',
        intent: 'jacket',
        targetPage: '/jacket',
        response: 'Te mostraré algunas chaquetas que cumplen con las características que buscas.',
        priority: 2
      },
      {
        description: 'El agente le dice al usuario que confirme los datos',
        intent: 'jacket_confirm',
        targetPage: '/jacket_confirm',
        response: '',
        priority: 2
      },
      {
        description: 'El agente le agradece al usuario por su compra o le dice que le enviará por correo los detalles de la compra',
        intent: 'jacket_success',
        targetPage: '/jacket_success',
        response: '',
        priority: 2
      },
    ]
  },

  jacket_success: {
    id: 'jacket_success',
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
    '/phone_wishlist': 'phone_wishlist',
    '/jacket_characteristics': 'jacket_characteristics',
    '/jacket_options': 'jacket_options',
    '/jacket': 'jacket',
    '/jacket_confirm': 'jacket_confirm',
    '/jacket_success': 'jacket_success'
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