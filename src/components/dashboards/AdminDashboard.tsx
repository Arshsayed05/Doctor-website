import React, { useState } from 'react';
import { Appointment } from '../../types';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Calendar, 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface AdminDashboardProps {
  appointments: Appointment[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ appointments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'online' | 'in-clinic'>('all');

  // Metrics
  const totalRevenue = appointments.reduce((sum, a) => sum + a.amount, 0);
  const onlineBookings = appointments.filter((a) => a.mode === 'online').length;
  const inClinicBookings = appointments.filter((a) => a.mode === 'in-clinic').length;

  const filtered = appointments.filter((apt) => {
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMode = filterMode === 'all' || apt.mode === filterMode;
    return matchesSearch && matchesMode;
  });

  return (
    <div className="py-12 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="text-xs uppercase tracking-widest text-secondary font-semibold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Practice Operations & Administration</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary">
              Executive Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              Real-time monitoring of Razorpay settlements, clinic bookings, and capacity.
            </p>
          </div>

          <div className="text-xs px-3 py-1.5 rounded-md bg-surface border border-border text-text-secondary flex items-center gap-2 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-semantic-success" />
            <span>Razorpay Webhook: Active & Verified</span>
          </div>
        </div>

        {/* Operational Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-surface border border-border shadow-subtle space-y-1">
            <span className="text-xs text-text-secondary flex items-center justify-between">
              <span>Gross Consultations Revenue</span>
              <CreditCard className="w-4 h-4 text-secondary" />
            </span>
            <div className="font-display font-bold text-2xl text-primary">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <span className="text-[11px] text-semantic-success font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>100% Settled via Razorpay</span>
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border shadow-subtle space-y-1">
            <span className="text-xs text-text-secondary flex items-center justify-between">
              <span>Total Patient Consultations</span>
              <Users className="w-4 h-4 text-secondary" />
            </span>
            <div className="font-display font-bold text-2xl text-primary">
              {appointments.length} Sessions
            </div>
            <span className="text-[11px] text-text-secondary">
              Includes scheduled & completed
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border shadow-subtle space-y-1">
            <span className="text-xs text-text-secondary flex items-center justify-between">
              <span>PAN-India Telemedicine</span>
              <span className="text-xs font-mono font-semibold text-primary">{onlineBookings}</span>
            </span>
            <div className="font-display font-bold text-2xl text-primary">
              {Math.round((onlineBookings / (appointments.length || 1)) * 100)}%
            </div>
            <span className="text-[11px] text-text-secondary">
              Google Meet Teleconsultations
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface border border-border shadow-subtle space-y-1">
            <span className="text-xs text-text-secondary flex items-center justify-between">
              <span>In-Clinic Mangalore</span>
              <span className="text-xs font-mono font-semibold text-primary">{inClinicBookings}</span>
            </span>
            <div className="font-display font-bold text-2xl text-primary">
              {Math.round((inClinicBookings / (appointments.length || 1)) * 100)}%
            </div>
            <span className="text-[11px] text-text-secondary">
              Falnir Road Clinic & Hijama
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-surface rounded-xl border border-border p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient, ref, or service..."
              className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-background focus:outline-none focus:border-primary text-xs"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-text-secondary">Mode:</span>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                filterMode === 'all' ? 'bg-primary text-surface' : 'bg-surface-muted text-text-primary'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterMode('online')}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                filterMode === 'online' ? 'bg-primary text-surface' : 'bg-surface-muted text-text-primary'
              }`}
            >
              Telemedicine
            </button>
            <button
              onClick={() => setFilterMode('in-clinic')}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                filterMode === 'in-clinic' ? 'bg-primary text-surface' : 'bg-surface-muted text-text-primary'
              }`}
            >
              In-Clinic
            </button>
          </div>
        </div>

        {/* Master Bookings Ledger Table */}
        <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-subtle">
          <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-primary">
              All Consultations & Transactions
            </h3>
            <span className="text-xs text-text-secondary">
              Showing {filtered.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-muted/60 text-primary font-semibold border-b border-border">
                <tr>
                  <th className="p-3.5">Ref ID</th>
                  <th className="p-3.5">Patient Details</th>
                  <th className="p-3.5">Service Category</th>
                  <th className="p-3.5">Mode</th>
                  <th className="p-3.5">Date & Slot</th>
                  <th className="p-3.5">Fee & Payment</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-background/60 transition-colors">
                    <td className="p-3.5 font-mono font-semibold text-secondary">
                      {apt.bookingRef}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-primary">{apt.patientName}</div>
                      <div className="text-[11px] text-text-secondary">{apt.patientPhone}</div>
                    </td>
                    <td className="p-3.5 font-medium text-text-primary">
                      {apt.serviceTitle}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium capitalize border ${
                        apt.mode === 'online' ? 'bg-surface-muted text-primary border-border' : 'bg-background text-secondary border-border'
                      }`}>
                        {apt.mode}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-text-primary">{apt.date}</div>
                      <div className="text-[11px] text-text-secondary">{apt.time}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-primary">₹{apt.amount}</div>
                      <div className="text-[10px] text-semantic-success flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Razorpay Paid</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-semantic-success/10 text-semantic-success font-medium text-[11px] border border-semantic-success/20 capitalize">
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
