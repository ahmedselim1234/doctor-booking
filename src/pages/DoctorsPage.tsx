import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { Specialty } from '../types';
import { doctors } from '../data/doctors';
import { useLang } from '../i18n/LangContext';
import { DoctorGrid } from '../components/doctors/DoctorGrid';
import { DoctorFilter } from '../components/doctors/DoctorFilter';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';

interface FilterState {
  specialty: Specialty | '';
  minRating: number;
  maxPrice: number;
}

export function DoctorsPage() {
  const [searchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const { tr } = useLang();

  const [filters, setFilters] = useState<FilterState>({
    specialty: (searchParams.get('specialty') as Specialty) || '',
    minRating: 0,
    maxPrice: 600,
  });

  const filtered = useMemo(
    () => doctors.filter(
      (d) =>
        (!filters.specialty || d.specialty === filters.specialty) &&
        d.rating >= filters.minRating &&
        d.price <= filters.maxPrice
    ),
    [filters]
  );

  return (
    <PageWrapper>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">{tr.doctorsTitle}</h1>
        <Button
          variant="outline" size="sm"
          className="md:hidden flex items-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          {showFilter ? <X size={16} /> : <SlidersHorizontal size={16} />}
          {showFilter ? '✕' : tr.filterTitle}
        </Button>
      </div>

      <div className="flex gap-6">
        <div className={`w-72 shrink-0 ${showFilter ? 'block' : 'hidden'} md:block`}>
          <DoctorFilter filters={filters} onChange={setFilters} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#6B7280] mb-4">{tr.doctorCount(filtered.length)}</p>
          <DoctorGrid doctors={filtered} />
        </div>
      </div>
    </PageWrapper>
  );
}
