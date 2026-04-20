import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id ?? label;
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#1a1a1a]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors
            ${error ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-[#E5E7EB] focus:border-[#1D9E75] focus:ring-2 focus:ring-[#1D9E75]/20'}
            ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
