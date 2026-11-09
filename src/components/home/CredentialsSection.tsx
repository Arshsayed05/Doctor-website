import React from 'react';
import { DOCTOR_PROFILE } from '../../data/mockData';
import { GraduationCap, Briefcase, Award, Globe, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

export const CredentialsSection: React.FC = () => {
  return (
    <section id="credentials-section" className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2">
            Physician Profile & Background
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">
            Dr. Shifa Kausar
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-normal">
            BAMS (Bachelor of Ayurvedic Medicine & Surgery) • Yenepoya University, Mangalore.
            <br />
            Specialist in Ayurvedic Root-Cause Therapeutics, Telemedicine & Hijama (Cupping).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Academic Credentials & Core Skills */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface rounded-xl border border-border p-6 sm:p-7 shadow-subtle space-y-5">
              <div className="flex items-center gap-3 text-primary border-b border-border pb-4">
                <div className="p-2.5 rounded-lg bg-surface-muted text-primary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-primary">
                    Medical Education
                  </h3>
                  <p className="text-xs text-text-secondary font-medium">
                    Yenepoya Ayurvedic Medical College (2018 – 2023)
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-text-primary">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>5.5 years full-time BAMS clinical curriculum, classical Ayurvedic texts, pathology, and clinical surgery.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>Rotational hospital residency: Panchakarma, Cupping Therapy (Hijama), Minor Surgery, Leech therapy (Jalaukavacharana).</span>
                </div>
              </div>
            </div>

            {/* Languages Spoken */}
            <div className="bg-surface rounded-xl border border-border p-6 shadow-subtle">
              <div className="flex items-center gap-2 text-primary font-display font-semibold text-sm mb-3">
                <Globe className="w-4 h-4 text-secondary" />
                <span>Multilingual Consultation Comfort</span>
              </div>
              <p className="text-xs text-text-secondary mb-4 leading-relaxed">
                Consult seamlessly in your native tongue for accurate symptom articulation:
              </p>
              <div className="flex flex-wrap gap-2">
                {DOCTOR_PROFILE.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full bg-surface-muted text-primary text-xs font-medium border border-border"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Clinical Practice Locations */}
            <div className="bg-surface rounded-xl border border-border p-6 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-primary font-display font-semibold text-sm">
                <MapPin className="w-4 h-4 text-secondary" />
                <span>Practice Locations</span>
              </div>
              <div className="text-xs text-text-secondary space-y-2">
                <p>
                  <strong className="text-primary font-medium">In-Clinic:</strong> {DOCTOR_PROFILE.inClinicAddress}
                </p>
                <p>
                  <strong className="text-primary font-medium">Telemedicine:</strong> High-definition video consultations across PAN India via Google Meet with encrypted patient records.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Work Experience Timeline */}
          <div className="lg:col-span-7 bg-surface rounded-xl border border-border p-6 sm:p-8 shadow-subtle">
            <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-surface-muted text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-primary">
                    Clinical Experience Timeline
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Demonstrated expertise in digital telemedicine & hospital practice
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline items */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-border">
              {DOCTOR_PROFILE.experienceHighlights.map((exp, idx) => (
                <div key={idx} className="relative flex items-start gap-5 group">
                  <div className="w-7 h-7 rounded-full bg-surface border-2 border-primary text-primary flex items-center justify-center shrink-0 z-10 shadow-subtle">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                  </div>
                  <div className="space-y-1.5 flex-1 bg-background/50 p-4 rounded-lg border border-border/80">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-display font-bold text-sm sm:text-base text-primary">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface-muted text-primary w-fit border border-border">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-secondary">
                      {exp.organization}
                    </div>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Seal */}
            <div className="mt-8 pt-6 border-t border-border flex items-center gap-3 text-xs text-text-secondary">
              <ShieldCheck className="w-5 h-5 text-semantic-success shrink-0" />
              <span>
                Registered Ayurvedic Practitioner. Authorized under Karnataka Ayurvedic and Unani Practitioners’ Board & National Commission for Indian System of Medicine (NCISM).
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
