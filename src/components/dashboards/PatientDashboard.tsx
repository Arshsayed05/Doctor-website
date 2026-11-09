import React, { useState } from 'react';
import { Appointment, Prescription } from '../../types';
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  FileText, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Pill,
  User,
  ShieldCheck,
  Phone
} from 'lucide-react';

interface PatientDashboardProps {
  appointments: Appointment[];
  onOpenBooking: () => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  appointments,
  onOpenBooking,
}) => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);

  // Active upcoming appointment
  const upcomingAppointment = appointments.find((a) => a.status === 'confirmed');
  const pastAppointments = appointments.filter((a) => a.id !== upcomingAppointment?.id);

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Patient Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-1">
              Patient Health Portal
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary">
              Personal Health Station
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              Review upcoming appointments, join video calls, and access physician prescriptions.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-surface text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-subtle flex items-center gap-2 self-start sm:self-auto"
          >
            <Calendar className="w-4 h-4 text-accent-soft" />
            <span>Book New Consultation</span>
          </button>
        </div>

        {/* Primary Alert / Upcoming Consultation Highlight */}
        {upcomingAppointment ? (
          <div className="bg-surface rounded-2xl border border-primary/20 p-6 sm:p-8 shadow-elevated relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-soft/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-semantic-success animate-ping" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Next Scheduled Consultation
                </span>
                <span className="text-border">•</span>
                <span className="text-xs font-mono text-text-secondary">
                  Ref: {upcomingAppointment.bookingRef}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-semantic-success/10 text-semantic-success font-semibold border border-semantic-success/20">
                  Confirmed & Paid
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-surface-muted text-primary font-medium border border-border capitalize">
                  {upcomingAppointment.mode}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                  {upcomingAppointment.serviceTitle}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-text-primary pt-2">
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <span className="text-text-secondary block text-[11px] mb-1">Consulting Physician</span>
                    <strong className="text-primary font-semibold">Dr. Shifa Kausar (BAMS)</strong>
                  </div>

                  <div className="p-3 rounded-lg bg-background border border-border">
                    <span className="text-text-secondary block text-[11px] mb-1">Date & Time</span>
                    <strong className="text-primary font-semibold">
                      {upcomingAppointment.date} at {upcomingAppointment.time}
                    </strong>
                  </div>

                  <div className="p-3 rounded-lg bg-background border border-border">
                    <span className="text-text-secondary block text-[11px] mb-1">Location / Channel</span>
                    <strong className="text-primary font-semibold">
                      {upcomingAppointment.mode === 'online' ? 'Google Meet Video' : 'Mangalore Clinic'}
                    </strong>
                  </div>
                </div>

                {upcomingAppointment.intakeSummary && (
                  <div className="p-3 rounded-lg bg-surface-muted/50 border border-border text-xs text-text-secondary">
                    <strong className="text-primary font-medium">Recorded Symptoms: </strong>
                    {upcomingAppointment.intakeSummary}
                  </div>
                )}
              </div>

              {/* Action Button: Google Meet Launch */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {upcomingAppointment.mode === 'online' && upcomingAppointment.googleMeetLink ? (
                  <a
                    href={upcomingAppointment.googleMeetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-surface text-center font-display font-bold text-sm tracking-wide shadow-subtle transition-all flex items-center justify-center gap-2.5 group"
                  >
                    <Video className="w-5 h-5 text-accent-soft group-hover:scale-110 transition-transform" />
                    <span>Join Google Meet Consultation</span>
                  </a>
                ) : (
                  <div className="p-4 rounded-xl bg-background border border-border text-xs text-text-secondary text-center space-y-1">
                    <MapPin className="w-5 h-5 text-secondary mx-auto mb-1" />
                    <div className="font-semibold text-primary">In-Clinic Address</div>
                    <div>{upcomingAppointment.clinicAddress}</div>
                  </div>
                )}

                <div className="text-[11px] text-text-secondary text-center">
                  Need to change time? Rescheduling is free up to 4 hours in advance.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface rounded-2xl border border-border p-8 text-center space-y-3">
            <Calendar className="w-8 h-8 text-secondary mx-auto" />
            <h3 className="font-display font-bold text-lg text-primary">
              No Active Upcoming Consultations
            </h3>
            <p className="text-xs text-text-secondary max-w-md mx-auto">
              Schedule your next Ayurvedic session with Dr. Shifa Kausar in-clinic or online.
            </p>
            <button
              onClick={onOpenBooking}
              className="mt-2 px-6 py-2.5 rounded-md bg-primary text-surface text-xs font-semibold"
            >
              Book an Appointment
            </button>
          </div>
        )}

        {/* Prescription & Past History Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-primary">
              Medical Records & Prescriptions
            </h3>
            <span className="text-xs text-text-secondary">
              Digitally verified under Dr. Shifa Kausar (BAMS)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((apt) => {
              const hasRx = apt.prescriptions && apt.prescriptions.length > 0;
              return (
                <div
                  key={apt.id}
                  className="bg-surface rounded-xl border border-border p-6 shadow-subtle flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>{apt.date}</span>
                      <span className="font-mono text-primary font-semibold">{apt.bookingRef}</span>
                    </div>

                    <h4 className="font-display font-bold text-base text-primary">
                      {apt.serviceTitle}
                    </h4>

                    <div className="text-xs text-text-secondary line-clamp-2">
                      {apt.intakeSummary}
                    </div>

                    {apt.doctorNotes && (
                      <div className="text-xs p-2.5 rounded bg-background border border-border text-primary">
                        <strong className="text-secondary">Doctor's Remark: </strong>
                        {apt.doctorNotes}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-semibold text-semantic-success flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>₹{apt.amount} (Paid)</span>
                    </span>

                    {hasRx ? (
                      <button
                        onClick={() => setSelectedPrescription(apt.prescriptions![0])}
                        className="text-xs font-semibold text-primary hover:text-secondary flex items-center gap-1 px-3 py-1.5 rounded bg-surface-muted border border-border transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Protocol</span>
                      </button>
                    ) : (
                      <span className="text-xs text-text-secondary italic">
                        Protocol awaiting consult
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prescription Modal Viewer */}
        {selectedPrescription && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/40 backdrop-blur-xs">
            <div className="bg-surface w-full max-w-2xl rounded-2xl border border-border shadow-modal p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <div className="text-xs uppercase tracking-wider text-secondary font-semibold">
                    Ayurvedic Clinical Protocol (Rx)
                  </div>
                  <h3 className="font-display font-bold text-xl text-primary">
                    Dr. Shifa Kausar — BAMS
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Prescribed on {selectedPrescription.prescribedAt} • Follow-up: {selectedPrescription.followUpDate}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPrescription(null)}
                  className="p-1.5 rounded-md text-text-secondary hover:text-primary hover:bg-surface-muted"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Assessment */}
              <div className="p-4 rounded-xl bg-background border border-border space-y-1">
                <span className="text-xs uppercase tracking-wider font-semibold text-secondary">
                  Constitutional Assessment (Prakriti / Vikriti)
                </span>
                <p className="font-display font-bold text-base text-primary">
                  {selectedPrescription.prakritiAssessment}
                </p>
              </div>

              {/* Formulations Table */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-text-secondary">
                  Herbal Formulations & Regimens
                </span>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-muted text-primary font-semibold border-b border-border">
                      <tr>
                        <th className="p-3">Herb / Rasayana</th>
                        <th className="p-3">Dosage</th>
                        <th className="p-3">Anupana & Timing</th>
                        <th className="p-3">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {selectedPrescription.formulations.map((f, i) => (
                        <tr key={i} className="hover:bg-background">
                          <td className="p-3 font-semibold text-primary">{f.name}</td>
                          <td className="p-3 text-text-secondary">{f.dosage}</td>
                          <td className="p-3 text-text-secondary">{f.timing}</td>
                          <td className="p-3 font-medium text-primary">{f.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Dietary (Ahara) and Lifestyle (Vihara) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-surface-muted/40 border border-border space-y-2">
                  <span className="font-bold text-primary block">Dietary Guidelines (Ahara / Pathya)</span>
                  <ul className="space-y-1 text-text-secondary list-disc pl-4">
                    {selectedPrescription.dietaryRecommendations.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface-muted/40 border border-border space-y-2">
                  <span className="font-bold text-primary block">Daily Lifestyle (Dinacharya)</span>
                  <ul className="space-y-1 text-text-secondary list-disc pl-4">
                    {selectedPrescription.lifestyleAdvice.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="text-[11px] text-text-secondary">
                  Authenticated Digital Healthcare Record • Karnataka Ayurvedic Board
                </div>
                <button
                  onClick={() => alert('Prescription PDF downloaded successfully.')}
                  className="px-4 py-2 rounded-md bg-primary text-surface text-xs font-semibold flex items-center gap-1.5 shadow-subtle hover:bg-primary-hover"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
