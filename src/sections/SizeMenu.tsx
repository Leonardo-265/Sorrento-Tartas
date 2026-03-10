import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sizeOptions } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export function SizeMenu() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

    if (!section || !headline || !cards || !cta) return;

    const cardElements = cards.querySelectorAll('.size-card');

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(
          headline,
          { y: '-12vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0
        )
        .fromTo(
          cardElements,
          { y: '80vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'power3.out', stagger: 0.03 },
          0.05
        )
        .fromTo(
          cta,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.15
        );

      // SETTLE (30-70%) - hold

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cardElements,
          { y: 0, scale: 1, opacity: 1 },
          { y: '-18vh', scale: 0.96, opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.7
        )
        .fromTo(
          cta,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToCatalog = () => {
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F4EFE6] z-30"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full h-full flex flex-col justify-center px-6 lg:px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-6 lg:mb-8">
          <h2 className="text-3xl lg:text-[clamp(32px,3.6vw,52px)] font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-2">
            Elegí el tamaño
          </h2>
          <p className="text-base lg:text-lg text-[#6E6A60]">
            Individual, para compartir o para la mesa completa.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row gap-4 lg:gap-[3vw] w-full lg:w-[88vw]"
        >
          {sizeOptions.map((size) => (
            <div
              key={size.id}
              className="size-card relative w-full lg:w-[26vw] h-[28vh] lg:h-[54vh] rounded-[28px] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.10)] bg-white group cursor-pointer"
            >
              <div className="absolute inset-0">
                <img
                  src={size.image}
                  alt={size.name}
                  className="w-full h-[65%] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-4 lg:p-6 flex flex-col justify-center">
                <h3 className="text-lg lg:text-xl font-bold text-[#1A1A1A] mb-1">
                  {size.name}
                </h3>
                <p className="text-sm text-[#6E6A60] mb-1">
                  {size.portions} porción{size.portions > 1 ? 'es' : ''}
                </p>
                <p className="text-sm font-mono text-[#C41E3A]">
                  desde ${size.basePrice.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          ref={ctaRef}
          onClick={scrollToCatalog}
          variant="outline"
          className="mt-6 lg:mt-8 w-fit border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white px-6 py-5 rounded-full text-sm font-medium transition-all"
        >
          Ver sabores
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
