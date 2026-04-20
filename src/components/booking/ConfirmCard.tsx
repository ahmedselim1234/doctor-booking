import { Doctor, PatientInfo } from '../../types';
import { useLang } from '../../i18n/LangContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { DoctorAvatar } from '../ui/DoctorAvatar';
import { CalendarDays, Clock, User, Banknote } from 'lucide-react';

interface ConfirmCardProps {
  doctor: Doctor;
  day: string;
  slot: string;
  patient: PatientInfo;
  onConfirm: () => void;
}

export function ConfirmCard({ doctor, day, slot, patient, onConfirm }: ConfirmCardProps) {
  const { tr } = useLang();

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex items-center gap-4 mb-4">
          <DoctorAvatar image={doctor.image} initials={doctor.avatarInitials} />
          <div>
            <h3 className="font-semibold text-[#1a1a1a]">{doctor.name}</h3>
            <Badge className="mt-1">{tr.specialtyLabels[doctor.specialty]}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <InfoRow icon={<CalendarDays size={16} />} label={tr.day} value={day} />
          <InfoRow icon={<Clock size={16} />} label={tr.time} value={slot} />
          <InfoRow icon={<User size={16} />} label={tr.patient} value={`${patient.firstName} ${patient.lastName}`} />
          <InfoRow icon={<Banknote size={16} />} label={tr.fees} value={tr.egp(doctor.price)} valueClass="text-[#1D9E75] font-semibold" />
        </div>
      </Card>

      <Button size="lg" fullWidth onClick={onConfirm}>
        {tr.confirmBooking}
      </Button>
    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}

function InfoRow({ icon, label, value, valueClass = 'text-[#1a1a1a]' }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2 bg-[#F8FAF9] rounded-lg px-3 py-2.5">
      <span className="text-[#1D9E75]">{icon}</span>
      <span className="text-[#6B7280]">{label}:</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}
