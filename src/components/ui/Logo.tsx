interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-baseline gap-1.5 leading-none ${className}`}>
      <span className="font-bold text-2xl text-[#1D9E75] tracking-tight">طبيبي</span>
      <span className="font-medium text-sm text-[#6B7280] tracking-wide">Tabeebi</span>
    </div>
  );
}
