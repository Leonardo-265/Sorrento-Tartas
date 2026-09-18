import { useState, useEffect } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F4EFE6]/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-bold text-lg lg:text-xl tracking-tight text-[#1A1A1A]"
          >
            Tartas By Sorrento
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-sm font-medium text-[#1A1A1A] hover:text-[#C41E3A] transition-colors"
            >
              Catálogo
            </button>
            <button
              onClick={() => scrollToSection('como-pedir')}
              className="text-sm font-medium text-[#1A1A1A] hover:text-[#C41E3A] transition-colors"
            >
              Cómo pedir
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-sm font-medium text-[#1A1A1A] hover:text-[#C41E3A] transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-[#1A1A1A]/5 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-[#1A1A1A]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C41E3A] text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button className="p-2 rounded-full hover:bg-[#1A1A1A]/5 transition-colors">
                  <Menu className="w-5 h-5 text-[#1A1A1A]" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#F4EFE6] border-l border-[#1A1A1A]/10">
                <SheetHeader>
                  <SheetTitle className="text-left font-bold text-[#1A1A1A]">
                    Tartas By Sorrento
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <button
                    onClick={() => scrollToSection('catalogo')}
                    className="text-left text-lg font-medium text-[#1A1A1A] hover:text-[#C41E3A] transition-colors py-2"
                  >
                    Catálogo
                  </button>
                  <button
                    onClick={() => scrollToSection('como-pedir')}
                    className="text-left text-lg font-medium text-[#1A1A1A] hover:text-[#C41E3A] transition-colors py-2"
                  >
                    Cómo pedir
                  </button>
                  <button
                    onClick={() => scrollToSection('contacto')}
                    className="text-left text-lg font-medium text-[#1A1A1A] hover:text-[#C41E3A] transition-colors py-2"
                  >
                    Contacto
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
