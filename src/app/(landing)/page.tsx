"use client";
import Hero from "@/components/landing/hero/hero";
import Features from "@/components/landing/features/features";
import Cta from "@/components/landing/cta/cta";
import Footer from "@/components/landing/footer/footer";

export default function Home() {
  return (
    <div className="min-h-screen text-text-primary relative">
      <Hero />
      <Features />
      <Cta />
      <Footer />
    </div>
  );
}
