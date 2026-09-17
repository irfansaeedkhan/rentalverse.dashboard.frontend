export const demoUser = {
  Email: "demo@altaria.com",
  Name: "Avery",
  Surname: "Morgan",
  AffiliateCode: "ALT-DEMO",
  WalletAddress: "0x381E97Fb7531BF0E1795B02fa9Db203940B78D10",
  PasswordResetAt: "",
  Auth_Token: "demo-access-token",
  refresh_token: "demo-refresh-token",
};

export const DEMO_PAGE_SIZE = 5;

const dashboard = {
  Available_Balance: 8420.5,
  Company_Lands_Value: 136000,
  Contract_Expiry_Date: "2027-05-30",
  Contract_Start_Date: "2024-05-30",
  Equity_Percentage: 12.5,
  Lands_Value: 42800,
  Minted_Lands: 136,
  Number_of_Pages: 2,
  Onwhitdraw_balance: 1200,
  Page_size: DEMO_PAGE_SIZE,
  Owned_Lands: 42,
  ROI_Last_Month: 3.8,
  ROI_Until_Now: 18.4,
  Supply_Max: 12000,
  Wallet_Address: demoUser.WalletAddress,
  return_stats_arrays: [
    {
      year: "2025",
      percentages: [
        { January: 2.1 },
        { February: 2.5 },
        { March: 2.7 },
        { April: 3.4 },
        { May: 3.8 },
        { June: 4.1 },
        { July: 4.4 },
        { August: 4.8 },
        { September: 5.1 },
        { October: 5.4 },
        { November: 5.8 },
        { December: 6.1 },
      ],
    },
    {
      year: "2026",
      percentages: [
        { January: 3.2 },
        { February: 3.6 },
        { March: 4.1 },
        { April: 4.6 },
        { May: 4.2 },
        { June: 4.8 },
        { July: 5.1 },
        { August: 5.4 },
        { September: 5.8 },
        { October: 6.1 },
        { November: 6.4 },
        { December: 6.8 },
      ],
    },
  ],
};

const affiliateNames = [
  "Maya Chen",
  "Jordan Ellis",
  "Sam Patel",
  "Taylor Brooks",
  "Casey Rivera",
  "Riley Kim",
  "Quinn Adams",
  "Drew Stone",
  "Blake Foster",
  "Harper Lane",
  "Morgan Lee",
  "Jamie Cruz",
];

const affiliates = affiliateNames.map((fullName, index) => {
  const [name, surName] = fullName.split(" ");
  return {
    name,
    surName,
    email: `member${index + 1}@altaria.local`,
    MetaAsset_Purchased: index + 1,
    Royalty: 84 + index * 32,
  };
});

const leaderboardNames = [
  "Avery",
  "Nova",
  "Atlas",
  "Sage",
  "Orion",
  "Mila",
  "Kai",
  "Luna",
  "Theo",
  "Iris",
  "Eden",
  "Rex",
];

const leaderboard = Array.from({ length: 12 }, (_, index) => ({
  Position: index + 1,
  Score: 9800 - index * 643,
  Username: leaderboardNames[index],
  WalletAddress: `0x${(index + 1).toString(16)}a7c${(91 - index).toString(16)}e2demo`,
  ImageProfileUrl: "",
}));

const rewards = [
  { Amount: 1250.12345678, Date: "2026-09-10", Type: "Sale", from: "Meta asset sale" },
  { Amount: 680.5, Date: "2026-09-03", Type: "Referral", from: "Referral commission" },
  { Amount: 940, Date: "2026-08-28", Type: "Sale", from: "Meta asset sale" },
  { Amount: 420.25, Date: "2026-08-21", Type: "Referral", from: "Referral commission" },
  { Amount: 1100, Date: "2026-08-14", Type: "Sale", from: "Meta asset sale" },
  { Amount: 315.75, Date: "2026-08-07", Type: "Referral", from: "Referral commission" },
  { Amount: 890, Date: "2026-07-30", Type: "Sale", from: "Meta asset sale" },
  { Amount: 210, Date: "2026-07-22", Type: "Referral", from: "Referral commission" },
  { Amount: 760.01, Date: "2026-07-15", Type: "Sale", from: "Meta asset sale" },
  { Amount: 155.5, Date: "2026-07-08", Type: "Referral", from: "Referral commission" },
];

const invoices = [
  { Amount: 1000, Date: "2026-08-18", Duration: 36, Qty: 2, SinglePackCost: 1000 },
  { Amount: 1000, Date: "2026-07-12", Duration: 36, Qty: 1, SinglePackCost: 1000 },
  { Amount: 1000, Date: "2026-06-10", Duration: 36, Qty: 3, SinglePackCost: 1000 },
  { Amount: 1000, Date: "2026-05-04", Duration: 36, Qty: 1, SinglePackCost: 1000 },
  { Amount: 1000, Date: "2026-04-02", Duration: 36, Qty: 2, SinglePackCost: 1000 },
  { Amount: 1000, Date: "2025-12-15", Duration: 36, Qty: 1, SinglePackCost: 1000 },
  { Amount: 1000, Date: "2025-09-20", Duration: 36, Qty: 4, SinglePackCost: 1000 },
  { Amount: 1000, Date: "2025-06-01", Duration: 36, Qty: 2, SinglePackCost: 1000 },
];

const transactionsSeed = [
  { Amount: 2400.123456, Status: "CONFIRMED", Date: "2026-09-12", Type: "DEPOSIT", TxHash: "0x8f2a91bc01de44aa" },
  { Amount: 680.5, Status: "PENDING", Date: "2026-09-10", Type: "WITHDRAWAL", TxHash: "0x1a6d70fe22bb991c" },
  { Amount: 1250, Status: "CONFIRMED", Date: "2026-09-05", Type: "DEPOSIT", TxHash: "0x4ce10a9233aa7712" },
  { Amount: 940.25, Status: "CONFIRMED", Date: "2026-08-28", Type: "DEPOSIT", TxHash: "0x7d3ebb1a44cc8820" },
  { Amount: 300, Status: "REJECTED", Date: "2026-08-20", Type: "WITHDRAWAL", TxHash: "0x2b11ce4055dd9931" },
  { Amount: 1500.01, Status: "CONFIRMED", Date: "2026-08-14", Type: "DEPOSIT", TxHash: "0x9e44aa1166ee0042" },
  { Amount: 220.75, Status: "PENDING", Date: "2026-08-08", Type: "WITHDRAWAL", TxHash: "0x3c55bb2277ff1153" },
  { Amount: 875, Status: "CONFIRMED", Date: "2026-08-01", Type: "DEPOSIT", TxHash: "0x5d66cc3388aa2264" },
  { Amount: 410, Status: "CONFIRMED", Date: "2026-07-24", Type: "DEPOSIT", TxHash: "0x6e77dd4499bb3375" },
  { Amount: 95.12345678, Status: "REJECTED", Date: "2026-07-18", Type: "WITHDRAWAL", TxHash: "0x7f88ee55aacc4486" },
  { Amount: 2000, Status: "CONFIRMED", Date: "2026-07-10", Type: "DEPOSIT", TxHash: "0x8099ff66bbdd5597" },
  { Amount: 560, Status: "CONFIRMED", Date: "2026-07-02", Type: "DEPOSIT", TxHash: "0x91aa0077ccee66a8" },
];

const stripeHistory = [
  { amount: 2400, currency: "USD", brand: "visa", last4: "4242", timestamp: 1757073600 },
  { amount: 1000, currency: "USD", brand: "mastercard", last4: "4444", timestamp: 1754395200 },
  { amount: 3000, currency: "USD", brand: "visa", last4: "4242", timestamp: 1751803200 },
  { amount: 1000, currency: "USD", brand: "amex", last4: "0005", timestamp: 1749211200 },
  { amount: 2000, currency: "USD", brand: "visa", last4: "4242", timestamp: 1746619200 },
  { amount: 1000, currency: "USD", brand: "mastercard", last4: "5555", timestamp: 1744027200 },
  { amount: 4000, currency: "USD", brand: "visa", last4: "4242", timestamp: 1741435200 },
  { amount: 1000, currency: "USD", brand: "discover", last4: "1117", timestamp: 1738843200 },
];

function getPage(config: any = {}) {
  const offset = Number(config?.params?.offset ?? 0);
  const fromOffset = Number.isFinite(offset) && offset > 0 ? Math.floor(offset / DEMO_PAGE_SIZE) + 1 : 1;
  const raw = Number(config?.params?.Page ?? config?.data?.Page ?? fromOffset);
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
}

function paginate<T>(items: T[], page: number, pageSize = DEMO_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    Number_of_Pages: totalPages,
    Page_size: pageSize,
    page: safePage,
  };
}

function normalizePath(url = "") {
  return url
    .split("?")[0]
    .replace(/^\//, "")
    .replace(/^api\/demo\//i, "")
    .toLowerCase();
}

export function demoResponse(url = "", config: any = {}) {
  const path = normalizePath(url);
  const page = getPage(config);

  if (path.includes("login") || path.includes("register")) {
    return demoUser;
  }

  if (path.includes("/me") || path.includes("profile")) {
    return { ...demoUser, Phone: "+1 555 010 2026", Country: "United States" };
  }

  if (path === "dashboard") {
    return dashboard;
  }

  if (path.includes("balance")) {
    return { balance: dashboard.Available_Balance };
  }

  if (path.includes("deposit")) {
    return { public_key: demoUser.WalletAddress };
  }

  if (path.includes("affiliate-list")) {
    const mapped = affiliates.map((item, index) => ({
      ...item,
      asset_value: 2400 + index * 850,
      meta_assets_owned: item.MetaAsset_Purchased,
      weekly_comission: item.Royalty,
      open_position_date: "2024-05-30",
      close_position_date: "2027-05-30",
      status: index % 3 === 0 ? "INACTIVE" : "ACTIVE",
    }));
    const status = config?.params?.status ?? "ALL";
    const filtered =
      status === "ALL" ? mapped : mapped.filter((item) => item.status === status);
    return filtered;
  }

  if (path.includes("affiliate-report")) {
    return {
      referrals: 12,
      is_eligable_for_reward: "Yes",
      meta_assets: 17,
      total_assets_value: 18400,
      reward_percentage: 4.8,
      sales_comission: 1260,
      last_month_rewards: 680,
    };
  }

  if (path.includes("leaderboard")) {
    const paged = paginate(leaderboard, page);
    return {
      Number_of_Pages: paged.Number_of_Pages,
      LeaderBoard: paged.items,
    };
  }

  if (path.includes("/pdf") || path.endsWith("pdf")) {
    return {
      success: true,
      message: "Use client-side invoice PDF generator in demo mode",
      demo: true,
    };
  }

  if (path.includes("invoice")) {
    const mapped = invoices.map((item, index) => ({
      id: `demo-invoice-${index + 1}`,
      createdAt: `${item.Date}T12:00:00Z`,
      updatedAt: `${item.Date}T12:00:00Z`,
      amount: item.Amount,
      date: item.Date,
      duration: item.Duration,
      meta_asset_price: item.SinglePackCost,
      quantity: item.Qty,
    }));
    return mapped;
  }

  if (path.includes("reward/list") || path.includes("revenueshistory")) {
    return rewards.map((item) => ({
      amount: Number(item.Amount.toFixed(8)),
      date: item.Date,
      type: item.Type,
      from: item.from,
    }));
  }

  if (path.includes("chart")) {
    return dashboard.return_stats_arrays;
  }

  if (path.includes("transactions")) {
    return transactionsSeed.map((item, index) => ({
      id: `demo-transaction-${index + 1}`,
      createdAt: `${item.Date}T12:00:00Z`,
      updatedAt: `${item.Date}T12:00:00Z`,
      hash: item.TxHash,
      from: item.Type === "DEPOSIT" ? "Demo treasury" : demoUser.WalletAddress,
      to: item.Type === "DEPOSIT" ? demoUser.WalletAddress : "Demo treasury",
      contract: "Demo contract",
      value: Number(item.Amount.toFixed(8)).toString(),
      token: "USDT",
      blockNumber: 120000 + index,
      type: item.Type,
      status: item.Status,
    }));
  }

  if (path.includes("stripe-history")) {
    return stripeHistory;
  }

  if (path.includes("rental-miners")) {
    const now = Math.floor(Date.now() / 1000);
    return Array.from({ length: 24 }, (_, index) => {
      const ts = now - (23 - index) * 3600;
      return {
        ts,
        val: {
          "A-timeStamp": ts,
          "B-date": new Date(ts * 1000).toISOString().slice(0, 10),
          "C-time": new Date(ts * 1000).toISOString().slice(11, 19),
          "D-minerId": "demo-miner",
          "E-actDateTime": new Date(ts * 1000).toISOString(),
          "F-buyerId": "demo-buyer",
          "G-buyerPW": "demo",
          "H-sellerId": "demo-seller",
          "I-officeType": "Demo Office",
          "L-trxNumber": 1280 + index * 12,
          "M-dayTransNumber": 164 + index,
          "N-hourTransNumber": 20 + (index % 8),
          "O-trxToken": "DEMO",
          "P-totalSale": 18400 + index * 120,
          "Q-revIncome": 3260 + index * 18,
          "R-daySale": 740 + index * 8,
          "S-dayRevIncome": 126 + index * 2,
          "T-hourSale": 42 + (index % 5),
          "U-hourRevIncome": 8 + (index % 3),
          "V-trxSec": Number((2.4 + (index % 5) * 0.2).toFixed(2)),
          "Z-mAh": 400 + index * 3,
        },
      };
    });
  }

  if (path.includes("user-meta-asset")) {
    return {
      id: "demo-position",
      createdAt: "2024-05-30",
      updatedAt: "2026-09-05",
      weekly_roi: 3.8,
      referrer_roi: 1.2,
      contract_start_date: dashboard.Contract_Start_Date,
      contract_expiry_date: dashboard.Contract_Expiry_Date,
      last_reward_date: "2026-08-28",
      owned_offices: dashboard.Owned_Lands,
      usdt_earned_untill_now: dashboard.ROI_Until_Now,
      usdt_earned_last_month: dashboard.ROI_Last_Month,
      minted_offices_in_usd: dashboard.Company_Lands_Value,
      minted_offices: dashboard.Minted_Lands,
      owned_offices_in_usd: dashboard.Lands_Value,
      equity_percentage: dashboard.Equity_Percentage,
      received_rewards: 1260,
    };
  }

  if (path === "meta-assets" || path.endsWith("/meta-assets")) {
    return {
      id: "demo-package",
      available_inventory: 480,
      taken_inventory: 1520,
      duration: 156,
      price: 1000,
      referrer_roi: 1.2,
      weekly_roi: 3.8,
    };
  }

  if (path.includes("users/kyc") || path.includes("kyc")) {
    return {
      status: "APPROVED",
      message: "Demo KYC approved",
      submitted_at: "2026-08-01T10:00:00Z",
    };
  }

  if (path.includes("stripe")) {
    return { clientSecret: "demo_client_secret" };
  }

  if (path.includes("refresh-token")) {
    return {
      accessToken: demoUser.Auth_Token,
      refreshToken: demoUser.refresh_token,
    };
  }

  if (path.includes("withdraw")) {
    return {
      success: true,
      message: "Withdrawal submitted (demo)",
      data: {
        amount: config?.data?.amount ?? 0,
        address: config?.data?.address ?? "",
        network: config?.data?.Network ?? "BSC",
      },
    };
  }

  return { success: true, message: "Demo action completed", data: dashboard };
}
