"use client";

import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const path = usePathname();
  return (
    <nav className="header-nav">
      <a href="/#community">Community</a>
      <a href="/about" aria-current={path === "/about" ? "page" : undefined}>
        About
      </a>
    </nav>
  );
}
