import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { products, flavors } from '@/data/products';
import type { Size, Flavor } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export function Catalog() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<Size | 'all'>('all');
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | 'all'>('all');
  const { addToCart } = useCart();

  const filteredProducts = products.filter((product) => {
    const sizeMatch = selectedSize === 'all' || product.category === selectedSize;
    const flavorMatch = selectedFlavor === 'all' || product.flavor === flavors.find(f => f.id === selectedFlavor)?.name;
    return sizeMatch && flavorMatch;
  });

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
          stagger: 0.05,
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

  const sizeLabels: Record<Size | 'all', string> = {
    all: 'Todos',
    tarteleta: 'Tarteletas',
    media: 'Medias',
    grande: 'Grandes',
  };

  return (
    <section
      ref={sectionRef}
      id="catalogo"
      className="relative w-full min-h-screen bg-[#F4EFE6] py-20 lg:py-32 z-40"
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
        <div className="mb-10 lg:mb-16">
          <h2 className="text-3xl lg:text-[clamp(32px,3.6vw,52px)] font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-4">
            Nuestro catálogo
          </h2>
          <p className="text-base lg:text-lg text-[#6E6A60] max-w-xl">
            Elegí tu sabor favorito y el tamaño que mejor se adapte a tu momento.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-10 lg:mb-12">
          {/* Size Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-mono uppercase tracking-[0.12em] text-[#6E6A60] mr-2 flex items-center">
              <Filter className="w-3 h-3 mr-1" />
              Tamaño:
            </span>
            {(Object.keys(sizeLabels) as Array<Size | 'all'>).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSize === size
                    ? 'bg-[#1A1A1A] text-white'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
                }`}
              >
                {sizeLabels[size]}
              </button>
            ))}
          </div>
        </div>

        {/* Flavor Quick Select */}
        <div className="mb-10 lg:mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.12em] text-[#6E6A60] mb-4 block">
            Filtrar por sabor:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFlavor('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFlavor === 'all'
                  ? 'bg-[#C41E3A] text-white'
                  : 'bg-white text-[#1A1A1A] hover:bg-[#C41E3A]/10'
              }`}
            >
              Todos
            </button>
            {flavors.map((flavor) => (
              <button
                key={flavor.id}
                onClick={() => setSelectedFlavor(flavor.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedFlavor === flavor.id
                    ? 'bg-[#C41E3A] text-white'
                    : 'bg-white text-[#1A1A1A] hover:bg-[#C41E3A]/10'
                }`}
              >
                {flavor.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-[22px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-mono uppercase tracking-[0.08em] text-[#1A1A1A]">
                    {product.category === 'tarteleta' && '1 porción'}
                    {product.category === 'media' && '3 porciones'}
                    {product.category === 'grande' && '6 porciones'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 lg:p-5">
                <h3 className="text-base lg:text-lg font-bold text-[#1A1A1A] mb-1">
                  {product.flavor}
                </h3>
                <p className="text-xs lg:text-sm text-[#6E6A60] mb-3">
                  {product.category === 'tarteleta' && 'Tarteleta'}
                  {product.category === 'media' && 'Media Tarta'}
                  {product.category === 'grande' && 'Tarta Grande'}
                </p>
                <p className="text-xs text-[#6E6A60] mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg lg:text-xl font-bold text-[#1A1A1A]">
                    ${product.price.toLocaleString()}
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    size="sm"
                    className="bg-[#C41E3A] hover:bg-[#a01830] text-white rounded-full px-4"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Agregar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6E6A60]">
              No encontramos productos con esos filtros.
            </p>
            <Button
              onClick={() => {
                setSelectedSize('all');
                setSelectedFlavor('all');
              }}
              variant="outline"
              className="mt-4"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
