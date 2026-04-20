import { Check } from "lucide-react";

interface PricingCardTypes{
  plan: {
    title: string;
    price: string;
    suffix: string;
    description: string;
    badge: string;
    icon: React.ElementType;
    features: string[];
    buttonText: string;
    highlight: boolean;
  };
}

export function PricingCard({
  plan,
}: PricingCardTypes) {
  const Icon = plan.icon;

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-6 shadow-lg transition sm:p-8 ${
        plan.highlight
          ? "border-violet-200 bg-linear-to-br from-slate-950 via-slate-900 to-violet-950 text-white shadow-violet-200/40"
          : "border-slate-200 bg-white text-slate-900 shadow-slate-200/70"
      }`}
    >
      <div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
          plan.highlight
            ? "bg-white/10 text-violet-100 ring-1 ring-white/10"
            : "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
        }`}
      >
        <Icon className="h-4 w-4" />
        {plan.badge}
      </div>

      <h2 className={`mt-6 text-2xl font-bold sm:text-3xl ${plan.highlight ? "text-white" : "text-slate-900"}`}>{plan.title}</h2>
      <p className={`mt-3 text-sm leading-7 sm:text-base ${plan.highlight ? "text-slate-300" : "text-slate-600"}`}>
        {plan.description}
      </p>

      <div className="mt-8 flex items-end gap-2">
        <span className={`text-4xl font-black tracking-tight sm:text-5xl ${plan.highlight ? "text-white" : "text-slate-950"}`}>{plan.price}</span>
        <span className={`pb-1 text-sm font-medium sm:text-base ${plan.highlight ? "text-slate-300" : "text-slate-500"}`}>
          {plan.suffix}
        </span>
      </div>

      <ul className="mt-8 space-y-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                plan.highlight ? "bg-white/10 text-white" : "bg-violet-50 text-violet-700"
              }`}
            >
              <Check className="h-4 w-4" />
            </span>
            <span className={`text-sm leading-7 sm:text-base ${plan.highlight ? "text-slate-200" : "text-slate-700"}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button style={{height: '2rem'}}
        className={`mt-8 cursor-pointer w-full h-10 flex gap-1 items-center text-center justify-center rounded-2xl text-sm font-semibold transition sm:text-base ${
          plan.highlight
            ? "bg-linear-to-r from-blue-600 to-violet-600 text-white"
            : "bg-linear-to-r from-blue-600 to-violet-600 text-white"
            
        }`
    }
      >
        {plan.buttonText}
      </button>
    </article>
  );
}