import {
  ArrowRight,
  Download,
  Play,
  Shield,
  Sparkles,
  Upload,
  FileText,
  Users,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Bank Statement Converter",
    description: "Automatically convert bank PDFs into Tally-ready structured files.",
  },
  {
    icon: Download,
    title: "Multiple Export Formats",
    description: "Download your reports in XML, CSV, and Excel formats instantly.",
  },
  {
    icon: Sparkles,
    title: "Accurate Transaction Parsing",
    description: "Algorithm extraction with clean, organized, accountant-friendly data.",
  },
  {
    icon: Users,
    title: "Built for Finance Teams",
    description: "Designed for accountants, CA firms, finance teams, and Tally workflows.",
  },
];

const steps = [
  {
    number: "1",
    icon: Upload,
    title: "Upload Bank Statement PDF",
    description: "Drag and drop your bank-generated PDF securely into the platform.",
  },
  {
    number: "2",
    icon: Sparkles,
    title: "Bankly Processes Transactions",
    description: "Our Algorithm extracts, cleans, and structures transaction data automatically.",
  },
  {
    number: "3",
    icon: Download,
    title: "Download XML / CSV / Excel",
    description: "Get your Tally-ready files instantly and continue your accounting workflow.",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <div className="mb-4 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.12),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),_transparent_24%)]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24 xl:gap-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <Shield className="h-4 w-4" />
            Bank-grade encryption
          </div>

          <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
            Convert Bank Statements to Tally in Seconds
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
            Upload your bank statement PDF and instantly generate Tally-ready XML, CSV, and Excel files for fast, reliable accounting automation.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-violet-500/20 transition hover:scale-[1.01] sm:px-7">
              Start Converting Statements
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-900 transition hover:bg-slate-50">
              <Play className="h-5 w-5" />
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-200/40 via-violet-200/20 to-transparent blur-3xl" />
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70 sm:p-4">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80"
              alt="Finance professional working on accounting workflow"
              className="h-[260px] w-full rounded-[1.5rem] object-cover sm:h-[360px] lg:h-[540px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="about" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Built for Finance Professionals"
          description="Powerful features designed for accountants, CA firms, and businesses using Tally ERP."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-[2rem] border border-slate-200 bg-slate-50/70 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/70 sm:p-8"
              >
                <div className="flex h-18 w-18 items-center justify-center rounded-[1.5rem] bg-blue-100 text-blue-600">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-base leading-8 text-slate-600">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section id="tutorial" className="bg-slate-100 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How It Works"
          description="Three simple steps to convert your bank statements into clean Tally-ready files."
        />

        <div className="relative mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <div className="absolute left-1/2 top-14 hidden h-0.5 w-[62%] -translate-x-1/2 bg-gradient-to-r from-blue-200 via-violet-300 to-blue-200 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                className={cn(
                  "relative rounded-[2rem] bg-white p-8 text-center shadow-lg shadow-slate-200/70 ring-1 ring-slate-200",
                  index === 1 && "lg:translate-y-4"
                )}
              >
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] bg-slate-50 text-blue-600 shadow-inner">
                  <Icon className="h-10 w-10" />
                </div>

                <div className="mx-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-500/20">
                  {step.number}
                </div>

                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">{step.title}</h3>
                <p className="mt-3 text-base leading-8 text-slate-600">{step.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section id="demo" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-6 py-10 text-white shadow-2xl sm:px-10 sm:py-14 lg:px-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur">
                Ready to streamline accounting?
              </div>
              <h3 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Start converting statements with a clean, fast, accountant-first workflow.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Reduce manual work, improve data consistency, and export in the formats your team already uses.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.02]">
                Request Demo
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10">
                See Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}