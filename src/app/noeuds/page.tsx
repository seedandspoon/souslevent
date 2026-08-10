"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { knots } from "@/content/knots";

const DIFFICULTE_LABEL: Record<number, string> = { 1: "Facile", 2: "Intermédiaire", 3: "Avancé" };

export default function NoeudsPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-6">
      <h1 className="text-2xl font-semibold text-ink mb-1">Nœuds</h1>
      <p className="text-sm text-ink-soft mb-6">Cinq nœuds essentiels, à connaître par cœur.</p>

      <div className="flex flex-col gap-2.5">
        {knots.map((knot) => (
          <Link key={knot.id} href={`/noeuds/${knot.id}`}>
            <Card className="p-4 flex items-center gap-3 hover:border-brand-300 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-ink text-sm">{knot.nom}</p>
                  <Badge tone="neutral">{DIFFICULTE_LABEL[knot.difficulte]}</Badge>
                </div>
                <p className="text-xs text-ink-soft truncate">{knot.usage}</p>
              </div>
              <ChevronRight size={16} className="text-ink-soft shrink-0" />
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
