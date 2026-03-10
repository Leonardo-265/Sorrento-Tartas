import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from '@/hooks/useCart';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Featured } from '@/sections/Featured';
import { SizeMenu } from '@/sections/SizeMenu';
import { Catalog } from '@/sections/Catalog';
import { HowToOrder } from '@/sections/HowToOrder';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';
import { CartDrawer } from '@/sections/CartDrawer';
import { Footer } from '@/sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Global scroll snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <CartProvider>
      <div className="relative bg-[#F4EFE6]">
        <Header />
        
        <main className="relative">
          {/* Pinned Sections with z-index stacking */}
          <Hero />
          <Featured />
          <SizeMenu />
          
          {/* Flowing Sections */}
          <Catalog />
          <HowToOrder />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
