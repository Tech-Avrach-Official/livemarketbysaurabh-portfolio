"use client";

import { useReveal } from "@/lib/useReveal";

/* The only reason the page needed to be a client component. Isolated here so
   Hero, About, Fit, Faq and Footer — none of which are interactive — stay on
   the server and ship no JavaScript. */
export default function Reveal() {
  useReveal();
  return null;
}
