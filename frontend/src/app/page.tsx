import Link from "next/link";
import { BarChart3, BriefcaseBusiness, Users } from "lucide-react";

const modules = [
  {
    title: "HR Module",
    description: "Employees, attendance, leave and payroll management.",
    icon: Users,
    href: "/login?module=hr",
  },
  {
    title: "Finance Module",
    description: "Accounts, income, expense, journal and financial summary.",
    icon: BriefcaseBusiness,
    href: "/login?module=finance",
  },
  {
    title: "BI Module",
    description: "Analytics, charts, reports and business insights.",
    icon: BarChart3,
    href: "/login?module=bi",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="min-h-screen px-8 py-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between border-b pb-5">
            <h1 className="text-lg font-bold tracking-tight">
              Amdox ERP Suite
            </h1>

            <div className="hidden items-center gap-8 text-sm font-medium md:flex">
              <a href="#modules">Modules</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>

            <Link
              href="/login"
              className="rounded-full border px-5 py-2 text-sm font-medium hover:bg-black hover:text-white"
            >
              Login
            </Link>
          </nav>

          <div className="py-20 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              — Cloud ERP Platform —
            </p>

            <h2 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              AI-Powered Cloud ERP Suite for Modern Business
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-gray-600">
              Manage HR, Finance and Business Intelligence from one secure ERP
              platform.
            </p>

            <div
              id="modules"
              className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3"
            >
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <Link
                    key={module.title}
                    href={module.href}
                    className="group rounded-2xl border bg-white p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 group-hover:bg-black group-hover:text-white">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-lg font-semibold">{module.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {module.description}
                    </p>

                    <p className="mt-5 text-sm font-medium">Open Module →</p>
                  </Link>
                );
              })}
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