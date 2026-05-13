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
    <Card>
      <CardContent className="space-y-6 p-6">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {children}
      </CardContent>
    </Card>
  );
}
