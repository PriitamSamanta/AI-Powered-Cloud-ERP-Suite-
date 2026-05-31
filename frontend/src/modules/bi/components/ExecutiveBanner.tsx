interface Props {
  totalEmployees: number;
  revenue: number;
  profit: number;
  attendance: number;
}

export default function ExecutiveBanner({
  totalEmployees,
  revenue,
  profit,
  attendance,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      bg-gradient-to-r
      from-slate-900
      via-slate-800
      to-slate-900
      p-8
      text-white
      shadow-xl
      "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Executive Overview
          </h1>

          <p className="mt-2 text-slate-300">
            Monitor workforce,
            attendance, payroll and
            financial performance from a
            single dashboard.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-400">
              Employees
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {totalEmployees}
            </h2>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Revenue
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              ₹{revenue.toLocaleString()}
            </h2>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Profit
            </p>

            <h2 className="mt-1 text-2xl font-bold text-emerald-400">
              ₹{profit.toLocaleString()}
            </h2>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Attendance
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {attendance}%
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}