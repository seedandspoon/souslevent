import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import clsx from "clsx";

type Tone = "success" | "warning" | "error" | "neutral";

const TONE_STYLES: Record<Tone, { bg: string; text: string; icon: typeof Info }> = {
  success: { bg: "bg-success-soft", text: "text-success", icon: CheckCircle2 },
  warning: { bg: "bg-accent-soft", text: "text-accent", icon: AlertTriangle },
  error: { bg: "bg-danger-soft", text: "text-danger", icon: XCircle },
  neutral: { bg: "bg-surface-2", text: "text-ink-soft", icon: Info },
};

export function FeedbackBanner({
  tone,
  titre,
  detail,
}: {
  tone: Tone;
  titre: string;
  detail?: string;
}) {
  const style = TONE_STYLES[tone];
  const Icon = style.icon;
  return (
    <div className={clsx("rounded-xl p-4 flex gap-3", style.bg)}>
      <Icon size={20} className={clsx(style.text, "shrink-0 mt-0.5")} />
      <div>
        <p className={clsx("font-semibold text-sm", style.text)}>{titre}</p>
        {detail && <p className="text-sm text-ink leading-relaxed mt-1">{detail}</p>}
      </div>
    </div>
  );
}
