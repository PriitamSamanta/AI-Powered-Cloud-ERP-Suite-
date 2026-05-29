import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ChartCard({
  title,
  children,
}: Props) {
  return (
    <Card
      className="
        bg-white
        border-0
        rounded-3xl
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >
      <CardHeader
        className="
          border-b
          border-slate-100
          pb-4
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle
              className="
                text-lg
                font-semibold
                tracking-normal
                text-slate-800
              "
            >
              {title}
            </CardTitle>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Real-time business insights
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <span
              className="
                text-xs
                font-medium
                text-emerald-600
              "
            >
              Live
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent
        className="
          h-[350px]
          pt-6
        "
      >
        {children}
      </CardContent>
    </Card>
  );
}