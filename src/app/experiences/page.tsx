"use client";

import Link from "next/link";
import { ChevronRight, Compass, Wind, Link2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const PILOTES = [
  {
    href: "/experiences/allures",
    icon: Compass,
    titre: "Les allures",
    description: "Fais tourner le bateau autour du vent et regarde la voile réagir.",
  },
  {
    href: "/experiences/reglage-voile",
    icon: Wind,
    titre: "Réglage d'une voile",
    description: "Borde et choque l'écoute jusqu'à trouver le bon réglage.",
  },
  {
    href: "/experiences/noeud-chaise",
    icon: Link2,
    titre: "Le nœud de chaise",
    description: "Un schéma clair à chaque étape, du début au nœud serré.",
  },
];

export default function ExperiencesPage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-8 pb-6">
      <Badge tone="accent" className="mb-3">
        Nouvelle direction — pilote
      </Badge>
      <h1 className="text-2xl font-semibold text-ink mb-1">Apprendre en manipulant</h1>
      <p className="text-sm text-ink-soft mb-6">
        Trois expériences pour tester une autre façon d&apos;apprendre la voile : en faisant, pas seulement en lisant.
      </p>

      <div className="flex flex-col gap-3">
        {PILOTES.map((p) => (
          <Link key={p.href} href={p.href}>
            <Card className="p-4 flex items-center gap-3 hover:border-brand-300 transition-colors">
              <div className="w-11 h-11 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <p.icon size={20} className="text-brand-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-ink text-sm">{p.titre}</p>
                <p className="text-xs text-ink-soft mt-0.5">{p.description}</p>
              </div>
              <ChevronRight size={16} className="text-ink-soft shrink-0" />
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
