import React, { useState } from 'react';
import { SERVICES } from '../../data/mockData';
import { ServiceDetail, ServiceCategory } from '../../types';
import { 
  Sparkles, 
  Heart, 
  Flame, 
  Moon, 
  Activity, 
  Feather, 
  ArrowUpRight, 
  Check, 
  Video, 
  MapPin, 
  Clock 
} from 'lucide-react';

interface ServiceExplorerProps {
  onSelectService: (serviceId: ServiceCategory) => void;
}

export const ServiceExplorer: React.FC<ServiceExplorerProps> = ({ onSelectService }) => {
  const [selectedTab, setSelectedTab] = useState<ServiceCategory>('hair-scalp');

  // Mapping minimal line icons
  const getIcon = (id: ServiceCategory) => {
    switch (id) {
      case 'hair-scalp':
        return <Feather className="w-5 h-5 text-secondary" />;
      case 'womens-health':
        return <Heart className="w-5 h-5 text-secondary" />;
      case 'digestive-health':
        return <Flame className="w-5 h-5 text-secondary" />;
      case 'lifestyle':
        return <Moon className="w-5 h-5 text-secondary" />;
      case 'cupping-therapy':
        return <Activity className="w-5 h-5 text-secondary" />;
      case 'general-ayurveda':
        return <Sparkles className="w-5 h-5 text-secondary" />;
    }
  };

  const activeService = SERVICES.find((s) => s.id === selectedTab) || SERVICES[0];

  return (
    <section id="services-section" className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2">
            Clinical Portfolio
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-3">
            Consultation Categories
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Every consultation is structured around root-cause Ayurvedic constitutional analysis (Prakriti & Vikriti), backed by contemporary clinical precision.
          </p>
        </div>

        {/* Editorial Layout: Dual-column interactive explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Clean Category Menu */}
          <div className="lg:col-span-5 space-y-2">
            {SERVICES.map((service) => {
              const isActive = service.id === selectedTab;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedTab(service.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-200 flex items-start gap-4 ${
                    isActive
                      ? 'bg-surface border-primary shadow-subtle ring-1 ring-primary/10'
                      : 'bg-surface/50 border-border hover:bg-surface hover:border-secondary/30'
                  }`}
                >
                  <div className={`mt-0.5 p-2 rounded-md ${isActive ? 'bg-surface-muted text-primary' : 'bg-background text-text-secondary'}`}>
                    {getIcon(service.id)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className={`font-display text-base font-semibold truncate ${isActive ? 'text-primary' : 'text-text-primary'}`}>
                        {service.title}
                      </h3>
                      {service.badge && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-muted text-primary font-medium shrink-0 border border-border">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-1">
                      {service.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Editorial Deep-Dive Detail Card */}
          <div className="lg:col-span-7 bg-surface rounded-xl border border-border p-6 sm:p-8 shadow-subtle sticky top-28">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-md bg-surface-muted">
                  {getIcon(activeService.id)}
                </span>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-primary">
                    {activeService.title}
                  </h3>
                  <p className="text-xs text-text-secondary font-medium">
                    {activeService.subtitle}
                  </p>
                </div>
              </div>

              {/* Mode Availability Tags */}
              <div className="flex items-center gap-2">
                {activeService.isTelemedicineEligible && (
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-surface-muted text-primary font-medium border border-border">
                    <Video className="w-3 h-3 text-secondary" />
                    <span>Online (Google Meet)</span>
                  </span>
                )}
                {activeService.isInClinicEligible && (
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-surface-muted text-primary font-medium border border-border">
                    <MapPin className="w-3 h-3 text-secondary" />
                    <span>In-Clinic Mangalore</span>
                  </span>
                )}
              </div>
            </div>

            {/* Description Body */}
            <div className="py-6 space-y-4">
              <p className="text-sm sm:text-base text-text-primary leading-relaxed">
                {activeService.description}
              </p>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-3">
                  Clinical Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.clinicalFocus.map((focus, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-text-primary">
                      <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{focus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fee & Booking Footer */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-xl">
              <div className="space-y-1">
                <div className="text-xs text-text-secondary flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-secondary" />
                    <span>{activeService.durationMinutes} Minutes Session</span>
                  </span>
                  <span>•</span>
                  <span>Includes Follow-up Protocol</span>
                </div>
                <div className="flex items-baseline gap-3">
                  {activeService.isTelemedicineEligible && (
                    <div className="text-sm">
                      <span className="text-text-secondary text-xs">Telemedicine: </span>
                      <span className="font-display font-bold text-lg text-primary">₹{activeService.onlineFee}</span>
                    </div>
                  )}
                  {activeService.isInClinicEligible && (
                    <div className="text-sm">
                      <span className="text-text-secondary text-xs">In-Clinic: </span>
                      <span className="font-display font-bold text-lg text-primary">₹{activeService.inClinicFee}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => onSelectService(activeService.id)}
                className="w-full sm:w-auto px-6 py-3 rounded-md bg-primary hover:bg-primary-hover text-surface text-sm font-semibold tracking-wide transition-all shadow-subtle flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <span>Book This Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-accent-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
