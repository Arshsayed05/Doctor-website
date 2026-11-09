import React from 'react';
import { CalendarCheck, Video, FileText, ArrowRight } from 'lucide-react';

interface PatientJourneyProps {
  onOpenBooking: () => void;
}

export const PatientJourney: React.FC<PatientJourneyProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      step: '01',
      title: 'Select Format & Clinical Category',
      description: 'Choose between an in-clinic consultation at Falnir Road, Mangalore or an encrypted online video session via Google Meet from anywhere across India.',
      icon: <CalendarCheck className="w-5 h-5 text-secondary" />,
    },
    {
      step: '02',
      title: 'Complete Private Clinical Intake',
      description: 'Share your primary health concerns, symptom timeline, and past treatments. Dr. Shifa reviews your background in advance to maximize clinical consultation depth.',
      icon: <FileText className="w-5 h-5 text-secondary" />,
    },
    {
      step: '03',
      title: 'Consult & Receive Protocol',
      description: 'Engage in an in-depth 30–45 min diagnostic dialogue. Receive an authenticated digital prescription with Prakriti assessment, herb timings, and dietary pathya within minutes.',
      icon: <Video className="w-5 h-5 text-secondary" />,
    },
  ];

  return (
    <section id="how-it-works-section" className="py-20 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2">
            The Patient Journey
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">
            A Thoughtful, Unhurried Consultation Experience
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Eliminating clinical anxiety through clear appointment management and quiet technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-xl bg-background border border-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-2xl font-bold text-accent-soft">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-lg bg-surface border border-border">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-primary hover:bg-primary-hover text-surface text-sm font-semibold tracking-wide transition-all shadow-subtle active:scale-[0.98]"
          >
            <span>Reserve Your Consultation Slot</span>
            <ArrowRight className="w-4 h-4 text-accent-soft" />
          </button>
        </div>
      </div>
    </section>
  );
};
