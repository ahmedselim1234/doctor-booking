import { TimeSlot } from '../../types';

interface SlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
}

export function SlotPicker({ slots, selectedSlot, onSelect }: SlotPickerProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
      {slots.map(({ time, available }) => (
        <button
          key={time}
          disabled={!available}
          onClick={() => available && onSelect(time)}
          className={`rounded-lg border py-2.5 text-sm font-medium transition-all
            ${!available ? 'bg-[#F3F4F6] border-[#E5E7EB] text-[#6B7280] cursor-not-allowed' : ''}
            ${available && selectedSlot !== time ? 'bg-white border-[#E5E7EB] text-[#1a1a1a] hover:border-[#1D9E75] hover:text-[#1D9E75] cursor-pointer' : ''}
            ${selectedSlot === time ? 'bg-[#1D9E75] border-[#1D9E75] text-white' : ''}
          `}
        >
          {time}
        </button>
      ))}
    </div>
  );
}
