import type { SkillScore } from "@/lib/progress";

const COLOR_VAR: Record<SkillScore["tag"], string> = {
  vent: "var(--color-skill-vent)",
  manoeuvres: "var(--color-skill-manoeuvres)",
  navigation: "var(--color-skill-navigation)",
  securite: "var(--color-skill-securite)",
  meteo: "var(--color-skill-meteo)",
};

export function SkillBar({ skill }: { skill: SkillScore }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg w-6 text-center shrink-0" aria-hidden>
        {skill.emoji}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-sm font-medium text-ink">{skill.label}</span>
          <span className="text-sm text-ink-soft tabular-nums">{skill.score}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${skill.score}%`, backgroundColor: COLOR_VAR[skill.tag] }}
          />
        </div>
      </div>
    </div>
  );
}
