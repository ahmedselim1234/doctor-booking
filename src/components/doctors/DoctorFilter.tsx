import { Specialty } from '../../types';
import { useLang } from '../../i18n/LangContext';
import { Button } from '../ui/Button';

interface FilterState {
  specialty: Specialty | '';
  minRating: number;
  maxPrice: number;
}

interface DoctorFilterProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const specialties = [
  'cardiology', 'orthopedics', 'dermatology', 'pediatrics',
  'ophthalmology', 'neurology', 'gastroenterology', 'ent',
] as Specialty[];

export function DoctorFilter({ filters, onChange }: DoctorFilterProps) {
  const { tr, lang } = useLang();
  const set = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });

  return (
    <aside className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col gap-6">
      <h2 className="font-semibold text-[#1a1a1a] text-lg">{tr.filterTitle}</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#1a1a1a]">{tr.specialty}</label>
        <select
          value={filters.specialty}
          onChange={(e) => set({ specialty: e.target.value as Specialty | '' })}
          className="border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1D9E75]"
        >
          <option value="">{tr.allSpecialties}</option>
          {specialties.map((s) => (
            <option key={s} value={s}>{tr.specialtyLabels[s]}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#1a1a1a]">{tr.minRating(filters.minRating)}</label>
        <input type="range" min={0} max={5} step={0.5} value={filters.minRating}
          onChange={(e) => set({ minRating: Number(e.target.value) })}
          className="accent-[#1D9E75]" />
        <div className="flex justify-between text-xs text-[#6B7280]">
          <span>{lang === 'ar' ? 'الكل' : 'Any'}</span>
          <span>5 ⭐</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#1a1a1a]">{tr.maxPrice(filters.maxPrice)}</label>
        <input type="range" min={200} max={600} step={50} value={filters.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          className="accent-[#1D9E75]" />
        <div className="flex justify-between text-xs text-[#6B7280]">
          <span>200</span><span>600</span>
        </div>
      </div>

      <Button variant="outline" onClick={() => onChange({ specialty: '', minRating: 0, maxPrice: 600 })}>
        {tr.reset}
      </Button>
    </aside>
  );
}
