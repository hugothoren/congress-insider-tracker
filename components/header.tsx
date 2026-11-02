import React from "react";
import Link from "next/link";
import { Bell, ShieldCheck, TrendingUp } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-500 shadow-soft">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">Congress Insider Tracker</p>
            <p className="text-xs text-slate-400">STOCK Act monitoring</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="#overview" className="transition hover:text-white">Overview</Link>
          <Link href="#transactions" className="transition hover:text-white">Trades</Link>
          <Link href="#alerts" className="transition hover:text-white">Alerts</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:border-slate-500">
            <Bell className="h-4 w-4" />
            Alerts
          </button>
          <button className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-soft transition hover:bg-violet-500">
            <TrendingUp className="h-4 w-4" />
            Sync feed
          </button>
        </div>
      </div>
    </header>
  );
}
