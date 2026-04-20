import React from "react";
import { ShieldCheck, Sparkles, FileText, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const highlights = [
  {
    icon: FileText,
    title: "Smart statement conversion",
    description:
      "Bankly helps users convert bank statements into structured files that are easier to review, process, and use in accounting workflows.",
  },
  {
    icon: Sparkles,
    title: "Built for simplicity",
    description:
      "The platform is designed to reduce repetitive manual work and make financial data handling faster and cleaner.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    description:
      "We focus on a trustworthy experience with careful handling of uploaded documents and a clean product flow.",
  },
  {
    icon: Users,
    title: "Made for professionals",
    description:
      "Whether you are an accountant, a CA firm, or a business owner, Bankly is built to support practical daily usage.",
  },
];

function AboutCard({
  item,
}: {
  item: {
    icon: React.ElementType;
    title: string;
    description: string;
  };
}) {
  const Icon = item.icon;

  return (
    <article className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-700 ring-1 ring-violet-100">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-950 sm:text-2xl">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.description}</p>
    </article>
  );
}

export default function Pageg() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-linear-to-b from-slate-50 to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
          <div className="grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-16">
            <div>
              <div className="inline-flex rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 ring-1 ring-violet-100">
                About Bankly
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                A simpler way to work with bank statements
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Bankly is designed to make statement processing easier for finance professionals. Instead of spending time on repetitive manual work, users can upload statements and move toward structured, usable output in a faster and more reliable way.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Our goal is to create a product experience that feels practical, modern, and easy to trust. From cleaner workflows to accessible pricing, Bankly focuses on helping businesses and professionals save time while staying organized.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg sm:text-base">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </button>
                <Link href={'/contact'} >
                  <button className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 sm:text-base">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>

            <div className="rounded-4xl bg-linear-to-br from-slate-950 via-slate-900 to-violet-950 p-6 text-white sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-violet-200">
                Our vision
              </p>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Make accounting workflows faster, cleaner, and easier to manage.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                We believe good financial tools should save effort, reduce friction, and help users move from raw data to useful output without unnecessary complexity.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">Fast workflow</p>
                  <p className="mt-1 text-sm leading-7 text-slate-300">Less manual effort and quicker turnaround for routine statement tasks.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">Professional focus</p>
                  <p className="mt-1 text-sm leading-7 text-slate-300">Built around the practical needs of accountants, firms, and businesses.</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-semibold text-white">Simple experience</p>
                  <p className="mt-1 text-sm leading-7 text-slate-300">Clear design, focused tools, and features that support everyday work.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <AboutCard key={item.title} item={item} />
          ))}
        </div> */}
      </section>
    </main>
  );
}
