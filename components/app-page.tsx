'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, ChevronRight, Menu, ArrowRight, Zap, Target, Users, Youtube } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const glowingLinesStyles = `
  @keyframes moveLines {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 100%;
    }
  }

  .glowing-lines {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-image: 
      linear-gradient(to bottom, transparent 50%, rgba(140, 198, 63, 0.1) 50%),
      linear-gradient(to right, transparent 50%, rgba(140, 198, 63, 0.1) 50%);
    background-size: 100px 100px, 100px 100px;
    animation: moveLines 20s linear infinite;
    pointer-events: none;
  }

  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }

  .cursor-glow {
    pointer-events: none;
    position: fixed;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle,
      rgba(140, 198, 63, 0.2) 0%,
      rgba(140, 198, 63, 0.1) 25%,
      rgba(140, 198, 63, 0.05) 50%,
      transparent 70%
    );
    mix-blend-mode: screen;
    filter: blur(10px);
    transition: all 0.1s ease;
    z-index: 2;
  }

  .programa-glow {
    pointer-events: none;
    position: absolute;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(
      circle,
      rgba(140, 198, 63, 0.2) 0%,
      rgba(140, 198, 63, 0.1) 25%,
      rgba(140, 198, 63, 0.05) 50%,
      transparent 70%
    );
    mix-blend-mode: screen;
    filter: blur(10px);
    transition: all 0.1s ease;
    z-index: 2;
  }
`

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function PaginaInicio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const heroRef = useRef(null)
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const glowRef = useRef(null)
  const [isMouseInPrograms, setIsMouseInPrograms] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
    setActiveSection(sectionId)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre-mí', 'programas', 'testimonios', 'contacto']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (glowRef.current) {
      (glowRef.current as HTMLElement).style.background = `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(140, 198, 63, 0.04), transparent 80%)`
    }
  }, [mousePosition])

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <style jsx>{glowingLinesStyles}</style>
      <div 
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          opacity: 0.8,
        }}
      />
      <div className="glowing-lines" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stars-background-7KTGBHGXWvlQPXDLlLVlLXBZlXBHAz.jpg')] bg-cover bg-center opacity-20 pointer-events-none z-0"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Promo Banner */}
        <motion.div 
          className="w-full bg-[#1A1A1A] py-2 px-4 text-center text-sm text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="flex items-center justify-center gap-2">
            ¡Obtén un 30% de descuento en tu primer mes!
            <Link href="/signup" className="text-[#8CC63F] hover:text-[#7AB32E] flex items-center">
              Empieza ahora <ChevronRight className="h-4 w-4" />
            </Link>
          </p>
        </motion.div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between h-12">
              <Link href="/" className="z-10 pl-8 md:pl-16">
                <Image
                  src="/logo.png"
                  alt="FrancoFitt Logo"
                  width={160}
                  height={40}
                  className="h-auto w-[120px] md:w-[160px]"
                  priority
                />
              </Link>
              <nav className="hidden md:flex gap-8">
                {['INICIO', 'SOBRE MÍ', 'PROGRAMAS', 'TESTIMONIOS', 'CONTACTO'].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.button 
                      onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                      className={`text-sm font-medium transition-colors relative ${
                        activeSection === item.toLowerCase().replace(' ', '-')
                          ? 'text-[#8CC63F]'
                          : 'text-white hover:text-[#8CC63F]'
                      }`}
                    >
                      {item}
                      {activeSection === item.toLowerCase().replace(' ', '-') && (
                        <motion.span
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8CC63F]"
                          layoutId="underline"
                        />
                      )}
                    </motion.button>
                  </motion.div>
                ))}
              </nav>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menu</span>
                </Button>
              </div>
            </div>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav 
                  className="mt-4 flex flex-col gap-4 md:hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {['INICIO', 'SOBRE MÍ', 'PROGRAMAS', 'TESTIMONIOS', 'CONTACTO'].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                      className={`text-sm font-medium transition-colors text-left ${
                        activeSection === item.toLowerCase().replace(' ', '-')
                          ? 'text-[#8CC63F]'
                          : 'text-white hover:text-[#8CC63F]'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.button>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section id="inicio" ref={heroRef} className="relative min-h-screen w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_79162.JPG-AaVfhYX0QSaovKY13Fd2truN5VDUMc.jpeg"
                alt="Entrenador personal con equipo de entrenamiento"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
                quality={100}
                className="object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-20"></div>
            <div className="relative z-30 flex items-center justify-center min-h-screen">
              <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
                <motion.div 
                  className="max-w-3xl mx-auto text-center"
                  initial="initial"
                  animate="animate"
                  variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.h1 
                    className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
                    variants={fadeInUp}
                  >
                    Crea tu mejor versión
                    <br />
                    <span className="text-[#8CC63F]">con la app de FrancoFitt</span>
                  </motion.h1>
                  <motion.p 
                    className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto"
                    variants={fadeInUp}
                  >
                    Entrenamiento de próxima generación con IA para resultados extraordinarios
                  </motion.p>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    variants={fadeInUp}
                  >
                    <Button className="bg-[#8CC63F] hover:bg-[#7AB32E] text-black px-8 py-6 text-lg rounded-full">
                      Inicia Tu Evolución
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#8CC63F] text-[#8CC63F] hover:bg-[#8CC63F] hover:text-black px-8 py-6 text-lg rounded-full transition-all duration-300"
                      onClick={() => scrollToSection('programas')}
                    >
                      Explora Programas
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-20 bg-[#111]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Zap className="h-8 w-8 text-[#8CC63F]" />,
                    title: "IA Personalizada",
                    description: "Algoritmos avanzados adaptan tu entrenamiento en tiempo real"
                  },
                  {
                    icon: <Target className="h-8 w-8 text-[#8CC63F]" />,
                    title: "Análisis Predictivo",
                    description: "Proyecciones precisas de tu progreso y resultados futuros"
                  },
                  {
                    icon: <Users className="h-8 w-8 text-[#8CC63F]" />,
                    title: "Comunidad Virtual",
                    description: "Conecta y compite en un ecosistema fitness de vanguardia"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(140, 198, 63, 0.3)' }}
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="sobre-mí" className="py-24 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/stars-background-7KTGBHGXWvlQPXDLlLVlLXBZlXBHAz.jpg')] bg-cover bg-center opacity-30"></div>
            <div className="grid-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-white">Innovación Fitness</h2>
                  <p className="text-gray-400">
                    Con más de una década de experiencia en fitness y tecnología,
                    hemos desarrollado un sistema revolucionario que fusiona el entrenamiento personalizado
                    con inteligencia artificial de vanguardia.
                  </p>
                  <p className="text-gray-400">
                    Nuestra misión es potenciar tu rendimiento y transformar tu cuerpo
                    utilizando datos en tiempo real y adaptación continua.
                  </p>
                  <Button 
                    className="bg-[#8CC63F] hover:bg-[#7AB32E] text-black"
                    onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                  >
                    {isAboutExpanded ? 'Menos Información' : 'Descubre la Tecnología'}
                  </Button>
                </motion.div>
                <motion.div 
                  className="relative aspect-[3/4] w-full max-w-md mx-auto"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7862%20(1).JPG-o3vJOStNGTcpc2zr798XA86iYS9Z6C.jpeg"
                    alt="Entrenador utilizando tecnología avanzada"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-2xl shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
                </motion.div>
              </div>
              <AnimatePresence>
                {isAboutExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 bg-[#111] rounded-2xl p-8"
                  >
                    <h3 className="text-2xl font-bold mb-4 text-white">Nuestra Tecnología Revolucionaria</h3>
                    <p className="text-gray-400 mb-4">
                      FrancoFitt utiliza algoritmos de inteligencia artificial de vanguardia para analizar tu rendimiento en tiempo real. Nuestro sistema:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Adapta tu plan de entrenamiento basado en tu progreso diario",
                        "Proporciona retroalimentación instantánea sobre tu forma y técnica",
                        "Predice tus resultados futuros y ajusta tus objetivos automáticamente",
                        "Integra datos de tu dieta y sueño para una optimización holística"
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-[#8CC63F] mt-1 flex-shrink-0" />
                          <p className="text-gray-400">{feature}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-400 mt-4">
                      Con FrancoFitt, cada sesión de entrenamiento es una experiencia personalizada diseñada para maximizar tus resultados y minimizar el riesgo de lesiones.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Programs Section */}
          <section 
            id="programas" 
            className="py-12 md:py-24 bg-[#111] relative"
            onMouseEnter={() => setIsMouseInPrograms(true)}
            onMouseLeave={() => setIsMouseInPrograms(false)}
          >
            <div 
              className="programa-glow"
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                opacity: 0.8,
                display: isMouseInPrograms ? 'block' : 'none'
              }}
            />
            <div className="container mx-auto px-4">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4 text-white">Programa de Elite</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Descubre nuestro programa exclusivo diseñado para impulsar tu evolución física y mental
                </p>
              </motion.div>
              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(140, 198, 63, 0.3)' }}
                >
                  <Card className="relative overflow-hidden bg-black/50 border-[#8CC63F] border-2 backdrop-blur-sm shadow-lg shadow-[#8CC63F]/20">
                    <div className="absolute top-0 right-0 bg-[#8CC63F] text-black px-4 py-1 text-sm font-bold">
                      Programa Exclusivo
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-white">FrancoFitt Premium</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-[#8CC63F]">$40</span>
                        <span className="text-gray-400">/mes</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4 mb-6">
                        {[
                          "IA de entrenamiento personalizada",
                          "Plan nutricional adaptativo",
                          "Seguimiento biométrico avanzado",
                          "Acceso a clases virtuales exclusivas",
                          "Soporte 24/7 de entrenadores expertos"
                        ].map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <ArrowRight className="h-4 w-4 text-[#8CC63F]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="w-full bg-[#8CC63F] hover:bg-[#7AB32E] text-black">
                          Comenzar Ahora
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonios" className="py-12 md:py-24 bg-black relative overflow-hidden">
            <div className="grid-overlay"></div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4 text-white">Transformaciones Reales</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Historias inspiradoras de miembros que han transformado sus vidas con FrancoFitt
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "María Rodríguez",
                    duration: "6 meses",
                    testimonial: "El programa de FrancoFitt revolucionó mi rutina de ejercicios. La IA personalizada se adaptó perfectamente a mis necesidades y objetivos.",
                    beforeImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9fa7169f-cce5-42d1-bfc7-16b225cc231c-tbJCeE8HKCJhyp6t75pL0xX1sWo0Y2.jpeg",
                    rating: 5
                  },
                  {
                    name: "Ana García",
                    duration: "8 meses",
                    testimonial: "Increíble transformación tanto física como mental. El enfoque holístico y el seguimiento constante fueron clave para alcanzar mis metas.",
                    beforeImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4bf78188-13f9-4837-841e-9ffa6e3f1a28-QO1BgvjTX21gmGhfhP66RIfoKvtLU7.jpeg",
                    rating: 5
                  },
                  {
                    name: "Laura Martínez",
                    duration: "4 meses",
                    testimonial: "La tecnología de FrancoFitt hace que cada entrenamiento sea efectivo y motivador. Los resultados hablan por sí mismos.",
                    beforeImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo-output-12rhXgCA2uWthTv0nVRBnx6Qt5zEbp.jpeg",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#111] rounded-2xl overflow-hidden border border-white/10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(140, 198, 63, 0.3)' }}
                  >
                    <div className="grid grid-rows-[auto,1fr] h-full">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={testimonial.beforeImage}
                          alt={`Transformación de ${testimonial.name}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      </div>
                      <div className="p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 + 0.5 }}
                              >
                                <svg className="w-5 h-5 text-[#8CC63F]" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </motion.div>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{testimonial.name}</h3>
                          <p className="text-[#8CC63F] text-sm mb-4">{testimonial.duration} de transformación</p>
                          <p className="text-gray-300 text-sm">{testimonial.testimonial}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Button className="bg-[#8CC63F] hover:bg-[#7AB32E] text-black px-8 py-6 text-lg rounded-full">
                  Comienza Tu Transformación
                </Button>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contacto" className="py-24 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon%20png-nIigKRzhJh5mRaNrgEU2eZBlf5D44J.png"
                    alt="FrancoFitt Icon"
                    width={60}
                    height={60}
                    className="w-16 h-16 mx-auto mb-8"
                  />
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    El Futuro del Fitness Comienza Hoy
                  </h2>
                  <p className="text-gray-400 mb-8">
                    Únete a la revolución del entrenamiento personalizado con IA
                  </p>
                  <Button className="bg-[#8CC63F] hover:bg-[#7AB32E] text-black px-8 py-6 text-lg rounded-full">
                    Inicia Tu Transformación
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[#111] border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center gap-4 py-2">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link href="https://instagram.com" className="text-gray-400 hover:text-[#8CC63F] transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link href="https://youtube.com" className="text-gray-400 hover:text-[#8CC63F] transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="text-center text-sm text-gray-400 pb-2">
              © {new Date().getFullYear()} FrancoFitt APP. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}