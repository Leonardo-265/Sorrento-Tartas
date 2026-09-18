import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, UtensilsCrossed, Truck, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Smartphone,
    title: 'Elegí tu tarta',
    description: 'Seleccioná el sabor y tamaño que más te guste desde nuestro catálogo.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Personalizá',
    description: 'Elegí entre masa clásica o integral. Combiná sabores en tartas grandes.',
  },
  {
    icon: Truck,
    title: 'Recibí o retirá',
    description: 'Te la llevamos a tu puerta o la retirás en Estomba 159.',
  },
  {
    icon: Clock,
    title: 'Disfrutá',
    description: 'Horneamos el mismo día. Calentita y lista para la mesa.',
  },
];

export function HowToOrder() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.3,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="como-pedir"
      className="relative w-full min-h-screen bg-[#E9E1D2] py-20 lg:py-32 z-50"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div ref={contentRef} className="relative px-6 lg:px-[6vw]">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-[clamp(32px,3.6vw,52px)] font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-4">
            Cómo pedir
          </h2>
          <p className="text-base lg:text-lg text-[#6E6A60] max-w-xl mx-auto">
            En simples pasos, tu tarta casera llega a tu mesa.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative bg-white/80 backdrop-blur-sm rounded-[22px] p-6 lg:p-8 text-center"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#C41E3A] text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#F4EFE6] rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-6 h-6 lg:w-7 lg:h-7 text-[#C41E3A]" />
              </div>

              {/* Content */}
              <h3 className="text-lg lg:text-xl font-bold text-[#1A1A1A] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#6E6A60] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Delivery Info */}
        <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-5 h-5 text-[#C41E3A]" />
              <h3 className="text-lg font-bold text-[#1A1A1A]">Delivery</h3>
            </div>
            <p className="text-sm text-[#6E6A60] mb-2">
              Envíos en Bahía Blanca centro y alrededores.
            </p>
            <p className="text-sm text-[#6E6A60]">
              Consultá costo según zona.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-[22px] p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-[#C41E3A]" />
              <h3 className="text-lg font-bold text-[#1A1A1A]">Take Away</h3>
            </div>
            <p className="text-sm text-[#6E6A60] mb-2">
              Retirá por Estomba 159, Bahía Blanca.
            </p>
            <p className="text-sm text-[#6E6A60]">
              Horario: Lun a Sáb de 10:00 a 20:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
