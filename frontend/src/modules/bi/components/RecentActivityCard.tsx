import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Activity {
  id: number;
  title: string;
  amount: string;
  date: string;
  type: 'income' | 'expense';
}

interface Props {
  activities: Activity[];
}

export default function RecentActivityCard({
  activities,
}: Props) {
  return (
    <Card
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
      "
    >
      <CardHeader className="border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle
              className="
                text-xl
                font-semibold
                text-slate-800
              "
            >
              Recent Activity
            </CardTitle>

            <p className="mt-1 text-sm text-slate-500">
              Latest financial transactions
            </p>
          </div>

          <span
            className="
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              font-medium
              text-slate-600
            "
          >
            {activities.length} Records
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div
          className="
    h-[560px]
    overflow-y-auto
    space-y-3
    pr-2
    scrollbar-thin
    scrollbar-thumb-slate-300
    scrollbar-track-transparent
  "
        >

          {activities.map((activity) => (
            <div
              key={`${activity.type}-${activity.id}`}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-100
                p-4
                hover:bg-slate-50
                transition-all
              "
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {new Date(
                    activity.date
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold text-lg ${activity.type === 'income'
                    ? 'text-emerald-600'
                    : 'text-red-600'
                    }`}
                >
                  ₹{activity.amount}
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${activity.type === 'income'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                    }`}
                >
                  {activity.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}

        </div>
      </CardContent>
    </Card>
  );
}