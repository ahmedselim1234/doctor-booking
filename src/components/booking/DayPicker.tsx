import { Doctor } from '../../types';

interface DayPickerProps {
  doctor: Doctor;
  selectedDay: string | null;
  onSelect: (day: string) => void;
}

const allDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export function getNextAvailableDays(availableDays: string[]): string[] {
  const today = new Date();
  const result: string[] = [];
  let offset = 0;
  while (result.length < 6) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    const dayName = allDays[d.getDay()];
    if (availableDays.includes(dayName)) {
      result.push(
        d.toLocaleDateString('ar-EG', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })
      );
    }
    offset++;
    if (offset > 60) break;
  }
  return result;
}

export function DayPicker({ doctor, selectedDay, onSelect }: DayPickerProps) {
  const days = getNextAvailableDays(doctor.availableDays);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {days.map((day) => (
        <button
          key={day}
          onClick={() => onSelect(day)}
          className={`rounded-xl border-2 px-4 py-3 text-sm font-medium text-center transition-all cursor-pointer
            ${
              selectedDay === day
                ? 'border-[#1D9E75] bg-[#1D9E75] text-white'
                : 'border-[#E5E7EB] bg-white text-[#1a1a1a] hover:border-[#1D9E75] hover:text-[#1D9E75]'
            }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
