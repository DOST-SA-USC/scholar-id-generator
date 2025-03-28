import type { Metadata } from "next";
import "@styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DOST SA USC",
  description: "DOST Scholars’ Association in the University of San Carlos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased font-secondary bg-background">
          {children}
          <Toaster richColors position="bottom-right" theme="light" />
        </body>
      </html>
    </ClerkProvider>
  );
}
