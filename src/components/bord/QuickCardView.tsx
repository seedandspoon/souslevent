import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { QuickCard } from "@/content/types";

export function QuickCardView({ card }: { card: QuickCard }) {
  return (
    <Card className="p-5">
      <h2 className="text-base font-bold text-ink uppercase tracking-wide mb-4">{card.titre}</h2>
      <div className="flex flex-col gap-4">
        {card.sections.map((section, i) => (
          <div key={i}>
            <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-1.5">{section.titre}</p>
            <ul className="flex flex-col gap-1">
              {section.items.map((item, j) => (
                <li key={j} className="text-sm text-ink leading-snug flex gap-2">
                  <span className="text-brand-300">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {card.alerte && (
        <div className="mt-4 flex gap-2 items-start rounded-lg bg-danger-soft px-3 py-2.5">
          <AlertTriangle size={15} className="text-danger shrink-0 mt-0.5" />
          <p className="text-xs text-ink leading-snug">{card.alerte}</p>
        </div>
      )}
    </Card>
  );
}
