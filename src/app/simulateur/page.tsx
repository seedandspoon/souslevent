"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { WindSimulator } from "@/components/illustrations/WindSimulator";

export default function SimulateurPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/" className="text-ink-soft hover:text-ink shrink-0">
          <ChevronLeft size={22} />
        </Link>
        <div>
          <h1 className="text-xl font-semibold text-ink">Simulateur — Vent &amp; allures</h1>
          <p className="text-xs text-ink-soft">Manipulation libre, sans leçon</p>
        </div>
      </div>

      <Card className="p-4">
        <WindSimulator />
      </Card>

      <p className="text-sm text-ink-soft mt-4 leading-relaxed">
        Le vent souffle toujours depuis le haut du schéma. Fais glisser le bateau autour du cercle
        pour explorer les allures et repérer la zone interdite (le lit du vent), où les voiles ne
        peuvent pas fonctionner.
      </p>
    </main>
  );
}
