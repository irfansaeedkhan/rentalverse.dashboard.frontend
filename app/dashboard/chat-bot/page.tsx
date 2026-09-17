"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const starterReplies: Record<string, string> = {
  balance:
    "Available balance is shown on the dashboard cards. Use Deposit to copy a wallet address or Withdraw to submit a demo withdrawal.",
  withdraw:
    "Open Withdraw, choose a network, enter an address and amount, confirm the checkbox, then submit. Demo mode always returns success feedback.",
  rewards:
    "Open Rewards List from the balance card. Pagination shows five rewards per page with Sale and Referral types.",
  affiliates:
    "Affiliates lists referrals with asset value and weekly commission. Use the status filter for Active or Inactive members.",
  default:
    "I can help with balance, withdraw, rewards, affiliates, leaderboard, invoices, and rental miners in this demo.",
};

function replyFor(input: string) {
  const text = input.toLowerCase();
  if (text.includes("withdraw")) return starterReplies.withdraw;
  if (text.includes("reward")) return starterReplies.rewards;
  if (text.includes("affiliate") || text.includes("referral"))
    return starterReplies.affiliates;
  if (text.includes("balance") || text.includes("deposit"))
    return starterReplies.balance;
  return starterReplies.default;
}

export default function ChatBotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi — this is the demo assistant. Ask about balance, withdrawals, rewards, or affiliates.",
    },
  ]);
  const [draft, setDraft] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) {
      toast.error("Enter a message first");
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text,
    };
    const botMessage: ChatMessage = {
      id: Date.now() + 1,
      role: "bot",
      text: replyFor(text),
    };

    setMessages((current) => [...current, userMessage, botMessage]);
    setDraft("");
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-xl bg-primary-dark p-6 text-white">
        <p className="text-sm text-white/60">Support</p>
        <h1 className="mt-1 text-2xl font-semibold">Chat bot</h1>
        <p className="mt-2 text-sm text-white/70">
          Local demo replies only — no external chatbot provider is connected.
        </p>
      </div>

      <div className="flex min-h-[420px] flex-col rounded-xl bg-primary-dark p-4 text-white md:p-6">
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[90%] rounded-lg px-4 py-3 text-sm ${
                message.role === "bot"
                  ? "bg-primary-light self-start"
                  : "self-end bg-primary"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-4 flex gap-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about withdraw, rewards, affiliates..."
            className="min-w-0 flex-1 rounded-lg border border-[#1414141F] bg-primary-light px-4 py-3 text-sm text-white outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-primary-light px-4 py-3 text-sm text-white"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
