import { db, STREAK_ID, PROFILE_ID } from "./db";
import { creerProgressionInitiale, reviser, estDue, qualiteDepuisReponse } from "./srs";
import { concepts } from "@/content/concepts";
import type { SkillTag } from "@/content/types";
import type { StreakState } from "./types";
import { SKILL_META, SKILL_TAGS } from "./skills";

export async function enregistrerReponse(
  conceptIds: string[],
  correct: boolean,
  tempsReponseMs?: number
) {
  const qualite = qualiteDepuisReponse(correct, tempsReponseMs);
  for (const conceptId of conceptIds) {
    const existante = await db.progress.get(conceptId);
    const base = existante ?? creerProgressionInitiale(conceptId);
    const misAJour = reviser(base, qualite);
    await db.progress.put(misAJour);
  }
  await enregistrerActivite();
}

export async function marquerLeconTerminee(lessonId: string, conceptIds: string[]) {
  await db.lessonCompletions.put({ lessonId, dateCompletion: Date.now() });
  // Première exposition : crée une progression initiale "vue" si absente.
  for (const conceptId of conceptIds) {
    const existante = await db.progress.get(conceptId);
    if (!existante) {
      const initiale = creerProgressionInitiale(conceptId);
      await db.progress.put({ ...initiale, maitrise: 15 });
    }
  }
  await enregistrerActivite();
}

export async function getConceptsARevoir() {
  const toutes = await db.progress.toArray();
  return toutes.filter((p) => estDue(p));
}

export interface SkillScore {
  tag: SkillTag;
  label: string;
  emoji: string;
  score: number;
}

export async function getScoresParCompetence(): Promise<SkillScore[]> {
  const toutesProgressions = await db.progress.toArray();
  const progressionParConcept = new Map(toutesProgressions.map((p) => [p.conceptId, p]));

  return SKILL_TAGS.map((tag) => {
    const conceptsDuTag = concepts.filter((c) => c.skillTag === tag);
    if (conceptsDuTag.length === 0) {
      return { tag, ...SKILL_META[tag], score: 0 };
    }
    const somme = conceptsDuTag.reduce((acc, c) => {
      const p = progressionParConcept.get(c.id);
      return acc + (p?.maitrise ?? 0);
    }, 0);
    return { tag, ...SKILL_META[tag], score: Math.round(somme / conceptsDuTag.length) };
  });
}

function aujourdHui(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function enregistrerActivite(): Promise<StreakState> {
  const existante = await db.streak.get(STREAK_ID);
  const hier = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const today = aujourdHui();

  if (!existante) {
    const nouvelle: StreakState = {
      id: STREAK_ID,
      dateDerniereActivite: today,
      serieActuelle: 1,
      record: 1,
    };
    await db.streak.put(nouvelle);
    return nouvelle;
  }

  if (existante.dateDerniereActivite === today) {
    return existante;
  }

  const serieActuelle = existante.dateDerniereActivite === hier ? existante.serieActuelle + 1 : 1;
  const misAJour: StreakState = {
    ...existante,
    dateDerniereActivite: today,
    serieActuelle,
    record: Math.max(existante.record, serieActuelle),
  };
  await db.streak.put(misAJour);
  return misAJour;
}

export async function getStreak(): Promise<StreakState> {
  const existante = await db.streak.get(STREAK_ID);
  if (existante) {
    const hier = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (existante.dateDerniereActivite !== aujourdHui() && existante.dateDerniereActivite !== hier) {
      return { ...existante, serieActuelle: 0 };
    }
    return existante;
  }
  return { id: STREAK_ID, dateDerniereActivite: "", serieActuelle: 0, record: 0 };
}

export async function getProfil() {
  const existant = await db.profile.get(PROFILE_ID);
  if (existant) return existant;
  const defaut = {
    id: PROFILE_ID,
    prenom: "Vanessa",
    dateInscription: Date.now(),
    objectifQuotidienMinutes: 5,
  };
  await db.profile.put(defaut);
  return defaut;
}

export async function setPrenom(prenom: string) {
  const profil = await getProfil();
  await db.profile.put({ ...profil, prenom });
}
