"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { glossary, searchGlossary, getGlossaryTerm } from "@/content/glossary";

export default function GlossairePage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const resultats = useMemo(() => {
    const filtered = query.trim() ? searchGlossary(query) : glossary;
    return [...filtered].sort((a, b) => a.terme.localeCompare(b.terme, "fr"));
  }, [query]);

  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-6">
      <h1 className="text-2xl font-semibold text-ink mb-1">Glossaire</h1>
      <p className="text-sm text-ink-soft mb-5">{glossary.length} termes du vocabulaire marin.</p>

      <div className="relative mb-5">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un terme..."
          className="w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus:border-brand-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        {resultats.map((term) => {
          const ouvert = openId === term.id;
          return (
            <Card key={term.id} className="overflow-hidden">
              <button
                onClick={() => setOpenId(ouvert ? null : term.id)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="font-medium text-ink text-sm">{term.terme}</span>
                <ChevronDown size={16} className={clsx("text-ink-soft transition-transform", ouvert && "rotate-180")} />
              </button>
              {ouvert && (
                <div className="px-4 pb-4">
                  <Badge tone="brand" className="mb-2">{term.categorie}</Badge>
                  <p className="text-sm text-ink leading-relaxed mb-3">{term.definition}</p>
                  {term.termesAssociesIds.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {term.termesAssociesIds.map((id) => {
                        const associe = getGlossaryTerm(id);
                        if (!associe) return null;
                        return (
                          <button
                            key={id}
                            onClick={() => setOpenId(id)}
                            className="text-xs rounded-full bg-surface-2 text-ink-soft px-2.5 py-1 hover:bg-brand-100"
                          >
                            {associe.terme}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {term.lessonId && (
                    <Link href={`/apprendre/${term.lessonId}`} className="text-sm font-medium text-brand-500">
                      Apprendre cette notion →
                    </Link>
                  )}
                </div>
              )}
            </Card>
          );
        })}
        {resultats.length === 0 && <p className="text-sm text-ink-soft">Aucun résultat pour « {query} ».</p>}
      </div>
    </main>
  );
}
