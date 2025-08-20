// src/data/tutors.ts
export type Tutor = {
  id: number;
  name: string;
  bio: string;
  rating: number;      // 0..5
  nbRates: number;
  offers: number[];    // ids de skills qu'il/elle PEUT enseigner
  wants: number[];     // ids de skills qu'il/elle VEUT apprendre en échange
};

export const tutors: Tutor[] = [
  // Suppose les ids de skills: 1 Guitar, 2 English, 3 Cooking, 4 Coding, 5 Painting, 6 Yoga
  {
    id: 1,
    name: "Alice Martin",
    bio: "Patiente et pédagogue",
    rating: 4.9,
    nbRates: 15,
    offers: [1, 4],       // enseigne Guitare, Coding
    wants: [2, 3],        // cherche English, Cooking
  },
  {
    id: 2,
    name: "Ben Dupont",
    bio: "Approche pratique & fun",
    rating: 4.6,
    nbRates: 19,
    offers: [2],          // enseigne English
    wants: [1, 5],        // cherche Guitare, Painting
  },
  {
    id: 3,
    name: "Chloé Durand",
    bio: "Méthode structurée",
    rating: 5.0,
    nbRates: 3,
    offers: [1, 2],       // enseigne Guitare, English
    wants: [4],           // cherche Coding
  },
  {
    id: 4,
    name: "Diego Rossi",
    bio: "Apprentissages par projets",
    rating: 4.3,
    nbRates: 12,
    offers: [3, 5],       // enseigne Cooking, Painting
    wants: [6],           // cherche Yoga
  },
  {
    id: 5,
    name: "Emma Leroy",
    bio: "Débuts rapides garantis",
    rating: 4.8,
    nbRates: 89,
    offers: [4, 6],       // enseigne Coding, Yoga
    wants: [2],           // cherche English
  },
  {
    id: 6,
    name: "Félix Moreau",
    bio: "Adapté à ton rythme",
    rating: 4.5,
    nbRates: 2,
    offers: [2, 3],       // enseigne English, Cooking
    wants: [1],           // cherche Guitare
  },
];
