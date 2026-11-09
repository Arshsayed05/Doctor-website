import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does an online Ayurvedic consultation work via Google Meet?',
      a: 'Once you book, a secure Google Meet link is instantly generated and sent to your email and WhatsApp. At your scheduled time, simply click the link from your phone or laptop. Dr. Shifa reviews your pre-consultation intake notes beforehand, assesses your symptoms and facial/tongue indicators, and discusses your lifestyle and medical history. Within 30 minutes post-consult, your structured digital prescription is accessible in your Patient Dashboard and sent via PDF.',
    },
    {
      q: 'Where is Dr. Shifa Kausar’s clinic located in Mangalore?',
      a: 'The in-clinic practice is situated at Ayurveda Wellness Suite, Falnir Road, Mangalore, Karnataka 575002. In-clinic consultations allow for classical Nadi Pariksha (pulse diagnosis), physical abdominal palpation, and specialized clinical Cupping Therapy (Hijama).',
    },
    {
      q: 'What is Cupping Therapy (Hijama) and who is it recommended for?',
      a: 'Cupping Therapy (Hijama) is a classical therapeutic procedure utilizing sterile, medical-grade suction cups to enhance local blood flow, clear deep fascial stagnation, and relieve chronic muscle spasm. It is particularly effective for cervical spondylosis, upper/lower back stiffness, chronic migraines, and systemic detoxification. Note: Cupping is an in-clinic exclusive procedure performed under sterile conditions by Dr. Shifa.',
    },
    {
      q: 'Can Ayurvedic treatments be taken alongside my current allopathic medications?',
      a: 'Yes. Dr. Shifa Kausar evaluates drug-herb interactions and designs complementary protocols that support your existing prescriptions (such as thyroid medication, insulin, or blood pressure agents) without adverse interference. Always mention all current medications in your pre-consultation intake.',
    },
    {
      q: 'What payment modes are accepted and what is the rescheduling policy?',
      a: 'Payments are securely processed via Razorpay supporting UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking. You can reschedule your appointment up to 4 hours prior to your scheduled slot directly through the Patient Dashboard with zero cancellation penalty.',
    },
  ];

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary mb-3">
            Consultation Guidelines & Clarity
          </h2>
          <p className="text-sm text-text-secondary">
            Everything you need to know about preparing for your session and receiving clinical care.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-surface rounded-lg border border-border transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-primary">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-secondary shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
