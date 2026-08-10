"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { QuickCardView } from "@/components/bord/QuickCardView";
import { CATEGORY_META } from "@/lib/quickCardCategories";
import { getQuickCardsByCategorie } from "@/content/quickcards";
import type { QuickCardCategorie } from "@/content/types";

export default function BordCategoriePage() {
  const params = useParams<{ categorie: string }>();
  const categorie = params.categorie as QuickCardCategorie;
  const meta = CATEGORY_META[categorie];
  if (!meta) notFound();

  const cards = getQuickCardsByCategorie(categorie);

  return (
    <main className="mx-auto max-w-lg px-4 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/bord" className="text-ink-soft hover:text-ink">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="text-xl font-semibold text-ink">{meta.label}</h1>
      </div>

      {cards.length === 0 ? (
        <p className="text-sm text-ink-soft">Bientôt disponible.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <QuickCardView key={card.id} card={card} />
          ))}
        </div>
      )}
    </main>
  );
}
