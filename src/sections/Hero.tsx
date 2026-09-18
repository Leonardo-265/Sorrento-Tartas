import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !content || !cta) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      introTl
        .fromTo(
          card,
          { opacity: 0, x: '-12vw', scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 0.9 }
        )
        .fromTo(
          content.children,
          { opacity: 0, x: '6vw' },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.08 },
          '-=0.5'
        )
        .fromTo(
          cta,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            gsap.set([card, content, cta], { opacity: 1, x: 0, y: 0, scale: 1 });
          },
        },
      });

      // Exit animations (70-100%)
      scrollTl
        .fromTo(
          card,
          { x: 0, y: 0, scale: 1, opacity: 1 },
          { x: '-28vw', y: '10vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          content,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cta,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
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
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-[#F4EFE6] z-10"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full h-full flex items-center px-6 lg:px-[6vw]">
        {/* Hero Card - Image */}
        <div
          ref={cardRef}
          className="relative w-[88vw] lg:w-[62vw] h-[50vh] lg:h-[64vh] rounded-[28px] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
        >
          <img
            src="/hero_tarta.jpg"
            alt="Tarta casera artesanal"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content - Right side */}
        <div
          ref={contentRef}
          className="absolute right-6 lg:right-[6vw] top-[60vh] lg:top-[26vh] w-[88vw] lg:w-[22vw]"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.12em] text-[#6E6A60] mb-4">
            Envíos en Bahía Blanca
          </span>
          <h1 className="text-4xl lg:text-[clamp(44px,5vw,72px)] font-bold text-[#1A1A1A] leading-[0.95] tracking-[-0.02em] mb-4">
            Tartas<br />caseras
          </h1>
          <p className="text-base lg:text-lg text-[#6E6A60] leading-relaxed">
            Masa quebrada, relleno generoso, horneadas el mismo día.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          ref={ctaRef}
          onClick={scrollToCatalog}
          className="absolute right-6 lg:right-[6vw] top-[78vh] lg:top-[62vh] bg-[#C41E3A] hover:bg-[#a01830] text-white px-6 lg:px-8 py-5 lg:py-6 rounded-full text-sm font-medium transition-all hover:scale-105"
        >
          Ver catálogo
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
