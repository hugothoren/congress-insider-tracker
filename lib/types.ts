export type Chamber = "house" | "senate";
export type Party = "democrat" | "republican" | "independent";
export type TradeType = "buy" | "sell" | "exchange";

export type Politician = {
  id: string;
  name: string;
  slug: string;
  chamber: Chamber;
  party: Party;
  state: string;
  district?: string;
  avatarUrl?: string;
  createdAt: string;
};

export type Transaction = {
  id: string;
  politician: Politician;
  ticker: string;
  companyName: string;
  assetDescription?: string;
  type: TradeType;
  amountRange: string;
  minAmount: number;
  maxAmount: number;
  transactionDate: string;
  disclosureDate: string;
  createdAt: string;
};

export type NotificationItem = {
  id: string;
  politician?: Politician;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export function formatCurrencyShort(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

export function getTransactionTypeColor(type: TradeType) {
  switch (type) {
    case "buy":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
    case "sell":
      return "bg-rose-500/15 text-rose-300 border border-rose-500/30";
    case "exchange":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 border border-slate-500/30";
  }
}

export function getInsightSummary() {
  return [
    {
      title: "Largest active buyer",
      value: "Rep. Morgan Lee",
      description: "Accumulated a multi-sector position with recent disclosures concentrated in healthcare and semis.",
    },
    {
      title: "Most active sector",
      value: "Defense / Industrials",
      description: "Six filings this quarter show a consistent pattern toward military contractors and industrial suppliers.",
    },
    {
      title: "Highest anomaly index",
      value: "Sen. Patel",
      description: "Trading activity is 18% over the 90-day baseline with rapid tickers rotation in the last 14 days.",
    },
  ];
}
