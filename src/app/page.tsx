import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Platforms from "@/components/Platforms";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Platforms />
        <Features />
        <HowItWorks />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
