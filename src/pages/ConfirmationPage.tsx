import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, CalendarDays, Clock, Banknote } from 'lucide-react';
import { useAppDispatch, useBookingState } from '../hooks/useBooking';
import { reset } from '../store/bookingSlice';
import { useLang } from '../i18n/LangContext';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { DoctorAvatar } from '../components/ui/DoctorAvatar';

export function ConfirmationPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bookingId, selectedDoctor, selectedDay, selectedSlot } = useBookingState();
  const { tr } = useLang();

  useEffect(() => { if (!bookingId) navigate('/'); }, [bookingId, navigate]);

  if (!bookingId || !selectedDoctor || !selectedDay || !selectedSlot) return null;

  function handleNewBooking() {
    dispatch(reset());
    navigate('/');
  }

  return (
    <PageWrapper>
      <div className="max-w-lg mx-auto flex flex-col items-center gap-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
          <CheckCircle size={72} className="text-[#1D9E75]" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">{tr.successTitle}</h1>
          <p className="text-[#6B7280]">{tr.successSub}</p>
          <span className="mt-2 inline-block bg-[#1D9E75]/10 text-[#1D9E75] font-mono font-bold text-lg px-4 py-2 rounded-lg">
            {bookingId}
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <DoctorAvatar image={selectedDoctor.image} initials={selectedDoctor.avatarInitials} size="sm" />
              <div className="text-right">
                <p className="font-semibold">{selectedDoctor.name}</p>
                <p className="text-sm text-[#6B7280]">{tr.specialtyLabels[selectedDoctor.specialty]}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-[#6B7280]">
                <CalendarDays size={15} className="text-[#1D9E75]" />
                <span>{selectedDay}</span>
              </div>
              <div className="flex items-center gap-2 text-[#6B7280]">
                <Clock size={15} className="text-[#1D9E75]" />
                <span>{selectedSlot}</span>
              </div>
              <div className="flex items-center gap-2 text-[#1D9E75] font-semibold">
                <Banknote size={15} />
                <span>{tr.egp(selectedDoctor.price)}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <Button size="lg" onClick={handleNewBooking}>{tr.newBooking}</Button>
      </div>
    </PageWrapper>
  );
}
