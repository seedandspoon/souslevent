import { AlertTriangle, Lightbulb } from "lucide-react";
import type { BlockType } from "@/content/types";
import { Illustration } from "@/components/illustrations/registry";

export function BlockRenderer({ bloc }: { bloc: BlockType }) {
  switch (bloc.type) {
    case "texte":
      return <p className="text-[0.9375rem] leading-relaxed text-ink">{bloc.contenu}</p>;

    case "schema":
      return (
        <figure>
          <Illustration id={bloc.illustration} />
          {bloc.legende && (
            <figcaption className="text-center text-xs text-ink-soft mt-2">{bloc.legende}</figcaption>
          )}
        </figure>
      );

    case "etapes":
      return (
        <div>
          {bloc.titre && <p className="text-sm font-semibold text-ink mb-3">{bloc.titre}</p>}
          <ol className="flex flex-col gap-3">
            {bloc.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-ink pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "erreurs":
      return (
        <div className="rounded-xl bg-danger-soft p-4">
          <div className="flex items-center gap-2 text-danger font-semibold text-sm mb-2.5">
            <AlertTriangle size={16} />
            Erreurs fréquentes
          </div>
          <ul className="flex flex-col gap-2">
            {bloc.items.map((item, i) => (
              <li key={i} className="text-sm text-ink leading-relaxed flex gap-2">
                <span className="text-danger">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "astuce":
      return (
        <div className="rounded-xl bg-accent-soft p-4 flex gap-3">
          <Lightbulb size={18} className="text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-ink leading-relaxed">{bloc.contenu}</p>
        </div>
      );

    default:
      return null;
  }
}
