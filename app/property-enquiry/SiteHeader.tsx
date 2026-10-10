'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header">
        <a className="brand-logo" href="https://landlordshares.com/" aria-label="LandlordShares main website">
          <img
            src="/images/logo.png"
            alt="LandlordShares Logo"
            className={`${isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'} w-auto object-contain transition-all duration-300`}
          />
        </a>
        <a className="header-link" href="https://landlordshares.com/" target="_blank" rel="noreferrer">
          Visit website <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  );
}
