import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Banknote } from 'lucide-react';
import { Doctor } from '../../types';
import { useLang } from '../../i18n/LangContext';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { Button } from '../ui/Button';
import { DoctorAvatar } from '../ui/DoctorAvatar';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const navigate = useNavigate();
  const { tr } = useLang();

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <DoctorAvatar image={doctor.image} initials={doctor.avatarInitials} />
        <div className="min-w-0">
          <h3 className="font-semibold text-[#1a1a1a] text-base leading-tight truncate">
            {doctor.name}
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5 leading-tight">{doctor.title}</p>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <Badge>{tr.specialtyLabels[doctor.specialty]}</Badge>
        <div className="flex items-center gap-1.5">
          <StarRating rating={doctor.rating} />
          <span className="text-xs text-[#6B7280]">({doctor.reviewCount})</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-[#6B7280]">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {tr.yearsExp(doctor.experience)}
        </span>
        <span className="flex items-center gap-1 text-[#1D9E75] font-semibold">
          <Banknote size={14} />
          {tr.egp(doctor.price)}
        </span>
      </div>

      <Button fullWidth onClick={() => navigate(`/booking/${doctor.id}`)}>
        {tr.bookNow}
      </Button>
    </motion.div>
  );
}
