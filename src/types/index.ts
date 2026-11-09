export type ConsultationMode = 'online' | 'in-clinic';

export type ServiceCategory = 
  | 'hair-scalp'
  | 'womens-health'
  | 'digestive-health'
  | 'lifestyle'
  | 'cupping-therapy'
  | 'general-ayurveda';

export interface ServiceDetail {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  description: string;
  clinicalFocus: string[];
  durationMinutes: number;
  onlineFee: number;
  inClinicFee: number;
  isTelemedicineEligible: boolean;
  isInClinicEligible: boolean;
  badge?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  available: boolean;
  mode: ConsultationMode;
}

export interface PatientIntake {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: 'female' | 'male' | 'other' | '';
  city: string;
  preferredLanguage: string;
  primaryConcern: string;
  symptomDuration: string;
  priorTreatments: string;
  medicalHistoryNotes: string;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge?: string;
  patientGender?: string;
  mode: ConsultationMode;
  serviceId: ServiceCategory;
  serviceTitle: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'in-progress';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  amount: number;
  paymentMethod: 'Razorpay (UPI/Cards/NetBanking)';
  transactionId: string;
  googleMeetLink?: string;
  clinicAddress?: string;
  intakeSummary: string;
  prescriptions?: Prescription[];
  doctorNotes?: string;
  createdAt: string;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  prakritiAssessment: string; // e.g. Vata-Pitta dominant
  formulations: {
    name: string;
    dosage: string;
    timing: string; // e.g. Post meals with lukewarm water
    duration: string; // e.g. 30 days
  }[];
  dietaryRecommendations: string[];
  lifestyleAdvice: string[];
  followUpDate: string;
  prescribedAt: string;
}

export type ActiveView = 
  | 'home'
  | 'services'
  | 'about'
  | 'how-it-works'
  | 'patient-dashboard'
  | 'doctor-dashboard'
  | 'admin-dashboard';
