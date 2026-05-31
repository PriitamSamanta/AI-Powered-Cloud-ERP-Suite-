import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  className?: string;
  trend?: string;
  trendType?: 'up' | 'down';
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  className,
  trend,
  trendType,
}: StatCardProps) {
  const isColored =
    className?.includes('bg-gradient') ?? false;

  return (
    <Card
      className={`
        border
        border-slate-200
        rounded-3xl
        shadow-sm
        hover:shadow-xl
        hover:scale-[1.02]
        transition-all
        duration-300
        ${className || 'bg-white'}
      `}
    >
      <CardContent className="p-7">
        <div className="flex items-start justify-between">
          <div>
            <p
              className={`text-sm font-medium ${
                isColored
                  ? 'text-white/80'
                  : 'text-slate-500'
              }`}
            >
              {title}
            </p>

            <h2
              className={`mt-3 text-5xl font-bold tracking-tight ${
                isColored
                  ? 'text-white'
                  : 'text-slate-900'
              }`}
            >
              {value}
            </h2>
          </div>

          <div
            className={`
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              ${
                isColored
                  ? 'bg-white/20 backdrop-blur-sm'
                  : 'bg-blue-50'
              }
            `}
          >
            <Icon
              className={`h-8 w-8 ${
                isColored
                  ? 'text-white'
                  : 'text-blue-600'
              }`}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <span
              className={`text-sm font-medium ${
                isColored
                  ? 'text-white/90'
                  : 'text-emerald-600'
              }`}
            >
              Live Analytics
            </span>
          </div>

          {trend && (
            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${
                  trendType === 'up'
                    ? isColored
                      ? 'bg-white/20 text-white'
                      : 'bg-green-100 text-green-700'
                    : isColored
                    ? 'bg-white/20 text-white'
                    : 'bg-red-100 text-red-700'
                }
              `}
            >
              {trend}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}