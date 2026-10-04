import Reveal from "@/components/Reveal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarketStrip from "@/components/MarketStrip";
import Community from "@/components/Community";
import MarketSnapshot from "@/components/MarketSnapshot";
import Voices from "@/components/Voices";
import About from "@/components/About";
import Fit from "@/components/Fit";
import Feed from "@/components/Feed";
import Channels from "@/components/Channels";
import Faq from "@/components/Faq";
import CloseCta from "@/components/CloseCta";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Reveal />
      <Header />
      <main id="top">
        <Hero />
        <MarketStrip />
        <About />
        <Community />
        <MarketSnapshot />
        <Voices />
        <Fit />
        <Feed />
        <Channels />
        <Faq />
        <CloseCta />
      </main>
      <Footer />
    </>
  );
}
