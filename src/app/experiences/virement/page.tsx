"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { VirementExperience } from "@/components/experiences/VirementExperience";

export default function VirementExperiencePage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-1">
        <Link href="/experiences" className="text-ink-soft hover:text-ink">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="text-xl font-semibold text-ink">Le virement de bord</h1>
      </div>
      <Link href="/apprendre/l3-virement-de-bord" className="text-sm text-brand-500 font-medium ml-9 inline-block mb-4">
        ← Revoir la leçon
      </Link>
      <VirementExperience />
    </main>
  );
}
