export type Skill = {
  id: number;
  name: string;
  category: string;
  emoji?: string;    
  color: string;   
  icon?: string;    
};

export const skills: Skill[] = [
  { id: 1, name: "Play guitar", category: "Music",   emoji: "🎸", color: "#5DA7FB", icon: "musical-notes" },
  { id: 2, name: "Learn a language", category: "Language", emoji: "🇬🇧", color: "#45D7CC", icon: "book" },
  { id: 3, name: "Cooking", category: "Food",       emoji: "😋", color: "#7EDC9B", icon: "restaurant" },
  { id: 4, name: "Coding", category: "Tech",        emoji: "💻", color: "#F6B1D0", icon: "code-slash" },
  { id: 5, name: "Painting", category: "Art",       emoji: "🎨", color: "#B79CFF", icon: "color-palette" },
  { id: 6, name: "Yoga", category: "Wellness",      emoji: "🧘‍♀️", color: "#FFC36E", icon: "leaf" },
];
