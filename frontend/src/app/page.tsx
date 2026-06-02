import Link from "next/link";
import {
  UsersRound,
  UserCog,
  Landmark,
  BarChart4,
} from "lucide-react";

const modules = [
  {
    title: "HR Module",
    description: "Employees, attendance, leave and payroll management.",
    icon: UsersRound,
    href: "/login?module=hr",
  },
  {
    title: "Employee Portal",
    description:
      "Attendance, leave requests, payroll and personal profile.",
    icon: UserCog,
    href: "/login?module=employee",
  },
  {
    title: "Finance Module",
    description: "Accounts, income, expense, journal and financial summary.",
    icon: Landmark,
    href: "/login?module=finance",
  },
  {
    title: "BI Module",
    description: "Analytics, charts, reports and business insights.",
    icon: BarChart4,
    href: "/login?module=bi",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section
        className="
          relative
          min-h-screen
          overflow-hidden
          text-white
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
            bg-no-repeat
          "
          style={{
            backgroundImage: "url('/images/newback3.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/80" />

        <div className="relative z-10 mx-auto max-w-7xl px-8">
          <nav className="flex items-center justify-between border-b pb-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10
                  backdrop-blur
                "
              >
                A
              </div>

              <div>
                <h1 className="font-bold">
                  Amdox ERP
                </h1>

                <p className="text-xs text-slate-300">
                  Enterprise Suite
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-8 text-sm font-medium md:flex">
              <a href="#modules">Modules</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>

            <Link
              href="/register"
              className="
                rounded-full
                bg-white/10
                backdrop-blur-xl
                border-white/10
                px-5
                py-2
                text-sm
                font-medium
                text-white
                hover:opacity-90
              "
            >
              Register
            </Link>
          </nav>

          <div className="py-20 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              — Cloud ERP Platform —
            </p>

            <h2 className="mx-auto max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
              Transform Your Business Operations
              with One Unified ERP Platform
            </h2>

            <div className="mt-12 flex flex-wrap justify-center gap-10">
              <div>
                <h3 className="text-4xl font-bold">
                  HR
                </h3>

                <p className="text-slate-300">
                  Workforce Management
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  FIN
                </h3>

                <p className="text-slate-300">
                  Financial Operations
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  BI
                </h3>

                <p className="text-slate-300">
                  Business Intelligence
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold">
                  EMP
                </h3>

                <p className="text-slate-300">
                  Employee Portal
                </p>
              </div>
            </div>

            <div
              id="modules"
              className="
                mx-auto mt-12 grid
                max-w-6xl
                grid-cols-1
                gap-6
                md:grid-cols-2
                xl:grid-cols-4
                "
            >
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <Link
                    key={module.title}
                    href={module.href}
                    className="
                      group
                      rounded-3xl
                      border
                      border-slate-200
                      bg-white/10
                      backdrop-blur-xl
                      border-white/10
                      p-7
                      text-left
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:shadow-xl
                      "
                  >
                    <div
                      className="
                        mb-6
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        from-blue-500/20
                        to-cyan-500/20
                        border
                        border-white/10
                        text-cyan-300
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:text-white
                      "
                    >
                      <Icon size={30} strokeWidth={2.2} />
                    </div>

                    <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                    <p className="text-slate-300">
                      {module.description}
                    </p>

                    <p className="mt-5 text-sm font-medium">Open Module →</p>
                  </Link>
                );
              })}
            </div>

            <div
              id="about"
              className="
                mt-28
                grid
                gap-8
                md:grid-cols-3
              "
            >
              <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
                <h3 className="text-xl font-semibold">
                  Human Resources
                </h3>

                <p className="mt-3 text-slate-300">
                  Employee onboarding, attendance,
                  leave and payroll management.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
                <h3 className="text-xl font-semibold">
                  Finance
                </h3>

                <p className="mt-3 text-slate-300">
                  Income, expenses, journals and
                  accounting workflows.
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
                <h3 className="text-xl font-semibold">
                  Business Intelligence
                </h3>

                <p className="mt-3 text-slate-300">
                  Analytics dashboards, reports
                  and executive insights.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span>✓ Role Based Access</span>
              <span>✓ Module Based Login</span>
              <span>✓ Secure Dashboard</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}