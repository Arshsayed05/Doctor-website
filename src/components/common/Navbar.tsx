import React, { useState } from 'react';
import { ActiveView } from '../../types';
import { DOCTOR_PROFILE } from '../../data/mockData';
import { Calendar, Phone, MapPin, Video, Menu, X, User, ShieldCheck, Stethoscope } from 'lucide-react';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; view: ActiveView; icon?: React.ReactNode }[] = [
    { label: 'Overview', view: 'home' },
    { label: 'Consultations', view: 'services' },
    { label: 'Doctor Credentials', view: 'about' },
    { label: 'How It Works', view: 'how-it-works' },
    { label: 'Patient Portal', view: 'patient-dashboard', icon: <User className="w-3.5 h-3.5" /> },
    { label: 'Doctor Station', view: 'doctor-dashboard', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { label: 'Admin', view: 'admin-dashboard', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border transition-all">
      {/* Top Clinical Announcement Bar */}
      <div className="bg-surface-muted border-b border-border/60 py-1.5 px-4 sm:px-8 text-xs text-text-secondary">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>In-Clinic: Falnir Road, Mangalore</span>
            </span>
            <span className="hidden md:inline-block text-border">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-secondary" />
              <span>Telemedicine: PAN-India via Secure Google Meet</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${DOCTOR_PROFILE.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Phone className="w-3 h-3 text-secondary" />
              <span>{DOCTOR_PROFILE.phone}</span>
            </a>
            <span className="text-border">•</span>
            <span className="text-secondary font-semibold">BAMS (Yenepoya)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <button 
          onClick={() => handleNavClick('home')}
          className="text-left group focus:outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary/20 bg-background flex items-center justify-center text-primary font-display font-semibold text-lg tracking-wider group-hover:border-primary transition-colors">
              SK
            </div>
            <div>
              <div className="font-display font-bold text-lg tracking-tight text-primary flex items-center gap-2">
                DR. SHIFA KAUSAR
              </div>
              <p className="text-xs text-text-secondary tracking-widest uppercase font-medium">
                Ayurvedic Physician • BAMS
              </p>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`px-3.5 py-2 rounded-md transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-primary text-surface shadow-sm'
                    : 'text-text-primary hover:text-primary hover:bg-surface-muted/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-surface text-sm font-semibold tracking-wide shadow-subtle transition-all duration-200 flex items-center gap-2 active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 text-accent-soft" />
            <span>BOOK AN APPOINTMENT</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-primary hover:bg-surface-muted rounded-md focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = activeView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-primary text-surface'
                    : 'text-text-primary hover:bg-surface-muted'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-md bg-primary text-surface text-sm font-semibold text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-accent-soft" />
              <span>BOOK AN APPOINTMENT</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
