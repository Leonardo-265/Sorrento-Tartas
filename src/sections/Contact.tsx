import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Instagram, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        left,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.3,
          },
        }
      );

      gsap.fromTo(
        right,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.3,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/5492915371382', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative w-full bg-[#E9E1D2] py-20 lg:py-32 z-[70]"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative px-6 lg:px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <div ref={leftRef}>
            <h2 className="text-3xl lg:text-[clamp(32px,3.6vw,52px)] font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-4">
              Hacé tu pedido
            </h2>
            <p className="text-base lg:text-lg text-[#6E6A60] mb-8">
              Escribinos por WhatsApp o pasá a retirar. Horneamos todos los días.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 mb-8">
              <a
                href="https://wa.me/5492915371382"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-[16px] hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-[#C41E3A]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#C41E3A]" />
                </div>
                <div>
                  <p className="text-sm text-[#6E6A60]">WhatsApp</p>
                  <p className="font-medium text-[#1A1A1A]">+54 9 291 537-1382</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-[16px]">
                <div className="w-10 h-10 bg-[#C41E3A]/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#C41E3A]" />
                </div>
                <div>
                  <p className="text-sm text-[#6E6A60]">Dirección</p>
                  <p className="font-medium text-[#1A1A1A]">Estomba 159, Bahía Blanca</p>
                </div>
              </div>

              <a
                href="https://instagram.com/sorrento.pastas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-[16px] hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-[#C41E3A]/10 rounded-full flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[#C41E3A]" />
                </div>
                <div>
                  <p className="text-sm text-[#6E6A60]">Instagram</p>
                  <p className="font-medium text-[#1A1A1A]">@sorrento.pastas</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-[16px]">
                <div className="w-10 h-10 bg-[#C41E3A]/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#C41E3A]" />
                </div>
                <div>
                  <p className="text-sm text-[#6E6A60]">Horario</p>
                  <p className="font-medium text-[#1A1A1A]">Lun a Sáb: 10:00 - 20:00</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={openWhatsApp}
              className="bg-[#C41E3A] hover:bg-[#a01830] text-white px-8 py-6 rounded-full text-base font-medium transition-all hover:scale-105 w-full lg:w-auto"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Escribir por WhatsApp
            </Button>

            <p className="text-sm text-[#6E6A60] mt-4">
              Respuesta en minutos. Envíos y take away.
            </p>
          </div>

          {/* Right - Map/Image */}
          <div ref={rightRef} className="relative">
            <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-[28px] overflow-hidden bg-[#F4EFE6]">
              {/* Static map representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-[#C41E3A] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                    Bahía Blanca
                  </h3>
                  <p className="text-[#6E6A60]">
                    Estomba 159
                  </p>
                  <p className="text-sm text-[#6E6A60] mt-2">
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-[#C41E3A]/10 rounded-full" />
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-[#C41E3A]/5 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
