import { CTASection, FeaturesSection, HeroSection, HowItWorksSection } from "@/components/main/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </main>
  );
}
