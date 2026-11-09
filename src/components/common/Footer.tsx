import React from 'react';
import { DOCTOR_PROFILE } from '../../data/mockData';
import { ActiveView } from '../../types';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView, onOpenBooking }) => {
  return (
    <footer className="bg-surface border-t border-border py-16 text-xs text-text-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-primary/20 bg-background flex items-center justify-center text-primary font-display font-bold text-lg">
                SK
              </div>
              <div>
                <span className="font-display font-bold text-base text-primary tracking-tight block">
                  DR. SHIFA KAUSAR
                </span>
                <span className="text-[11px] text-text-secondary tracking-widest uppercase">
                  Ayurvedic Physician • BAMS
                </span>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              Modern Heritage × Quiet Technology. Integrating root-cause Ayurvedic constitutional diagnostics with convenient telemedicine across India and in-clinic care in Mangalore.
            </p>

            <div className="text-[11px] text-primary/80 space-y-1">
              <div>BAMS, Yenepoya University (2018–2023)</div>
              <div>Former Consultant: Traya Health & Amrutam</div>
            </div>
          </div>

          {/* Clinical Portals */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
              Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveView('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Consultation Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Doctor Credentials & Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors"
                >
                  How Consultations Work
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-primary font-medium text-secondary transition-colors"
                >
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Secure Stations */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
              Clinical Stations
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveView('patient-dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Patient Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('doctor-dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Doctor Workstation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('admin-dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Practice Administration
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary block">
              Direct Contact
            </span>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                <span>{DOCTOR_PROFILE.inClinicAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                <a href={`tel:${DOCTOR_PROFILE.phone.replace(/\s+/g, '')}`} className="hover:text-primary">
                  {DOCTOR_PROFILE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                <a href={`mailto:${DOCTOR_PROFILE.email}`} className="hover:text-primary">
                  {DOCTOR_PROFILE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Medical Disclaimer */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-text-secondary">
          <p>
            © {new Date().getFullYear()} Dr. Shifa Kausar (BAMS). All clinical rights reserved. Authorized under NCISM & Karnataka Ayurvedic Board.
          </p>
          <div className="flex items-center gap-4">
            <span>Payment Security: Razorpay 256-bit SSL</span>
            <span>•</span>
            <span>Google Meet Telehealth Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
