import { Card, CardContent } from "@/components/ui/card";

export default function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <CardContent className="space-y-8 p-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {title}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        {children}
      </CardContent>
    </Card>
  );
}