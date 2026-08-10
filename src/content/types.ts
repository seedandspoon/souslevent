// Modèle de données du contenu pédagogique (statique, versionné avec le code).
// Voir /src/lib/types.ts pour les données utilisateur (dynamiques, stockées en local).

export type SkillTag = "vent" | "manoeuvres" | "navigation" | "securite" | "meteo";

export type BlockType =
  | { type: "texte"; contenu: string }
  | { type: "schema"; illustration: string; legende?: string }
  | { type: "etapes"; titre?: string; items: string[] }
  | { type: "erreurs"; items: string[] }
  | { type: "astuce"; contenu: string };

export interface Level {
  id: string;
  ordre: number;
  titre: string;
  description: string;
  icone: string;
}

export interface Module {
  id: string;
  levelId: string;
  ordre: number;
  titre: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  ordre: number;
  titre: string;
  dureeMinutes: number;
  resume: string;
  blocs: BlockType[];
  conceptIds: string[];
  questionInline?: {
    enonce: string;
    options: string[];
    reponseIndex: number;
    explication: string;
  };
}

export interface Concept {
  id: string;
  titre: string;
  skillTag: SkillTag;
  glossaryTermId?: string;
}

export type QuizType =
  | "qcm"
  | "vrai-faux"
  | "association"
  | "reconnaissance"
  | "scenario";

export interface QuizItemBase {
  id: string;
  type: QuizType;
  conceptIds: string[];
  explication: string;
  chronometre?: boolean;
}

export interface QuizQCM extends QuizItemBase {
  type: "qcm";
  enonce: string;
  options: string[];
  reponseIndex: number;
}

export interface QuizVraiFaux extends QuizItemBase {
  type: "vrai-faux";
  enonce: string;
  reponse: boolean;
}

export interface QuizAssociation extends QuizItemBase {
  type: "association";
  enonce: string;
  paires: { gauche: string; droite: string }[];
}

export interface QuizReconnaissance extends QuizItemBase {
  type: "reconnaissance";
  enonce: string;
  illustration: string;
  options: string[];
  reponseIndex: number;
}

export interface QuizScenario extends QuizItemBase {
  type: "scenario";
  situation: string;
  options: string[];
  reponseIndex: number;
}

export type QuizItem =
  | QuizQCM
  | QuizVraiFaux
  | QuizAssociation
  | QuizReconnaissance
  | QuizScenario;

export interface Knot {
  id: string;
  nom: string;
  nomAnglais?: string;
  usage: string;
  difficulte: 1 | 2 | 3;
  etapes: string[];
  erreurs: string[];
  illustration: string;
}

export interface GlossaryTerm {
  id: string;
  terme: string;
  definition: string;
  categorie: string;
  termesAssociesIds: string[];
  lessonId?: string;
}

export type QuickCardCategorie =
  | "noeuds"
  | "manoeuvres"
  | "priorites"
  | "signaux"
  | "balisage"
  | "vhf"
  | "securite"
  | "meteo"
  | "checklists"
  | "vocabulaire";

export interface QuickCardSection {
  titre: string;
  items: string[];
}

export interface QuickCard {
  id: string;
  categorie: QuickCardCategorie;
  titre: string;
  sections: QuickCardSection[];
  alerte?: string;
  lessonId?: string;
}

// Référentiel réglementaire minimal : cadre chaque contenu "sécurité / priorité / VHF"
// pour ne jamais laisser croire que l'appli se substitue aux textes officiels (RIPAM,
// division 240, etc.) ou à une formation encadrée.
export type StatutReference = "regle-officielle" | "bonne-pratique" | "variable-selon-pays";
