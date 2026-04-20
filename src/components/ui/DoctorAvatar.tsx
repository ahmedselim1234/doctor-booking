import { useState } from 'react';

interface DoctorAvatarProps {
  image: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-14 h-14 text-lg',
  lg: 'w-20 h-20 text-2xl',
};

export function DoctorAvatar({ image, initials, size = 'md' }: DoctorAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        src={image}
        alt={initials}
        onError={() => setFailed(true)}
        className={`${sizes[size]} rounded-full object-cover object-top shrink-0 border-2 border-[#E5E7EB]`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-[#1D9E75] flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initials}
    </div>
  );
}
