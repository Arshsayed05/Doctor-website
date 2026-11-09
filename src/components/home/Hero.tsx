import React from 'react';
import { ArrowRight, Shield, Video, MapPin, Sparkles, Clock } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24 md:py-28 border-b border-border">
      {/* Restrained decorative geometry: hairline concentric accents */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full border border-border/70 pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full border border-accent-soft/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full border border-border/60 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10 text-center">
        {/* Subtle Credential Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-text-secondary mb-8 shadow-subtle">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span>Ayurvedic Medicine & Telemedicine</span>
          <span className="text-border">•</span>
          <span className="text-primary font-semibold">BAMS (Yenepoya University)</span>
        </div>

        {/* Elegant Burgundy Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-[1.12] mb-6">
          Personalised care.
          <br />
          <span className="font-serif-editorial italic font-normal text-secondary">
            A simpler way to consult.
          </span>
        </h1>

        {/* Concise Supporting Text */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed font-normal mb-10">
          Explore Ayurvedic consultations with <strong className="text-primary font-semibold">Dr. Shifa Kausar</strong>, available in-clinic in Mangalore and online across India.
        </p>

        {/* Dual Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-primary hover:bg-primary-hover text-surface text-sm sm:text-base font-semibold tracking-wide transition-all shadow-subtle hover:shadow-elevated active:scale-[0.99] flex items-center justify-center gap-3 group"
          >
            <span>BOOK AN APPOINTMENT</span>
            <ArrowRight className="w-4 h-4 text-accent-soft group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-surface hover:bg-surface-muted text-primary border border-border text-sm sm:text-base font-medium tracking-wide transition-all hover:border-secondary/40 flex items-center justify-center gap-2"
          >
            <span>EXPLORE CONSULTATIONS</span>
          </button>
        </div>

        {/* Quiet Technology & Clinical Trust Indicators */}
        <div className="pt-10 border-t border-border/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-lg bg-surface/70 border border-border/70 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-primary font-display font-semibold text-sm mb-1">
              <Video className="w-4 h-4 text-secondary" />
              <span>Quiet Telemedicine</span>
            </div>
            <p className="text-xs text-text-secondary">
              Direct Google Meet video consultation with instant digital prescriptions.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface/70 border border-border/70 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-primary font-display font-semibold text-sm mb-1">
              <MapPin className="w-4 h-4 text-secondary" />
              <span>In-Clinic Mangalore</span>
            </div>
            <p className="text-xs text-text-secondary">
              Personalized pulse diagnosis, physical assessment & Hijama cupping therapy.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface/70 border border-border/70 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-primary font-display font-semibold text-sm mb-1">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>Root-Cause Science</span>
            </div>
            <p className="text-xs text-text-secondary">
              Clinical background spanning Traya hair therapeutics & Amrutam women's health.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-surface/70 border border-border/70 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-primary font-display font-semibold text-sm mb-1">
              <Clock className="w-4 h-4 text-secondary" />
              <span>Zero Waiting Time</span>
            </div>
            <p className="text-xs text-text-secondary">
              Reserved 30–45 min private slots with dedicated pre-consultation intake.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
