"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, Hand, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Illustration } from "@/components/illustrations/registry";
import { getKnot } from "@/content/knots";
import { KNOT_EXPERIENCE_LINKS } from "@/lib/experienceLinks";

const DIFFICULTE_LABEL: Record<number, string> = { 1: "Facile", 2: "Intermédiaire", 3: "Avancé" };

export default function KnotPage() {
  const params = useParams<{ knotId: string }>();
  const knot = getKnot(params.knotId);
  if (!knot) notFound();

  return (
    <main className="mx-auto max-w-lg px-4 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/noeuds" className="text-ink-soft hover:text-ink">
          <ChevronLeft size={22} />
        </Link>
      </div>

      <div className="px-0 mb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <h1 className="text-2xl font-semibold text-ink">{knot.nom}</h1>
          <Badge tone="neutral">{DIFFICULTE_LABEL[knot.difficulte]}</Badge>
        </div>
        {knot.nomAnglais && <p className="text-sm text-ink-soft italic">{knot.nomAnglais}</p>}
      </div>

      <Illustration id={knot.illustration} />

      {KNOT_EXPERIENCE_LINKS[knot.id] && (
        <Link href={KNOT_EXPERIENCE_LINKS[knot.id].href}>
          <div className="rounded-xl bg-brand-700 p-4 flex items-center gap-3 hover:opacity-95 transition-opacity mt-4">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <Hand size={16} className="text-white" />
            </div>
            <p className="text-sm font-medium text-white flex-1">{KNOT_EXPERIENCE_LINKS[knot.id].label}</p>
            <ArrowRight size={16} className="text-white/70 shrink-0" />
          </div>
        </Link>
      )}

      <Card className="p-5 mt-5">
        <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-2">Utilité</p>
        <p className="text-[0.9375rem] text-ink leading-relaxed">{knot.usage}</p>
      </Card>

      <Card className="p-5 mt-4">
        <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-3">Étapes</p>
        <ol className="flex flex-col gap-3">
          {knot.etapes.map((etape, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-[0.9375rem] leading-relaxed text-ink pt-0.5">{etape}</span>
            </li>
          ))}
        </ol>
      </Card>

      <div className="rounded-xl bg-danger-soft p-4 mt-4">
        <div className="flex items-center gap-2 text-danger font-semibold text-sm mb-2.5">
          <AlertTriangle size={16} />
          Erreurs fréquentes
        </div>
        <ul className="flex flex-col gap-2">
          {knot.erreurs.map((erreur, i) => (
            <li key={i} className="text-sm text-ink leading-relaxed flex gap-2">
              <span className="text-danger">•</span>
              {erreur}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
