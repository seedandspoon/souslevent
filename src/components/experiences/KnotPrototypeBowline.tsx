"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Repeat, Check } from "lucide-react";
import clsx from "clsx";
import { DragSlider } from "@/components/interactive/DragSlider";
import { FeedbackBanner } from "@/components/interactive/FeedbackBanner";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { frameAtProgress, frameAtStep, framePath, frameTip, TOTAL_STEPS } from "@/lib/knotRig";

// Prototype isolé — voir .claude/skills/nautical-pedagogical-visuals/SKILL.md.
// Référence pédagogique : Animated Knots by Grog (principes analysés, pas
// copiés — voir la conversation). Le cordage est UN SEUL tracé continu qui
// se déforme réellement d'un pas à l'autre, jamais une suite d'images.

const DORMANT_D = "M150,20 L150,140";
const DORMANT_STYLE = { color: "var(--color-ink)", width: 4.5 };
const COURANT_STYLE = { color: "var(--color-accent)", width: 4.5 };
const BACKDROP = "var(--color-brand-50)";

const STEPS = [
  { titre: "Position initiale", description: "Le cordage pend, prêt à être façonné." },
  { titre: "Créer la première boucle", description: "Une boucle se forme sur le dormant." },
  { titre: "Passer l'extrémité dans la boucle", description: "Le courant remonte à travers la boucle." },
  { titre: "Passer autour du dormant", description: "Il fait le tour du dormant : regarde bien, il passe devant." },
  { titre: "Repasser dans la boucle", description: "Puis redescend dans la boucle de départ." },
  { titre: "Serrer", description: "Le nœud se resserre : une boucle fixe qui ne glisse pas." },
];

const SPEEDS = [
  { id: "lent", label: "🐢", multiplier: 0.4 },
  { id: "normal", label: "▶", multiplier: 1 },
  { id: "rapide", label: "⚡", multiplier: 2.2 },
];

const STEP_DURATION_MS = 1300;

function RopeCanvas({ progress }: { progress: number }) {
  const frame = frameAtProgress(progress, TOTAL_STEPS);
  const courantD = framePath(frame);
  const tip = frameTip(frame);
  const serrage = progress >= TOTAL_STEPS - 1.001;

  return (
    <svg viewBox="0 0 300 400" className="w-full max-h-80 mx-auto">
      <g style={{ transform: serrage ? "scale(0.96)" : "scale(1)", transformOrigin: "150px 140px", transition: "transform 0.4s ease" }}>
        {/* Dormant : fixe, jamais animé */}
        <path d={DORMANT_D} fill="none" stroke={DORMANT_STYLE.color} strokeWidth={DORMANT_STYLE.width} strokeLinecap="round" />
        {/* Courant : un seul tracé continu — halo puis couleur, pour le dessus/dessous */}
        <path d={courantD} fill="none" stroke={BACKDROP} strokeWidth={COURANT_STYLE.width + 6} strokeLinecap="round" />
        <path d={courantD} fill="none" stroke={COURANT_STYLE.color} strokeWidth={COURANT_STYLE.width} strokeLinecap="round" />
        {!serrage && <circle cx={tip.x} cy={tip.y} r={5.5} fill={COURANT_STYLE.color} />}
        {serrage && (
          <g>
            <circle cx={235} cy={85} r={15} fill="var(--color-success)" />
            <path d="M228,85 L233,91 L243,79" stroke="white" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    </svg>
  );
}

function Regarder() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    function tick(t: number) {
      if (lastRef.current === null) lastRef.current = t;
      const dt = t - lastRef.current;
      lastRef.current = t;
      setProgress((p) => {
        const next = p + dt / STEP_DURATION_MS;
        return next >= TOTAL_STEPS - 1 ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Card className="p-4">
        <RopeCanvas progress={progress} />
      </Card>
      <p className="text-center text-sm text-ink-soft">Regarde le nœud se former en boucle, sans intervenir.</p>
    </div>
  );
}

function Comprendre() {
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[1]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      lastRef.current = null;
      return;
    }
    function tick(t: number) {
      if (lastRef.current === null) lastRef.current = t;
      const dt = t - lastRef.current;
      lastRef.current = t;
      setProgress((p) => {
        const next = p + (dt / STEP_DURATION_MS) * speed.multiplier;
        if (next >= TOTAL_STEPS - 1) {
          if (loop) return 0;
          setPlaying(false);
          return TOTAL_STEPS - 1;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, loop, speed]);

  const currentStep = Math.min(TOTAL_STEPS - 1, Math.round(progress));

  function goToStep(step: number) {
    setPlaying(false);
    setProgress(Math.max(0, Math.min(TOTAL_STEPS - 1, step)));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <RopeCanvas progress={progress} />
      </Card>

      <div className="text-center">
        <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">
          Étape {currentStep + 1} / {TOTAL_STEPS}
        </p>
        <p className="text-lg font-semibold text-ink">{STEPS[currentStep].titre}</p>
        <p className="text-sm text-ink-soft mt-0.5">{STEPS[currentStep].description}</p>
      </div>

      <DragSlider
        value={(progress / (TOTAL_STEPS - 1)) * 100}
        onChange={(v) => {
          setPlaying(false);
          setProgress((v / 100) * (TOTAL_STEPS - 1));
        }}
        leftLabel="Début"
        rightLabel="Fin"
        tone="accent"
      />

      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        <Button variant="secondary" size="sm" onClick={() => goToStep(0)} aria-label="Retour au début">
          <RotateCcw size={15} />
        </Button>
        <Button variant="secondary" size="sm" onClick={() => goToStep(currentStep - 1)} disabled={currentStep === 0} aria-label="Étape précédente">
          <SkipBack size={15} />
        </Button>
        <Button variant="primary" size="sm" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Lecture"}>
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep === TOTAL_STEPS - 1}
          aria-label="Étape suivante"
        >
          <SkipForward size={15} />
        </Button>
        <Button variant={loop ? "primary" : "secondary"} size="sm" onClick={() => setLoop((v) => !v)} aria-label="Boucle">
          <Repeat size={15} />
        </Button>
      </div>

      <div className="flex justify-center gap-2">
        {SPEEDS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSpeed(s)}
            className={clsx(
              "w-11 h-9 rounded-lg text-base border transition-colors",
              speed.id === s.id ? "border-brand-500 bg-brand-50" : "border-border bg-surface text-ink-soft"
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Faire() {
  const [defi, setDefi] = useState(() => 1 + Math.floor(Math.random() * (TOTAL_STEPS - 1)));
  const [reponse, setReponse] = useState<number | null>(null);
  const [options] = useState(() => {
    const distracteurs = STEPS.map((_, i) => i).filter((i) => i !== defi);
    const shuffled = [...distracteurs].sort(() => Math.random() - 0.5).slice(0, 3);
    return [...shuffled, defi].sort(() => Math.random() - 0.5);
  });

  const frame = frameAtStep(defi - 1);
  const courantD = framePath(frame);
  const tip = frameTip(frame);

  function nouveauDefi() {
    setDefi(1 + Math.floor(Math.random() * (TOTAL_STEPS - 1)));
    setReponse(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <svg viewBox="0 0 300 400" className="w-full max-h-80 mx-auto">
          <path d={DORMANT_D} fill="none" stroke={DORMANT_STYLE.color} strokeWidth={DORMANT_STYLE.width} strokeLinecap="round" />
          <path d={courantD} fill="none" stroke={BACKDROP} strokeWidth={COURANT_STYLE.width + 6} strokeLinecap="round" />
          <path d={courantD} fill="none" stroke={COURANT_STYLE.color} strokeWidth={COURANT_STYLE.width} strokeLinecap="round" />
          <circle cx={tip.x} cy={tip.y} r={5.5} fill={COURANT_STYLE.color} />
        </svg>
      </Card>
      <p className="text-sm font-medium text-ink text-center">Le cordage est dans cet état. Quel est le prochain mouvement ?</p>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const estBonne = opt === defi;
          const estSelectionnee = opt === reponse;
          return (
            <button
              key={opt}
              disabled={reponse !== null}
              onClick={() => setReponse(opt)}
              className={clsx(
                "text-left text-sm rounded-xl border px-4 py-3 transition-colors",
                reponse === null && "border-border hover:border-brand-300 bg-surface",
                reponse !== null && estBonne && "border-success bg-success-soft text-ink",
                reponse !== null && estSelectionnee && !estBonne && "border-danger bg-danger-soft text-ink",
                reponse !== null && !estSelectionnee && !estBonne && "border-border opacity-45"
              )}
            >
              {STEPS[opt].titre}
            </button>
          );
        })}
      </div>
      {reponse !== null && (
        <>
          <FeedbackBanner
            tone={reponse === defi ? "success" : "error"}
            titre={reponse === defi ? "Exact !" : "Pas tout à fait."}
            detail={STEPS[defi].description}
          />
          <Button onClick={nouveauDefi} className="w-full">
            <Check size={16} />
            Nouveau défi
          </Button>
        </>
      )}
    </div>
  );
}

export function KnotPrototypeBowline() {
  const [tab, setTab] = useState<"regarder" | "comprendre" | "faire">("comprendre");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-xl bg-surface-2 p-1">
        {(["regarder", "comprendre", "faire"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              "flex-1 text-sm font-medium py-2 rounded-lg transition-colors capitalize",
              tab === t ? "bg-surface text-ink shadow-sm" : "text-ink-soft"
            )}
          >
            {t === "regarder" ? "① Regarder" : t === "comprendre" ? "② Comprendre" : "③ Faire"}
          </button>
        ))}
      </div>

      {tab === "regarder" && <Regarder />}
      {tab === "comprendre" && <Comprendre />}
      {tab === "faire" && <Faire />}
    </div>
  );
}
