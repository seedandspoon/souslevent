"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, GraduationCap, Anchor, ListChecks, CircleUser } from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/apprendre", label: "Apprendre", icon: GraduationCap },
  { href: "/bord", label: "À bord", icon: Anchor },
  { href: "/quiz", label: "Quiz", icon: ListChecks },
  { href: "/profil", label: "Profil", icon: CircleUser },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-border pb-[env(safe-area-inset-bottom)]"
      aria-label="Navigation principale"
    >
      <ul className="mx-auto max-w-lg grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-[0.6875rem] font-medium transition-colors",
                  active ? "text-brand-500" : "text-ink-soft"
                )}
              >
                <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
