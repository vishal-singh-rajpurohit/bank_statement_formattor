'use client'
import { Coins, Crown } from "lucide-react";
import {PricingCard} from "@/components/ui/Cards"


const pricingPlans = [
  {
    title: "Credit Pack",
    price: "₹1",
    suffix: "/ credit",
    description: "Pay only for what you use. Best for occasional conversions.",
    badge: "Flexible",
    icon: Coins,
    features: [
      "₹1 for each credit",
      "Minimum purchase 10 credits",
      "Start from just ₹10",
      "Great for low-volume usage",
    ],
    buttonText: "Buy Credits",
    highlight: false,
  },
  {
    title: "Unlimited Monthly",
    price: "₹200",
    suffix: "/ month",
    description: "Unlimited usage for teams and frequent users who want full access.",
    badge: "Best Value",
    icon: Crown,
    features: [
      "Unlimited credits for 1 month",
      "No usage limit",
      "Best for regular users",
      "Simple flat monthly pricing",
    ],
    buttonText: "Get Unlimited Access",
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-linear-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Simple pricing for every workflow
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
            Choose flexible pay-per-credit pricing or unlock unlimited usage with one monthly plan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} plan={plan} />
          ))}
        </div>
      </section>
    </main>
  );
}
