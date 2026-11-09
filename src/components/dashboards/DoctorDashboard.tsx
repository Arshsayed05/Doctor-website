import React, { useState } from 'react';
import { Appointment, Prescription } from '../../types';
import { DOCTOR_PROFILE } from '../../data/mockData';
import { 
  Stethoscope, 
  Video, 
  MapPin, 
  CheckCircle, 
  Clock, 
  User, 
  FilePlus, 
  Send, 
  Calendar, 
  ExternalLink,
  Sliders,
  Check
} from 'lucide-react';

interface DoctorDashboardProps {
  appointments: Appointment[];
  onUpdateAppointment: (updated: Appointment) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  appointments,
  onUpdateAppointment,
}) => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>(
    appointments[0]?.id || ''
  );
  
  // Clinical Workstation State
  const [activeTab, setActiveTab] = useState<'schedule' | 'clinical-notes' | 'availability'>('schedule');

  // New Prescription State
  const [prakriti, setPrakriti] = useState('Pitta-Vata (Mild Dhatukshaya)');
  const [herbName, setHerbName] = useState('');
  const [herbDosage, setHerbDosage] = useState('');
  const [herbTiming, setHerbTiming] = useState('');
  const [herbDuration, setHerbDuration] = useState('30 days');
  const [dietNotes, setDietNotes] = useState('Avoid fermented, excessively salty, and deep-fried foods. Drink warm water.');
  const [lifestyleNotes, setLifestyleNotes] = useState('Maintain consistent sleep schedule. Perform Shiro Abhyanga twice weekly.');
  const [clinicalRemark, setClinicalRemark] = useState('');

  // Practice Availability Toggles
  const [telemedicineEnabled, setTelemedicineEnabled] = useState(true);
  const [inClinicEnabled, setInClinicEnabled] = useState(true);

  const selectedAppointment = appointments.find((a) => a.id === selectedAppointmentId) || appointments[0];

  const handleSaveProtocol = () => {
    if (!selectedAppointment) return;

    const newPrescription: Prescription = {
      id: `rx-${Date.now()}`,
      appointmentId: selectedAppointment.id,
      prakritiAssessment: prakriti,
      formulations: [
        {
          name: herbName || 'Shatavari & Ashwagandha Churna',
          dosage: herbDosage || '1 teaspoon (5g)',
          timing: herbTiming || 'With lukewarm milk at bedtime',
          duration: herbDuration,
        },
      ],
      dietaryRecommendations: dietNotes.split('.').filter(Boolean),
      lifestyleAdvice: lifestyleNotes.split('.').filter(Boolean),
      followUpDate: 'In 30 days',
      prescribedAt: new Date().toISOString().split('T')[0],
    };

    const updated: Appointment = {
      ...selectedAppointment,
      prescriptions: [newPrescription, ...(selectedAppointment.prescriptions || [])],
      doctorNotes: clinicalRemark || 'Clinical review completed. Advised lifestyle modifications and botanical regimen.',
      status: 'completed',
    };

    onUpdateAppointment(updated);
    alert(`Clinical Protocol issued for ${selectedAppointment.patientName}. Patient has been notified via WhatsApp & Email.`);
  };

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Doctor Station Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-1 flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Clinical Practice Station</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary">
              Dr. Shifa Kausar — Clinical Workstation
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              BAMS • Mangalore Clinic & Pan-India Telemedicine Practice
            </p>
          </div>

          {/* Navigation Pill */}
          <div className="flex items-center gap-2 bg-surface p-1 rounded-lg border border-border">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'schedule' ? 'bg-primary text-surface' : 'text-text-secondary hover:text-primary'
              }`}
            >
              Consultation Queue
            </button>
            <button
              onClick={() => setActiveTab('clinical-notes')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'clinical-notes' ? 'bg-primary text-surface' : 'text-text-secondary hover:text-primary'
              }`}
            >
              Prescription Builder
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'availability' ? 'bg-primary text-surface' : 'text-text-secondary hover:text-primary'
              }`}
            >
              Availability Settings
            </button>
          </div>
        </div>

        {/* WORKSTATION CONTENT */}
        {activeTab === 'schedule' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Patient Queue */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-text-secondary font-semibold uppercase tracking-wider px-1">
                <span>Today's Consultation Schedule ({appointments.length})</span>
                <span className="text-secondary">Active</span>
              </div>

              {appointments.map((apt) => {
                const isSelected = apt.id === selectedAppointment?.id;
                return (
                  <button
                    key={apt.id}
                    onClick={() => setSelectedAppointmentId(apt.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-surface border-primary shadow-subtle ring-1 ring-primary/10'
                        : 'bg-surface/60 border-border hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold text-primary">
                        {apt.time} • {apt.date}
                      </span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium capitalize border ${
                        apt.mode === 'online' ? 'bg-surface-muted text-primary border-border' : 'bg-background text-secondary border-border'
                      }`}>
                        {apt.mode === 'online' ? 'Google Meet' : 'In-Clinic'}
                      </span>
                    </div>

                    <div className="font-display font-bold text-base text-primary mb-1">
                      {apt.patientName}
                    </div>

                    <div className="text-xs text-text-secondary flex items-center justify-between">
                      <span>{apt.serviceTitle}</span>
                      <span className="text-semantic-success font-semibold">₹{apt.amount}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Patient Dossier */}
            {selectedAppointment && (
              <div className="lg:col-span-7 bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
                  <div>
                    <span className="text-xs font-mono text-secondary">
                      Ref #{selectedAppointment.bookingRef}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-primary">
                      {selectedAppointment.patientName}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {selectedAppointment.patientPhone} • {selectedAppointment.patientEmail}
                    </p>
                  </div>

                  {selectedAppointment.mode === 'online' && selectedAppointment.googleMeetLink && (
                    <a
                      href={selectedAppointment.googleMeetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-surface text-xs font-semibold flex items-center gap-2 shadow-subtle"
                    >
                      <Video className="w-4 h-4 text-accent-soft" />
                      <span>Start Google Meet</span>
                    </a>
                  )}
                </div>

                {/* Pre-Consultation Intake Info */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-text-secondary">
                    Patient Chief Complaint & Intake Notes
                  </h4>
                  <div className="p-4 rounded-xl bg-background border border-border text-xs sm:text-sm text-text-primary leading-relaxed">
                    {selectedAppointment.intakeSummary || 'Standard clinical consultation.'}
                  </div>
                </div>

                {/* Patient Vitals & Demographics */}
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-surface-muted/40 border border-border">
                    <span className="text-text-secondary block">Age</span>
                    <strong className="text-primary font-semibold">{selectedAppointment.patientAge || '28'} Years</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-muted/40 border border-border">
                    <span className="text-text-secondary block">Gender</span>
                    <strong className="text-primary font-semibold capitalize">{selectedAppointment.patientGender || 'Female'}</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-muted/40 border border-border">
                    <span className="text-text-secondary block">Payment Status</span>
                    <strong className="text-semantic-success font-semibold">Verified (Razorpay)</strong>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    Ready to prescribe? Switch to Prescription Builder.
                  </span>
                  <button
                    onClick={() => setActiveTab('clinical-notes')}
                    className="px-4 py-2 rounded-md bg-secondary text-surface text-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
                  >
                    <FilePlus className="w-3.5 h-3.5" />
                    <span>Open Rx Builder</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PRESCRIPTION BUILDER TAB */}
        {activeTab === 'clinical-notes' && selectedAppointment && (
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-secondary">
                  Prescription & Botanical Protocol
                </span>
                <h3 className="font-display text-xl font-bold text-primary">
                  Prescribing for {selectedAppointment.patientName} ({selectedAppointment.serviceTitle})
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded bg-surface-muted text-primary font-mono border border-border">
                {selectedAppointment.bookingRef}
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-text-primary mb-1">
                  Constitutional Imbalance (Prakriti / Vikriti Assessment)
                </label>
                <input
                  type="text"
                  value={prakriti}
                  onChange={(e) => setPrakriti(e.target.value)}
                  placeholder="e.g. Pitta-Kapha with Mandagni and Asthi Dhatu vulnerability"
                  className="w-full p-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-text-primary mb-1">
                    Herbal Formulation / Classical Rasayana
                  </label>
                  <input
                    type="text"
                    value={herbName}
                    onChange={(e) => setHerbName(e.target.value)}
                    placeholder="e.g. Narasimha Rasayanam / Lodhrasava"
                    className="w-full p-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={herbDosage}
                    onChange={(e) => setHerbDosage(e.target.value)}
                    placeholder="e.g. 1 tsp (5g)"
                    className="w-full p-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-text-primary mb-1">
                    Anupana & Timing
                  </label>
                  <input
                    type="text"
                    value={herbTiming}
                    onChange={(e) => setHerbTiming(e.target.value)}
                    placeholder="e.g. Warm water after meals"
                    className="w-full p-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">
                  Ahara (Dietary Rules / Pathya)
                </label>
                <textarea
                  rows={2}
                  value={dietNotes}
                  onChange={(e) => setDietNotes(e.target.value)}
                  className="w-full p-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">
                  Vihara (Daily Lifestyle & Dinacharya)
                </label>
                <textarea
                  rows={2}
                  value={lifestyleNotes}
                  onChange={(e) => setLifestyleNotes(e.target.value)}
                  className="w-full p-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-primary mb-1">
                  Doctor's Confidential Clinical Notes
                </label>
                <textarea
                  rows={2}
                  value={clinicalRemark}
                  onChange={(e) => setClinicalRemark(e.target.value)}
                  placeholder="Internal notes regarding tongue examination, pulse indicators, or advised lab markers..."
                  className="w-full p-2.5 rounded-md border border-border bg-background focus:outline-none focus:border-primary text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                Digitally signed as Dr. Shifa Kausar (BAMS). Instantly viewable in Patient Portal.
              </span>
              <button
                type="button"
                onClick={handleSaveProtocol}
                className="px-6 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-surface text-xs font-semibold flex items-center gap-2 shadow-subtle"
              >
                <Send className="w-3.5 h-3.5 text-accent-soft" />
                <span>Issue & Dispatch Protocol</span>
              </button>
            </div>
          </div>
        )}

        {/* AVAILABILITY SETTINGS TAB */}
        {activeTab === 'availability' && (
          <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-subtle max-w-2xl mx-auto space-y-6">
            <div className="pb-4 border-b border-border">
              <h3 className="font-display text-xl font-bold text-primary">
                Consultation Schedule & Slot Capacity
              </h3>
              <p className="text-xs text-text-secondary">
                Configure your active telemedicine shifts and Mangalore clinic consultation hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
                <div className="space-y-1">
                  <div className="font-display font-semibold text-sm text-primary flex items-center gap-2">
                    <Video className="w-4 h-4 text-secondary" />
                    <span>PAN-India Telemedicine Slots</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Active on Google Meet (Morning 10:00 AM – 1:00 PM, Evening 5:30 PM – 8:00 PM).
                  </p>
                </div>
                <button
                  onClick={() => setTelemedicineEnabled(!telemedicineEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    telemedicineEnabled ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-surface transition-transform ${
                      telemedicineEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
                <div className="space-y-1">
                  <div className="font-display font-semibold text-sm text-primary flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span>In-Clinic Mangalore Hours</span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Falnir Road Clinic (Afternoon 2:30 PM – 5:00 PM for Consultations & Hijama).
                  </p>
                </div>
                <button
                  onClick={() => setInClinicEnabled(!inClinicEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    inClinicEnabled ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-surface transition-transform ${
                      inClinicEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-muted/40 border border-border text-xs text-text-secondary">
              <strong className="text-primary font-medium">Automatic Buffer: </strong>
              Each consultation automatically preserves a 15-minute buffer to ensure zero patient waiting times.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
