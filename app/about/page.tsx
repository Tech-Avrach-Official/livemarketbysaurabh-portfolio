import type { Metadata } from "next";
import AboutStory from "@/components/AboutStory";

export const metadata: Metadata = {
  title: "About — LiveMarketBySaurabh",
  description:
    "Saurabh Sharma has traded commodities for over eleven years. This is why he runs a community instead of selling tips.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutStory />;
}
