import type { Metadata } from "next";
import "@styles/globals.css";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

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
        </body>
      </html>
    </ClerkProvider>
  );
}
