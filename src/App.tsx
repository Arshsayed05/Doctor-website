import React, { useState } from 'react';
import { ActiveView, ServiceCategory, Appointment } from './types';
import { INITIAL_APPOINTMENTS } from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Hero } from './components/home/Hero';
import { ServiceExplorer } from './components/home/ServiceExplorer';
import { ClinicalPhilosophy } from './components/home/ClinicalPhilosophy';
import { CredentialsSection } from './components/home/CredentialsSection';
import { PatientJourney } from './components/home/PatientJourney';
import { FaqSection } from './components/home/FaqSection';
import { BookingModal } from './components/booking/BookingModal';
import { PatientDashboard } from './components/dashboards/PatientDashboard';
import { DoctorDashboard } from './components/dashboards/DoctorDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<ServiceCategory | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const handleOpenBooking = (categoryId?: ServiceCategory) => {
    setPreselectedCategory(categoryId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleUpdateAppointment = (updated: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-soft selection:text-primary">
      {/* Universal Navigation Header */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onExploreServices={() => {
                const el = document.getElementById('services-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveView('services');
                }
              }}
            />
            <ServiceExplorer onSelectService={(id) => handleOpenBooking(id)} />
            <ClinicalPhilosophy />
            <CredentialsSection />
            <PatientJourney onOpenBooking={() => handleOpenBooking()} />
            <FaqSection />
          </>
        )}

        {activeView === 'services' && (
          <div className="py-6">
            <ServiceExplorer onSelectService={(id) => handleOpenBooking(id)} />
            <FaqSection />
          </div>
        )}

        {activeView === 'about' && (
          <div className="py-6">
            <CredentialsSection />
            <ClinicalPhilosophy />
          </div>
        )}

        {activeView === 'how-it-works' && (
          <div className="py-6">
            <PatientJourney onOpenBooking={() => handleOpenBooking()} />
            <FaqSection />
          </div>
        )}

        {activeView === 'patient-dashboard' && (
          <PatientDashboard
            appointments={appointments}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeView === 'doctor-dashboard' && (
          <DoctorDashboard
            appointments={appointments}
            onUpdateAppointment={handleUpdateAppointment}
          />
        )}

        {activeView === 'admin-dashboard' && (
          <AdminDashboard appointments={appointments} />
        )}
      </main>

      {/* Booking Engine Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedCategory}
        onBookingSuccess={handleBookingSuccess}
        onNavigateToPatientDashboard={() => {
          setActiveView('patient-dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Clinical Footer */}
      <Footer
        setActiveView={setActiveView}
        onOpenBooking={() => handleOpenBooking()}
      />
    </div>
  );
};

export default App;
