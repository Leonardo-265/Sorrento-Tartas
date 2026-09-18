import { Instagram, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#1A1A1A] py-12 lg:py-16 z-[80]">
      <div className="px-6 lg:px-[6vw]">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-10">
            {/* Brand */}
            <div>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                Tartas By Sorrento
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Tartas caseras, hechas con tiempo. Masa quebrada, relleno generoso, horneadas el mismo día en Bahía Blanca.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-[0.12em] text-white/40 mb-4">
                Links
              </h4>
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-white/60 hover:text-white transition-colors text-left"
                >
                  Catálogo
                </button>
                <button
                  onClick={() => document.getElementById('como-pedir')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-white/60 hover:text-white transition-colors text-left"
                >
                  Cómo pedir
                </button>
                <button
                  onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-white/60 hover:text-white transition-colors text-left"
                >
                  Contacto
                </button>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-[0.12em] text-white/40 mb-4">
                Contacto
              </h4>
              <div className="space-y-3">
                <a
                  href="https://wa.me/5492915371382"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +54 9 291 537-1382
                </a>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="w-4 h-4" />
                  Estomba 159, Bahía Blanca
                </div>
                <a
                  href="https://instagram.com/sorrento.pastas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @sorrento.pastas
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/40">
                © {currentYear} Tartas By Sorrento. Todos los derechos reservados.
              </p>
              <p className="text-xs text-white/40">
                Hecho con ❤️ en Bahía Blanca
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
