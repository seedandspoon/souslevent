"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { KnotPrototypeBowline } from "@/components/experiences/KnotPrototypeBowline";

export default function KnotPrototypePage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-4">
        <Link href="/experiences" className="text-ink-soft hover:text-ink">
          <ChevronLeft size={22} />
        </Link>
      </div>

      <Badge tone="accent" className="mb-2">
        Prototype isolé
      </Badge>
      <h1 className="text-xl font-semibold text-ink mb-1">Nœud de chaise — cordage continu</h1>
      <p className="text-sm text-ink-soft mb-5">
        Le même cordage se noue réellement sous tes yeux, plutôt qu&apos;une suite d&apos;images qui se remplacent.
        Approche inspirée d&apos;Animated Knots by Grog.
      </p>

      <KnotPrototypeBowline />
    </main>
  );
}
