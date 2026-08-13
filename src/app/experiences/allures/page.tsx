"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AlluresExperience } from "@/components/experiences/AlluresExperience";

export default function AlluresExperiencePage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-1">
        <Link href="/experiences" className="text-ink-soft hover:text-ink">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="text-xl font-semibold text-ink">Les allures</h1>
      </div>
      <Link href="/apprendre/l1-les-allures" className="text-sm text-brand-500 font-medium ml-9 inline-block mb-4">
        ← Revoir la leçon
      </Link>
      <AlluresExperience />
    </main>
  );
}
