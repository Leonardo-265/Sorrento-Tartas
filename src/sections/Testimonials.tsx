import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Lucía M.',
    text: 'La masa es increíblemente crocante. La de verdura es mi favorita.',
    rating: 5,
  },
  {
    name: 'Martín R.',
    text: 'Llegó caliente y en tiempo. Perfecta para el almuerzo de oficina.',
    rating: 5,
  },
  {
    name: 'Cecilia T.',
    text: 'Pedimos la grande para la familia. Rindió exacto. Muy rica.',
    rating: 5,
  },
  {
    name: 'Javier P.',
    text: 'La de jamón y queso es la mejor que probé en Bahía. Vuelvo siempre.',
    rating: 5,
  },
  {
    name: 'Mariana G.',
    text: 'Excelente atención y la tarta llegó en perfecto estado. Recomiendo.',
    rating: 5,
  },
  {
    name: 'Diego L.',
    text: 'Probé la de pollo con champiñones. Un lujo. Ya pedí de nuevo.',
    rating: 5,
  },
];

export function Testimonials() {
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
      className="relative w-full bg-[#F4EFE6] py-20 lg:py-32 z-[60]"
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
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-[clamp(32px,3.6vw,52px)] font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-4">
            Lo que dicen
          </h2>
          <p className="text-base lg:text-lg text-[#6E6A60] max-w-xl mx-auto">
            Pedidos reales de clientes de Bahía Blanca.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-[22px] p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#C41E3A]/20 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#C41E3A] text-[#C41E3A]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#1A1A1A] leading-relaxed mb-4">
                "{testimonial.text}"
              </p>

              {/* Name */}
              <p className="text-sm font-medium text-[#6E6A60]">
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
