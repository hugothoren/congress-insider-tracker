import { Accessor, Gauge, Landmark, ShieldAlert, TrendingUp, Wallet2 } from "lucide-react";

import { mockPoliticians, mockTransactions, mockNotifications } from "@/lib/mock-data";
import { formatCurrencyShort, formatDate, formatPercentage, getInsightSummary, getTransactionTypeColor } from "@/lib/types";

const metrics = [
  { label: "Tracked politicians", value: "142", delta: "+12 this month", icon: Landmark },
  { label: "Reported trades", value: "1,284", delta: "+31% YoY", icon: Wallet2 },
  { label: "High-risk alerts", value: "18", delta: "4 urgent", icon: ShieldAlert },
  { label: "Avg. turnover", value: "2.4x", delta: "+0.8x", icon: Gauge },
];

export function Dashboard() {
  const totalValue = mockTransactions.reduce((sum, item) => sum + item.maxAmount, 0);
  const buyVolume = mockTransactions
    .filter((item) => item.type === "buy")
    .reduce((sum, item) => sum + item.maxAmount, 0);
  const sellVolume = mockTransactions
    .filter((item) => item.type === "sell")
    .reduce((sum, item) => sum + item.maxAmount, 0);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <section id="overview" className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-soft">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-violet-200">
            <TrendingUp className="h-3.5 w-3.5" />
            Real-time oversight
          </div>

          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Congress insider activity, monitored in one place.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-slate-300">
            Track stock purchases, sales and exchange activity reported through the STOCK Act to spot
            unusual patterns, recent moves and potential risk signals.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Portfolio value</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrencyShort(totalValue)}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Buy volume</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-400">{formatCurrencyShort(buyVolume)}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Sell volume</p>
              <p className="mt-2 text-2xl font-semibold text-rose-400">{formatCurrencyShort(sellVolume)}</p>
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Market signal</p>
          <div className="mt-6 space-y-5">
            {[
              { label: "Buy/sell ratio", value: "1.74x", trend: "+22%" },
              { label: "Most active sector", value: "Semiconductors", trend: "AI/Chip" },
              { label: "Alert pressure", value: "Moderate", trend: "5 new" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400">{item.label}</span>
                  <span className="text-xs text-emerald-400">{item.trend}</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{metric.label}</p>
                <div className="rounded-lg bg-violet-500/10 p-2 text-violet-200">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-5 text-3xl font-semibold text-white">{metric.value}</p>
              <p className="mt-2 text-sm text-emerald-400">{metric.delta}</p>
            </div>
          );
        })}
      </section>

      <section id="transactions" className="grid gap-8 xl:grid-cols-[1.5fr_0.75fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Recent disclosures</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Latest congressional trades</h2>
            </div>
            <button className="rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 hover:border-slate-500">
              Export CSV
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Politician</th>
                  <th className="px-4 py-3 font-medium">Ticker</th>
                  <th className="px-4 py-3 font-medium">Trade</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-100">
                {mockTransactions.map((trade) => (
                  <tr key={trade.id} className="hover:bg-slate-800/50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/15 text-xs font-semibold text-violet-200">
                          {trade.politician.name
                            .split(" ")
                            .map((part) => part[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium">{trade.politician.name}</p>
                          <p className="text-xs text-slate-400">{trade.politician.state}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">{trade.ticker}</p>
                        <p className="text-xs text-slate-400">{trade.companyName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getTransactionTypeColor(trade.type)}`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p>{trade.amountRange}</p>
                      <p className="text-xs text-slate-400">{formatCurrencyShort(trade.maxAmount)}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-300">{formatDate(trade.transactionDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside id="alerts" className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Watchlist</p>
            <div className="mt-5 space-y-4">
              {mockPoliticians.slice(0, 3).map((person) => (
                <div key={person.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/15 text-xs font-medium text-violet-200">
                      {person.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="font-medium text-white">{person.name}</p>
                      <p className="text-xs text-slate-400">{person.chamber} · {person.party}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-400">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Alerts</p>
            <div className="mt-5 space-y-4">
              {mockNotifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{notification.title}</p>
                    {!notification.read && (
                      <span className="rounded-full bg-amber-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300">
                        New
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{notification.body}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{notification.politician?.name}</span>
                    <span>{formatDate(notification.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-soft">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Network insight</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Analytical summary</h2>
          </div>
          <div className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-200">
            {formatPercentage(12.4)} above baseline
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {getInsightSummary().map((insight) => (
            <div key={insight.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <p className="text-sm text-slate-400">{insight.title}</p>
              <p className="mt-2 text-xl font-semibold text-white">{insight.value}</p>
              <p className="mt-3 text-sm text-slate-300">{insight.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
