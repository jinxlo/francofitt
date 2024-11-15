import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FrancoFitt | Entrenamiento Personalizado con IA',
  description: 'Transforma tu cuerpo y alcanza tus objetivos fitness con FrancoFitt. Entrenamiento personalizado con IA, planes nutricionales adaptativos y seguimiento en tiempo real.',
  keywords: 'entrenamiento personal, fitness, IA, nutrición, transformación física, FrancoFitt',
  openGraph: {
    title: 'FrancoFitt | Entrenamiento Personalizado con IA',
    description: 'Transforma tu cuerpo y alcanza tus objetivos fitness con FrancoFitt. Entrenamiento personalizado con IA, planes nutricionales adaptativos y seguimiento en tiempo real.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FrancoFitt | Entrenamiento Personalizado con IA',
    description: 'Transforma tu cuerpo y alcanza tus objetivos fitness con FrancoFitt. Entrenamiento personalizado con IA, planes nutricionales adaptativos y seguimiento en tiempo real.',
    images: ['/logo.png'],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
