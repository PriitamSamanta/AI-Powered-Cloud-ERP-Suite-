import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-xl
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-100
          px-6
          py-5
        "
      >
        <div>
          <h3
            className="
              text-sm
              font-bold
              uppercase
              tracking-wider
              text-slate-900
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
            "
          >
            Real-time business insights
          </p>
        </div>

        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            font-medium
            text-emerald-600
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-emerald-500
            "
          />

          Live
        </div>
      </div>

      <CardContent
        className="
          h-[320px]
          p-6
        "
      >
        {children}
      </CardContent>
    </Card>
  );
}