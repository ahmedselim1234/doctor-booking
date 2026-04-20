import { Check } from 'lucide-react';
import { useLang } from '../../i18n/LangContext';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function StepIndicator({ currentStep, totalSteps = 4 }: StepIndicatorProps) {
  const { tr } = useLang();

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const done = step < currentStep;
        const active = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
                  ${done || active ? 'bg-[#1D9E75] border-[#1D9E75] text-white' : 'bg-white border-[#E5E7EB] text-[#6B7280]'}`}
              >
                {done ? <Check size={16} /> : step}
              </div>
              <span className={`text-xs hidden sm:block ${active ? 'text-[#1D9E75] font-medium' : 'text-[#6B7280]'}`}>
                {tr.stepLabels[i]}
              </span>
            </div>
            {step < totalSteps && (
              <div className={`h-0.5 w-12 sm:w-20 mx-1 mb-5 transition-all ${done ? 'bg-[#1D9E75]' : 'bg-[#E5E7EB]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
