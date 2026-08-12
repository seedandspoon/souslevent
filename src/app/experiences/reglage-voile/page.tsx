"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReglageVoileExperience } from "@/components/experiences/ReglageVoileExperience";

export default function ReglageVoilePage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/experiences" className="text-ink-soft hover:text-ink">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="text-xl font-semibold text-ink">Réglage d&apos;une voile</h1>
      </div>
      <ReglageVoileExperience />
    </main>
  );
}
