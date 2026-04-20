import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
}

export function StarRating({ rating, max = 5, size = 14 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.round(rating);
        return (
          <Star
            key={i}
            size={size}
            className={filled ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}
          />
        );
      })}
    </div>
  );
}
