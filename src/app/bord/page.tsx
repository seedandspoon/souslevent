"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Card } from "@/components/ui/Card";
import { QuickCardView } from "@/components/bord/QuickCardView";
import { CATEGORY_META, CATEGORY_ORDER } from "@/lib/quickCardCategories";
import { getQuickCardsByCategorie, searchQuickCards } from "@/content/quickcards";

export default function BordPage() {
  const [query, setQuery] = useState("");
  const resultats = query.trim() ? searchQuickCards(query) : [];

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-6">
      <h1 className="text-2xl font-semibold text-ink mb-1">Je suis à bord</h1>
      <p className="text-sm text-ink-soft mb-5">Accès rapide, très peu de texte.</p>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une fiche, un mot..."
          className="w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-brand-300"
        />
      </div>

      {query.trim() ? (
        <div className="flex flex-col gap-4">
          {resultats.length === 0 && <p className="text-sm text-ink-soft">Aucun résultat pour « {query} ».</p>}
          {resultats.map((card) => (
            <QuickCardView key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const count = cat === "noeuds" ? 5 : getQuickCardsByCategorie(cat).length;
            const disponible = count > 0;
            const href = cat === "noeuds" ? "/noeuds" : `/bord/${cat}`;

            const content = (
              <Card className={clsx("p-4 h-full flex flex-col gap-2.5", !disponible && "opacity-45")}>
                <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center">
                  <Icon size={17} className="text-brand-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-ink">{meta.label}</span>
                  {disponible && <ChevronRight size={14} className="text-ink-soft" />}
                </div>
              </Card>
            );

            return disponible ? (
              <Link key={cat} href={href}>
                {content}
              </Link>
            ) : (
              <div key={cat}>{content}</div>
            );
          })}
        </div>
      )}
    </main>
  );
}
