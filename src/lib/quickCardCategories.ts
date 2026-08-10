import type { LucideIcon } from "lucide-react";
import { Link2, RotateCw, ArrowLeftRight, Flag, MapPin, Radio, LifeBuoy, CloudSun, ListChecks, BookOpen } from "lucide-react";
import type { QuickCardCategorie } from "@/content/types";

export const CATEGORY_META: Record<QuickCardCategorie, { label: string; icon: LucideIcon }> = {
  noeuds: { label: "Nœuds", icon: Link2 },
  manoeuvres: { label: "Manœuvres", icon: RotateCw },
  priorites: { label: "Priorités", icon: ArrowLeftRight },
  signaux: { label: "Signaux", icon: Flag },
  balisage: { label: "Balisage", icon: MapPin },
  vhf: { label: "VHF", icon: Radio },
  securite: { label: "Sécurité", icon: LifeBuoy },
  meteo: { label: "Météo", icon: CloudSun },
  checklists: { label: "Checklists", icon: ListChecks },
  vocabulaire: { label: "Vocabulaire", icon: BookOpen },
};

export const CATEGORY_ORDER: QuickCardCategorie[] = [
  "noeuds",
  "manoeuvres",
  "priorites",
  "signaux",
  "balisage",
  "vhf",
  "securite",
  "meteo",
  "checklists",
  "vocabulaire",
];
