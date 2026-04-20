import { Doctor } from '../../types';
import { DoctorCard } from './DoctorCard';
import { Stethoscope } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

interface DoctorGridProps {
  doctors: Doctor[];
}

export function DoctorGrid({ doctors }: DoctorGridProps) {
  const { tr } = useLang();

  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-[#6B7280]">
        <Stethoscope size={48} className="text-[#E5E7EB]" />
        <p className="text-lg font-medium">{tr.noResults}</p>
        <p className="text-sm">{tr.tryChanging}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
