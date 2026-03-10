import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export function Featured() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const { addToCart } = useCart();

  const featuredProduct = products.find((p) => p.id === 'jamon-y-queso-grande')!;

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    const cta = ctaRef.current;

    if (!section || !card || !content || !cta) return;

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
          card,
          { x: '-60vw', scale: 0.92, rotate: -1, opacity: 0 },
          { x: 0, scale: 1, rotate: 0, opacity: 1, ease: 'power3.out' },
          0
        )
        .fromTo(
          content.children,
          { x: '40vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 },
          0.05
        )
        .fromTo(
          cta,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.1
        );

      // SETTLE (30-70%) - hold positions

      // EXIT (70-100%)
      scrollTl
        .fromTo(
          card,
          { x: 0, y: 0, scale: 1, opacity: 1 },
          { x: '-18vw', y: '8vh', scale: 0.95, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          content,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cta,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.75
        );

      // Ambient breathing animation during settle
      gsap.to(card, {
        scale: 1.01,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F4EFE6] z-20"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative w-full h-full flex items-center px-6 lg:px-[6vw]">
        {/* Photo Card - Left */}
        <div
          ref={cardRef}
          className="relative w-[88vw] lg:w-[56vw] h-[45vh] lg:h-[64vh] rounded-[28px] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
        >
          <img
            src="/featured_jamon.jpg"
            alt="Tarta de Jamón y Queso"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content - Right */}
        <div
          ref={contentRef}
          className="absolute right-6 lg:right-[6vw] top-[55vh] lg:top-[28vh] w-[88vw] lg:w-[26vw]"
        >
          <span className="inline-block text-xs font-mono uppercase tracking-[0.12em] text-[#C41E3A] mb-4">
            Más pedida
          </span>
          <h2 className="text-3xl lg:text-[clamp(32px,3.6vw,52px)] font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-4">
            Jamón<br />& Queso
          </h2>
          <p className="text-base lg:text-lg text-[#6E6A60] leading-relaxed">
            La clásica que nunca falla. Queso derretido, jamón cocido y un toque de orégano.
          </p>
        </div>

        {/* CTA */}
        <Button
          ref={ctaRef}
          onClick={() => addToCart(featuredProduct)}
          className="absolute right-6 lg:right-[6vw] top-[78vh] lg:top-[62vh] bg-[#C41E3A] hover:bg-[#a01830] text-white px-6 lg:px-8 py-5 lg:py-6 rounded-full text-sm font-medium transition-all hover:scale-105"
        >
          <Plus className="mr-2 w-4 h-4" />
          Agregar al pedido
        </Button>
      </div>
    </section>
  );
}
