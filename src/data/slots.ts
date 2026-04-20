import { TimeSlot } from '../types';

export function generateSlots(seed: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const unavailableSet = new Set<string>();

  // Deterministic pseudo-random based on seed
  const rng = (n: number) => ((seed * 9301 + n * 49297 + 233) % 1000) / 1000;

  // Pre-mark ~4 slots as unavailable
  const times: string[] = [];
  let hour = 9;
  let minute = 0;
  while (hour < 17 || (hour === 16 && minute <= 30)) {
    const t = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    times.push(t);
    minute += 30;
    if (minute >= 60) { minute = 0; hour++; }
    if (hour === 16 && minute > 30) break;
  }

  times.forEach((time, i) => {
    if (rng(i) < 0.3) unavailableSet.add(time);
  });

  times.forEach((time) => {
    slots.push({ time, available: !unavailableSet.has(time) });
  });

  return slots;
}
