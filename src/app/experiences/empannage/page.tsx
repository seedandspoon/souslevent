"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { EmpannageExperience } from "@/components/experiences/EmpannageExperience";

export default function EmpannageExperiencePage() {
  return (
    <main className="mx-auto max-w-lg px-4 pt-5 pb-10">
      <div className="flex items-center gap-3 mb-5">
        <Link href="/experiences" className="text-ink-soft hover:text-ink">
          <ChevronLeft size={22} />
        </Link>
        <h1 className="text-xl font-semibold text-ink">L&apos;empannage</h1>
      </div>
      <EmpannageExperience />
    </main>
  );
}
