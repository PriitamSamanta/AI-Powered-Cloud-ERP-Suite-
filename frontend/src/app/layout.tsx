import QueryProvider from "@/components/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <TooltipProvider>{children}
            <Toaster
              position="top-right"
              richColors
              closeButton
            />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
