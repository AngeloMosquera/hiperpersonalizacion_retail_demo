"use client"

import { useState, useRef, useEffect } from "react"
import { StreamingAgent } from "./streaming-agent"
import { VoiceRecognition } from "./voice-recognition"
import { useRouter, usePathname } from "next/navigation"
import { useTransferStore } from '@/lib/store/transfer-store'
import { useCreditCardStore } from '@/lib/store/credit-card-store'

// Logger utility
const Logger = {
  info: (message: string, data?: any) => {
    console.log(`[VirtualAgent] ℹ️ ${message}`, data || '')
  },
  error: (message: string, error?: any) => {
    console.error(`[VirtualAgent] ❌ ${message}`, error || '')
  },
  warn: (message: string, data?: any) => {
    console.warn(`[VirtualAgent] ⚠️ ${message}`, data || '')
  },
  debug: (message: string, data?: any) => {
    console.debug(`[VirtualAgent] 🔍 ${message}`, data || '')
  },
  success: (message: string, data?: any) => {
    console.log(`[VirtualAgent] ✅ ${message}`, data || '')
  }
}

export function VirtualAgent() {
  const [isStreamReady, setIsStreamReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [connectionState, setConnectionState] = useState<'connecting' | 'connected' | 'error' | 'disconnected'>('disconnected')
  const streamingAgentRef = useRef<{ sendMessage: (text: string) => void }>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isMountedRef = useRef(true)
  const isTransfersPage = pathname === '/transfers' || pathname === '/transfers/confirmation'
  const isCreditCardPage = pathname === '/credit-card' || pathname === '/credit-card/confirmation'
  const setTransferData = useTransferStore((state) => state.setTransferData)
  const setCreditCardData = useCreditCardStore((state) => state.setCreditCardData)

  const handleStreamReady = () => {
    if (!isMountedRef.current) return
    Logger.info('Stream listo para recibir mensajes')
    setIsStreamReady(true)
    setConnectionState('connected')
    setError(null) // Clear any previous errors when connection is successful
    
    // Send initial welcome message to make the avatar appear
    if (streamingAgentRef.current) {
      const initialMessage = `<break time="100ms"/>`
      Logger.info('Enviando mensaje inicial al avatar', { message: initialMessage })
      
      // Small delay to ensure the stream is fully ready
      setTimeout(() => {
        if (streamingAgentRef.current && isMountedRef.current) {
          streamingAgentRef.current.sendMessage(initialMessage)
          Logger.success('Mensaje inicial enviado al avatar')
        }
      }, 1000)
    }
  }

  const handleStreamError = (error: string) => {
    if (!isMountedRef.current) return
    
    // In development, WebRTC errors during strict mode are expected
    if (process.env.NODE_ENV === 'development' && 
        (error.includes('setRemoteDescription') || error.includes('m-lines') || error.includes('inicializar'))) {
      Logger.warn('Error de desarrollo detectado (React Strict Mode), ignorando', { error })
      return
    }
    
    Logger.error('Error en el stream', { error })
    setError(error)
    setConnectionState('error')
  }

  const handleSpeechRecognized = async (text: string) => {
    if (!isMountedRef.current) return
    
    try {
      Logger.info('Transcripción recibida', text)

      const {nombreDestinatario, amount, description} = useTransferStore.getState();

      const {monthlyIncome, employmentStatus, timeEmployed} = useCreditCardStore.getState();

      let body: any = {
        text: text
      }

      if (isTransfersPage) {
        body = {
          text: text,
          nombreDestinatario: nombreDestinatario,
          amount: amount,
          description: description
        }
      }

      if (isCreditCardPage) {
        body = {
          text: text,
          monthlyIncome: monthlyIncome,
          employmentStatus: employmentStatus,
          timeEmployed: timeEmployed
        }
      }
      // Enviar la transcripción a OpenAI
      Logger.debug('Enviando transcripción a OpenAI')
      const openaiResponse = await fetch(
        isTransfersPage ? '/api/openai/transfers' : 
        isCreditCardPage ? '/api/openai/credit-card' : 
        '/api/openai', 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }
      )

      if (!openaiResponse.ok) {
        const errorText = await openaiResponse.text()
        Logger.error('Error al procesar con OpenAI', {
          status: openaiResponse.status,
          error: errorText
        })
        throw new Error(`Error al procesar con OpenAI: ${openaiResponse.status} - ${errorText}`)
      }

      const result = await openaiResponse.json()
      Logger.info('Respuesta de OpenAI recibida', result)

      // Enviar respuesta al avatar
      if (result.response && streamingAgentRef.current && isMountedRef.current) {
        if (isTransfersPage) {
          // Guardar los datos de la transferencia en el store
          setTransferData(result.response)
          // Enviar solo el mensaje de respuesta al avatar
          streamingAgentRef.current.sendMessage(result.response.response)

          if (result.response.page){
            router.push(`/${result.response.page}`)
          } else {
            router.push('/transfers/confirmation')
          }
        } else if (isCreditCardPage) {
          // Guardar los datos de la tarjeta de crédito en el store
          setCreditCardData(result.response)
          // Enviar solo el mensaje de respuesta al avatar
          streamingAgentRef.current.sendMessage(result.response.response)

          if (result.response.page){
            router.push(`/${result.response.page}`)
          } else {
            router.push('/credit-card/confirmation')
          }
        } else {
          const { text: responseText, page, reason } = result.response
          streamingAgentRef.current.sendMessage(responseText)
          if (page) {
            router.push(`/${page}`)
          }
        }
        Logger.success('Respuesta enviada al avatar')
      } else {
        Logger.warn('Respuesta de OpenAI sin datos esperados', { result })
      }
    } catch (err) {
      if (isMountedRef.current) {
        Logger.error('Error al procesar la transcripción', err)
        setError("Error al procesar la solicitud")
      }
    }
  }

  // Log cuando el componente se monta
  useEffect(() => {
    Logger.info('Componente VirtualAgent montado')
    isMountedRef.current = true
    
    return () => {
      Logger.info('Componente VirtualAgent desmontado')
      isMountedRef.current = false
    }
  }, [])

  // Log cuando cambia el estado de error (solo en development con errores reales)
  useEffect(() => {
    if (error && isMountedRef.current) {
      // Only log real errors, not development-related ones
      if (!(process.env.NODE_ENV === 'development' && 
            (error.includes('setRemoteDescription') || error.includes('m-lines')))) {
        Logger.error('Error actualizado', { error })
      }
    }
  }, [error])

  // Log cuando cambia el estado de stream
  useEffect(() => {
    if (isMountedRef.current) {
      Logger.debug('Estado del stream actualizado', { isStreamReady })
    }
  }, [isStreamReady])

  return (
    <div className="h-full w-full flex items-end justify-center bg-white relative">
      {/* Show errors only in production or for real errors */}
      {error && process.env.NODE_ENV === 'production' && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg max-w-[80%] z-10">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <StreamingAgent
        ref={streamingAgentRef}
        apiKey={process.env.DID_API_KEY || ""}
        onStreamReady={handleStreamReady}
        onStreamError={handleStreamError}
      />

      {/* Botón de micrófono */}
      {isStreamReady && (
        <div className="absolute bottom-6 right-6">
          <VoiceRecognition onSpeechRecognized={handleSpeechRecognized} />
        </div>
      )}
    </div>
  )
}
