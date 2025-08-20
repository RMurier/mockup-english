// src/components/SkillCard.tsx
import { memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Skill } from "../../data/skills";

type Props = {
  skill: Skill;
  onPress?: (skill: Skill) => void;
};

function SkillCardBase({ skill, onPress }: Props) {
  return (
    <Pressable
      onPress={() => onPress?.(skill)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: skill.color, transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      {/* coin décoratif */}
      <View style={styles.ribbon} />
      {/* Icône principale */}
      <View style={styles.iconWrap}>
        <Ionicons name={(skill.icon || "pricetag") as any} size={28} />
      </View>

      {/* Texte */}
      <View style={styles.texts}>
        <Text numberOfLines={2} style={styles.title}>
          {skill.name}
        </Text>
        <Text numberOfLines={1} style={styles.category}>
          {skill.category}
        </Text>
      </View>

      {/* Sticker/emoji */}
      {!!skill.emoji && <Text style={styles.emoji}>{skill.emoji}</Text>}
    </Pressable>
  );
}

export const SkillCard = memo(SkillCardBase);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 150,
    borderRadius: 22,
    padding: 14,
    margin: 6,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  ribbon: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    opacity: 0.18,
    backgroundColor: "#fff",
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  texts: { flex: 1, justifyContent: "flex-end" },
  title: { fontSize: 20, fontWeight: "800", color: "#fff", lineHeight: 24 },
  category: { fontSize: 12, fontWeight: "600", color: "rgba(255,255,255,0.9)", marginTop: 2 },
  emoji: { position: "absolute", right: 12, bottom: 12, fontSize: 22 },
});
