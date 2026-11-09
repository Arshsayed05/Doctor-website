import React, { useState } from 'react';
import { SERVICES, INITIAL_TIME_SLOTS, DOCTOR_PROFILE } from '../../data/mockData';
import { 
  ConsultationMode, 
  ServiceCategory, 
  PatientIntake, 
  Appointment, 
  TimeSlot 
} from '../../types';
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CreditCard, 
  ExternalLink,
  Sparkles,
  Phone
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: ServiceCategory;
  onBookingSuccess: (newAppointment: Appointment) => void;
  onNavigateToPatientDashboard: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onBookingSuccess,
  onNavigateToPatientDashboard,
}) => {
  if (!isOpen) return null;

  // Step state: 1: Mode -> 2: Service -> 3: Date & Time -> 4: Intake -> 5: Payment -> 6: Success
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Booking details state
  const [mode, setMode] = useState<ConsultationMode>('online');
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceCategory>(
    preselectedServiceId || 'hair-scalp'
  );
  
  // Date selection (generate next 7 days)
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].iso);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(INITIAL_TIME_SLOTS[0]);

  // Patient Intake Form state
  const [intake, setIntake] = useState<PatientIntake>({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'female',
    city: '',
    preferredLanguage: 'English',
    primaryConcern: '',
    symptomDuration: '',
    priorTreatments: '',
    medicalHistoryNotes: '',
  });

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Active service object
  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  
  // Calculate fee based on mode
  const consultationFee = mode === 'online' ? currentService.onlineFee : currentService.inClinicFee;

  // Filter slots for chosen mode
  const filteredSlots = INITIAL_TIME_SLOTS.filter(
    (slot) => slot.mode === mode || (mode === 'in-clinic' && slot.period === 'afternoon') || (mode === 'online' && slot.period !== 'afternoon')
  );

  const handleNextStep = () => {
    if (currentStep === 4) {
      if (!intake.fullName || !intake.phone || !intake.email || !intake.primaryConcern) {
        alert('Please fill in required fields: Full Name, Phone, Email, and Primary Concern.');
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const bookingRef = `SK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApt: Appointment = {
        id: `apt-${Date.now()}`,
        bookingRef,
        patientName: intake.fullName,
        patientEmail: intake.email,
        patientPhone: intake.phone,
        patientAge: intake.age,
        patientGender: intake.gender,
        mode,
        serviceId: selectedServiceId,
        serviceTitle: currentService.title,
        date: selectedDate,
        time: selectedSlot.time,
        status: 'confirmed',
        paymentStatus: 'paid',
        amount: consultationFee,
        paymentMethod: 'Razorpay (UPI/Cards/NetBanking)',
        transactionId: `pay_rzp_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        googleMeetLink: mode === 'online' ? 'https://meet.google.com/shf-ksar-med' : undefined,
        clinicAddress: mode === 'in-clinic' ? DOCTOR_PROFILE.inClinicAddress : undefined,
        intakeSummary: `${intake.primaryConcern}. Duration: ${intake.symptomDuration || 'Not stated'}. City: ${intake.city || 'India'}`,
        createdAt: new Date().toISOString(),
      };

      setConfirmedAppointment(newApt);
      onBookingSuccess(newApt);
      setIsProcessingPayment(false);
      setCurrentStep(6);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-text-primary/40 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-surface rounded-2xl border border-border shadow-modal flex flex-col max-h-[90vh] overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-muted/40">
          <div>
            <div className="text-xs uppercase tracking-wider text-secondary font-semibold">
              Appointment Scheduling
            </div>
            <h3 className="font-display font-bold text-lg text-primary">
              Dr. Shifa Kausar • {mode === 'online' ? 'Online Consultation' : 'In-Clinic Mangalore'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (Steps 1 to 5) */}
        {currentStep < 6 && (
          <div className="px-6 py-2.5 bg-background border-b border-border flex items-center justify-between text-xs text-text-secondary font-medium">
            <span className={currentStep >= 1 ? 'text-primary font-semibold' : ''}>1. Mode</span>
            <span className="text-border">→</span>
            <span className={currentStep >= 2 ? 'text-primary font-semibold' : ''}>2. Service</span>
            <span className="text-border">→</span>
            <span className={currentStep >= 3 ? 'text-primary font-semibold' : ''}>3. Slot</span>
            <span className="text-border">→</span>
            <span className={currentStep >= 4 ? 'text-primary font-semibold' : ''}>4. Intake</span>
            <span className="text-border">→</span>
            <span className={currentStep >= 5 ? 'text-primary font-semibold' : ''}>5. Payment</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* STEP 1: MODE SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-display text-base font-bold text-primary mb-1">
                  How would you prefer to consult?
                </h4>
                <p className="text-xs text-text-secondary">
                  Choose between high-definition encrypted telemedicine or a physical visit in Mangalore.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Online Mode */}
                <button
                  type="button"
                  onClick={() => setMode('online')}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    mode === 'online'
                      ? 'bg-background border-primary ring-1 ring-primary/20 shadow-subtle'
                      : 'bg-surface border-border hover:border-secondary/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-surface text-primary border border-border">
                      <Video className="w-5 h-5 text-secondary" />
                    </div>
                    {mode === 'online' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <h5 className="font-display font-bold text-base text-primary mb-1">
                    Online Video (Google Meet)
                  </h5>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    Available across India. Secure link issued immediately. Digital prescription provided.
                  </p>
                  <div className="text-xs font-semibold text-primary">
                    Fee: ₹799 per session
                  </div>
                </button>

                {/* In-Clinic Mode */}
                <button
                  type="button"
                  onClick={() => setMode('in-clinic')}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    mode === 'in-clinic'
                      ? 'bg-background border-primary ring-1 ring-primary/20 shadow-subtle'
                      : 'bg-surface border-border hover:border-secondary/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-lg bg-surface text-primary border border-border">
                      <MapPin className="w-5 h-5 text-secondary" />
                    </div>
                    {mode === 'in-clinic' && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <h5 className="font-display font-bold text-base text-primary mb-1">
                    In-Clinic (Mangalore)
                  </h5>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    Physical assessment, Nadi Pariksha & clinical Cupping Therapy (Hijama) at Falnir Road.
                  </p>
                  <div className="text-xs font-semibold text-primary">
                    Fee: ₹699 (General) / ₹1199 (Cupping)
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CATEGORY SELECTION */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-display text-base font-bold text-primary mb-1">
                  Select consultation category
                </h4>
                <p className="text-xs text-text-secondary">
                  Choose the primary condition or focus of your upcoming appointment.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                {SERVICES.map((s) => {
                  const isEligible = mode === 'online' ? s.isTelemedicineEligible : s.isInClinicEligible;
                  const isSelected = selectedServiceId === s.id;
                  if (!isEligible) return null;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedServiceId(s.id)}
                      className={`w-full text-left p-3.5 rounded-lg border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-background border-primary ring-1 ring-primary/20 shadow-subtle'
                          : 'bg-surface border-border hover:border-secondary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-primary bg-primary' : 'border-border'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-surface" />}
                        </div>
                        <div>
                          <div className="font-display font-semibold text-sm text-primary">
                            {s.title}
                          </div>
                          <div className="text-xs text-text-secondary line-clamp-1">
                            {s.subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="font-display font-bold text-sm text-primary">
                        ₹{mode === 'online' ? s.onlineFee : s.inClinicFee}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SLOT */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h4 className="font-display text-base font-bold text-primary mb-1">
                  Choose Date & Time Slot
                </h4>
                <p className="text-xs text-text-secondary">
                  {mode === 'online' ? 'Google Meet sessions run 30 minutes.' : 'Clinic slots at Falnir Road, Mangalore.'}
                </p>
              </div>

              {/* Date horizontal picker */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.iso;
                    return (
                      <button
                        key={item.iso}
                        type="button"
                        onClick={() => setSelectedDate(item.iso)}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          isSelected
                            ? 'bg-primary text-surface border-primary shadow-subtle'
                            : 'bg-surface border-border hover:bg-surface-muted text-text-primary'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-medium">{item.dayName}</div>
                        <div className="font-display font-bold text-base my-0.5">{item.dayNumber}</div>
                        <div className="text-[10px] opacity-80">{item.month}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot picker */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                  Available Slots ({selectedDate})
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {filteredSlots.map((slot) => {
                    const isSelected = selectedSlot.id === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-lg border text-center text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                          !slot.available
                            ? 'bg-surface-muted/40 text-text-secondary/50 border-border cursor-not-allowed line-through'
                            : isSelected
                            ? 'bg-secondary text-surface border-secondary shadow-subtle font-semibold'
                            : 'bg-surface border-border hover:border-secondary/40 text-text-primary'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot.time}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PATIENT INTAKE FORM */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="font-display text-base font-bold text-primary mb-1">
                  Confidential Patient Intake
                </h4>
                <p className="text-xs text-text-secondary">
                  Dr. Shifa reviews this clinical summary prior to initiating your session.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-text-primary mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={intake.fullName}
                    onChange={(e) => setIntake({ ...intake, fullName: e.target.value })}
                    placeholder="e.g. Fatima / Rajesh"
                    className="w-full p-2.5 rounded-md border border-border bg-surface focus:outline-none focus:border-primary text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-text-primary mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={intake.phone}
                    onChange={(e) => setIntake({ ...intake, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full p-2.5 rounded-md border border-border bg-surface focus:outline-none focus:border-primary text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-text-primary mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={intake.email}
                    onChange={(e) => setIntake({ ...intake, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-md border border-border bg-surface focus:outline-none focus:border-primary text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-text-primary mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      value={intake.age}
                      onChange={(e) => setIntake({ ...intake, age: e.target.value })}
                      placeholder="e.g. 29"
                      className="w-full p-2.5 rounded-md border border-border bg-surface focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-text-primary mb-1">
                      Gender
                    </label>
                    <select
                      value={intake.gender}
                      onChange={(e) => setIntake({ ...intake, gender: e.target.value as any })}
                      className="w-full p-2.5 rounded-md border border-border bg-surface focus:outline-none focus:border-primary text-xs"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-text-primary mb-1">
                    Primary Concern / Symptoms *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={intake.primaryConcern}
                    onChange={(e) => setIntake({ ...intake, primaryConcern: e.target.value })}
                    placeholder="Describe what you are experiencing (e.g. hair thinning, irregular cycles, bloating, back stiffness)..."
                    className="w-full p-2.5 rounded-md border border-border bg-surface focus:outline-none focus:border-primary text-xs leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-text-primary mb-1">
                    Duration & Current Medications (Optional)
                  </label>
                  <input
                    type="text"
                    value={intake.priorTreatments}
                    onChange={(e) => setIntake({ ...intake, priorTreatments: e.target.value })}
                    placeholder="e.g. Ongoing for 8 months. Currently taking thyroid supplement."
                    className="w-full p-2.5 rounded-md border border-border bg-surface focus:outline-none focus:border-primary text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PAYMENT SUMMARY & RAZORPAY GATEWAY */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div>
                <h4 className="font-display text-base font-bold text-primary mb-1">
                  Consultation Summary & Secure Payment
                </h4>
                <p className="text-xs text-text-secondary">
                  Processed securely via Razorpay with encrypted payment verification.
                </p>
              </div>

              {/* Order breakdown */}
              <div className="bg-background rounded-xl p-4 border border-border space-y-3 text-xs">
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Consultation Category:</span>
                  <strong className="text-primary font-medium">{currentService.title}</strong>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Format:</span>
                  <strong className="text-primary font-medium">
                    {mode === 'online' ? 'Google Meet Video' : 'In-Clinic (Mangalore)'}
                  </strong>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Date & Slot:</span>
                  <strong className="text-primary font-medium">{selectedDate} at {selectedSlot.time}</strong>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Patient:</span>
                  <strong className="text-primary font-medium">{intake.fullName} ({intake.phone})</strong>
                </div>
                <div className="pt-2 border-t border-border flex justify-between items-center text-sm">
                  <span className="font-semibold text-text-primary">Total Payable:</span>
                  <span className="font-display font-bold text-xl text-primary">₹{consultationFee}</span>
                </div>
              </div>

              {/* Razorpay Badge & Notice */}
              <div className="p-3.5 rounded-lg bg-surface border border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-secondary" />
                  <span className="font-medium text-text-primary">Razorpay Official Gateway</span>
                </div>
                <span className="text-semantic-success font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
              </div>
            </div>
          )}

          {/* STEP 6: INSTANT CONFIRMATION */}
          {currentStep === 6 && confirmedAppointment && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-semantic-success/10 text-semantic-success border border-semantic-success/20 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-surface-muted text-primary border border-border">
                  Booking Reference: {confirmedAppointment.bookingRef}
                </span>
                <h4 className="font-display text-2xl font-bold text-primary mt-3 mb-1">
                  Appointment Confirmed
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
                  A confirmation SMS & email have been dispatched to <strong>{confirmedAppointment.patientPhone}</strong>.
                </p>
              </div>

              {/* Key Consultation Details Box */}
              <div className="bg-background rounded-xl p-5 border border-border text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Scheduled Time:</span>
                  <span className="font-semibold text-primary">{confirmedAppointment.date} • {confirmedAppointment.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Format:</span>
                  <span className="font-semibold text-primary capitalize">{confirmedAppointment.mode}</span>
                </div>

                {confirmedAppointment.mode === 'online' && (
                  <div className="pt-2 border-t border-border">
                    <div className="text-text-secondary mb-1">Google Meet Video Link:</div>
                    <div className="flex items-center justify-between p-2 rounded bg-surface border border-border">
                      <span className="font-mono text-secondary truncate">
                        {confirmedAppointment.googleMeetLink}
                      </span>
                      <a
                        href={confirmedAppointment.googleMeetLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 shrink-0 ml-2"
                      >
                        <span>Join</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {confirmedAppointment.mode === 'in-clinic' && (
                  <div className="pt-2 border-t border-border">
                    <div className="text-text-secondary mb-1">Clinic Address:</div>
                    <p className="font-medium text-primary">
                      {confirmedAppointment.clinicAddress}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToPatientDashboard();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-md bg-primary hover:bg-primary-hover text-surface text-sm font-semibold tracking-wide transition-all shadow-subtle"
                >
                  View in Patient Dashboard
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-md bg-surface border border-border text-text-primary text-sm font-medium hover:bg-surface-muted"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1 to 5) */}
        {currentStep < 6 && (
          <div className="px-6 py-4 border-t border-border bg-surface flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-md border border-border text-xs font-medium text-text-primary hover:bg-surface-muted flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-surface text-xs font-semibold tracking-wide flex items-center gap-2 transition-all shadow-subtle"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent-soft" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleSimulatePayment}
                className="px-7 py-3 rounded-md bg-primary hover:bg-primary-hover text-surface text-sm font-semibold tracking-wide flex items-center gap-2 transition-all shadow-subtle disabled:opacity-70"
              >
                {isProcessingPayment ? (
                  <span>Securing with Razorpay...</span>
                ) : (
                  <>
                    <span>Confirm & Pay ₹{consultationFee}</span>
                    <ShieldCheck className="w-4 h-4 text-accent-soft" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
