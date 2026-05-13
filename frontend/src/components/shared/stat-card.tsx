import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">{value}</h2>
        </div>

        <div className="rounded-xl bg-muted p-3">
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
