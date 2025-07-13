import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * MobileNavbar – compact navbar rendered on small screens (< md breakpoint).
 * - Displays a hamburger (Menu) icon.
 * - Expands to an overlay panel with links when tapped.
 * - Accepts an optional scrollToSection callback for smooth scrolling.
 */
const MobileNavbar = ({ scrollToSection }) => {
  const [open, setOpen] = useState(false);

  const handleNavigate = (section) => {
    if (scrollToSection) {
      scrollToSection(section);
    } else if (section) {
      // fallback: anchor navigation
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setOpen(false);
  };

  return (
    <div className="md:hidden relative z-50">
      {/* Hamburger / Close button */}
      <button
        aria-label="Toggle navigation menu"
        className="p-2 rounded-md text-zinc-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay panel - Fixed positioning */}
      {open && (
        <div className="fixed top-20 right-4 w-48 origin-top-right rounded-lg border border-zinc-700/60 bg-zinc-900/95 backdrop-blur-md shadow-xl p-4 flex flex-col gap-3 z-50">
          <button onClick={() => handleNavigate('hero')} className="text-zinc-200 text-left hover:text-white py-2 px-2 rounded hover:bg-zinc-800/50 transition-colors">Home</button>
          <button onClick={() => handleNavigate('capabilities')} className="text-zinc-200 text-left hover:text-white py-2 px-2 rounded hover:bg-zinc-800/50 transition-colors">Features</button>
          <button onClick={() => handleNavigate('mission')} className="text-zinc-200 text-left hover:text-white py-2 px-2 rounded hover:bg-zinc-800/50 transition-colors">Mission</button>
          <button onClick={() => handleNavigate('values')} className="text-zinc-200 text-left hover:text-white py-2 px-2 rounded hover:bg-zinc-800/50 transition-colors">Benefits</button>
          <button onClick={() => handleNavigate('join')} className="text-white font-semibold text-left hover:text-orange-400 py-2 px-2 rounded hover:bg-zinc-800/50 transition-colors">Apply&nbsp;Now</button>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar; 