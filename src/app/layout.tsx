import type { Metadata } from "next";
import "@styles/globals.css";

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
    <html lang="en">
      <body className="antialiased min-w-screen min-h-screen font-secondary bg-background">
        {children}
      </body>
    </html>
  );
}
