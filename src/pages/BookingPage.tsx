import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { doctors } from '../data/doctors';
import { generateSlots } from '../data/slots';
import { useAppDispatch, useBookingState } from '../hooks/useBooking';
import { setDoctor, setDay, setSlot, setPatientInfo, confirmBooking } from '../store/bookingSlice';
import { PatientInfo } from '../types';
import { useLang } from '../i18n/LangContext';
import { PageWrapper } from '../components/layout/PageWrapper';
import { StepIndicator } from '../components/booking/StepIndicator';
import { DayPicker } from '../components/booking/DayPicker';
import { SlotPicker } from '../components/booking/SlotPicker';
import { BookingForm } from '../components/booking/BookingForm';
import { ConfirmCard } from '../components/booking/ConfirmCard';
import { DoctorAvatar } from '../components/ui/DoctorAvatar';
import { Button } from '../components/ui/Button';

export function BookingPage() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedDay, selectedSlot, patientInfo } = useBookingState();
  const { tr, lang } = useLang();

  const [step, setStep] = useState(1);

  const doctor = doctors.find((d) => d.id === Number(doctorId));

  useEffect(() => {
    if (!doctor) { navigate('/doctors'); return; }
    dispatch(setDoctor(doctor));
  }, [doctor, dispatch, navigate]);

  if (!doctor) return null;

  const slots = generateSlots(doctor.id);

  function handleConfirm() {
    dispatch(confirmBooking());
    navigate('/confirmation');
  }

  function handlePatientSubmit(data: PatientInfo) {
    dispatch(setPatientInfo(data));
    setStep(4);
  }

  const canNext = (step === 1 && !!selectedDay) || (step === 2 && !!selectedSlot);

  const stepTitles = [tr.chooseDay, tr.chooseSlot, tr.patientInfo, tr.reviewConfirm];
  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <DoctorAvatar image={doctor.image} initials={doctor.avatarInitials} size="sm" />
          <div>
            <h2 className="font-semibold text-[#1a1a1a]">{doctor.name}</h2>
            <p className="text-sm text-[#6B7280]">{doctor.title}</p>
          </div>
        </div>

        <StepIndicator currentStep={step} />

        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">{stepTitles[step - 1]}</h3>

          {step === 1 && (
            <DayPicker doctor={doctor} selectedDay={selectedDay} onSelect={(d) => dispatch(setDay(d))} />
          )}
          {step === 2 && (
            <SlotPicker slots={slots} selectedSlot={selectedSlot} onSelect={(s) => dispatch(setSlot(s))} />
          )}
          {step === 3 && (
            <BookingForm defaultValues={patientInfo ?? undefined} onSubmit={handlePatientSubmit} />
          )}
          {step === 4 && selectedDay && selectedSlot && patientInfo && (
            <ConfirmCard doctor={doctor} day={selectedDay} slot={selectedSlot} patient={patientInfo} onConfirm={handleConfirm} />
          )}
        </div>

        {step !== 3 && step !== 4 && (
          <div className="flex items-center justify-between mt-6">
            {step > 1 ? (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                <BackIcon size={16} />
                {tr.prev}
              </Button>
            ) : <div />}
            <Button disabled={!canNext} onClick={() => setStep(step + 1)}>{tr.next}</Button>
          </div>
        )}

        {step === 4 && (
          <Button variant="ghost" className="mt-4" onClick={() => setStep(3)}>
            <BackIcon size={16} />
            {tr.editData}
          </Button>
        )}
      </div>
    </PageWrapper>
  );
}
