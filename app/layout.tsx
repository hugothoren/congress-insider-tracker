import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Congress Insider Tracker",
  description: "Track, analyze and monitor congressional stock trades.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
