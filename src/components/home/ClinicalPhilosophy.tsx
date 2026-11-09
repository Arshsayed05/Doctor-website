import React from 'react';
import { Leaf, ShieldCheck, Cpu, HeartPulse } from 'lucide-react';

export const ClinicalPhilosophy: React.FC = () => {
  return (
    <section className="py-20 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2">
            Clinical Philosophy
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">
            Modern Heritage × Quiet Technology
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Ayurveda is not antiquated lore; it is a meticulous systems science. We integrate classical constitutional diagnostic principles with contemporary telemedicine convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-xl bg-background border border-border transition-all hover:border-secondary/40 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-secondary">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary">
              Root-Cause Diagnosis
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              We never mask symptoms with quick suppressants. Whether treating persistent telogen effluvium hair loss or chronic gut dysbiosis, we isolate the fundamental doshic triggers (Agni, Ama, Dhatu imbalance).
            </p>
            <div className="pt-2 text-xs font-semibold text-secondary flex items-center gap-1.5">
              <span>Classical Doshic Profiling</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-xl bg-background border border-border transition-all hover:border-secondary/40 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-secondary">
              <HeartPulse className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary">
              Multi-Science Synthesis
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Drawing from high-volume clinical practice at Traya and Amrutam, treatment plans combine classical herbal Rasayanas, clinical pathology review, and personalized dietary modifications.
            </p>
            <div className="pt-2 text-xs font-semibold text-secondary flex items-center gap-1.5">
              <span>Pathology & Herbal Synergy</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-xl bg-background border border-border transition-all hover:border-secondary/40 space-y-4">
            <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-secondary">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary">
              Frictionless Care
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Technology works silently in the background: immediate Google Meet video links, zero waiting rooms, end-to-end encrypted medical notes, and structured digital prescription delivery.
            </p>
            <div className="pt-2 text-xs font-semibold text-secondary flex items-center gap-1.5">
              <span>Direct Telemedicine Engine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
