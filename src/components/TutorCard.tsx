// src/components/TutorCard.tsx
import { memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Tutor } from "../../data/tutors";
import { skills } from "../../data/skills";

type Props = {
  tutor: Tutor;
  onPress?: (t: Tutor) => void;
};

function Initials({ name }: { name: string }) {
  const initials = name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const arr = Array.from({ length: 5 }, (_, i) =>
    i < full ? "star" : i === full && half ? "star-half" : "star-outline"
  );
  return (
    <View style={{ flexDirection: "row", gap: 2 }}>
      {arr.map((name, i) => (
        <Ionicons key={i} name={name as any} size={14} />
      ))}
    </View>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

function TutorCardBase({ tutor, onPress }: Props) {
  const wantLabels = tutor.wants
    .map(id => skills.find(s => s.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <Pressable
      onPress={() => onPress?.(tutor)}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.9 : 1 }]}
    >
      <Initials name={tutor.name} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{tutor.name}</Text>
        <Text style={styles.bio} numberOfLines={1}>{tutor.bio}</Text>

        <View style={styles.metaRow}>
          <Stars value={tutor.rating} />
          <Text style={styles.meta}>({tutor.nbRates})</Text>
        </View>

        {/* Ce que la personne souhaite apprendre en échange */}
        <View style={styles.wantRow}>
          <Ionicons name="swap-horizontal-outline" size={14} />
          <Text style={styles.wantLabel}>Souhaite apprendre :</Text>
        </View>
        <View style={styles.chipWrap}>
          {wantLabels.map((w, i) => <Chip key={i} label={w} />)}
        </View>
      </View>

      <View style={styles.cta}>
        <Ionicons name="chatbubble-ellipses-outline" size={18} />
        <Text style={styles.ctaText}>Proposer un échange</Text>
      </View>
    </Pressable>
  );
}

export const TutorCard = memo(TutorCardBase);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    gap: 12,
  },
  avatar: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: "#EAF5FF",
    alignItems: "center", justifyContent: "center",
  },
  avatarText: { fontWeight: "800", color: "#2A6FD6" },
  name: { fontSize: 16, fontWeight: "700" },
  bio: { fontSize: 13, color: "#666", marginTop: 2 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  meta: { fontSize: 12, color: "#666" },
  wantRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  wantLabel: { fontSize: 12, fontWeight: "700" },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 },
  chip: {
    paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 999, backgroundColor: "#F2F6FF",
    borderWidth: StyleSheet.hairlineWidth, borderColor: "#E0EAFF",
  },
  chipText: { fontSize: 12, fontWeight: "600", color: "#2A6FD6" },
  cta: {
    marginLeft: 8,
    paddingHorizontal: 10, paddingVertical: 8,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth, borderColor: "#e6e6e6",
    alignItems: "center", justifyContent: "center",
    gap: 2,
  },
  ctaText: { fontSize: 11, fontWeight: "700", textAlign: "center" },
});
