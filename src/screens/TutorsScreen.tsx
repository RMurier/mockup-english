// src/screens/TutorsScreen.tsx
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tutors } from "../../data/tutors";
import { skills } from "../../data/skills";
import { TutorCard } from "../components/TutorCard";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Tutors">;

export default function TutorsScreen({ route, navigation }: Props) {
  const { skillId, skillName } = route.params;
  // On ne garde que les personnes qui PEUVENT enseigner ce skill
  const list = tutors.filter((t) => t.offers.includes(skillId));
  const skill = skills.find((s) => s.id === skillId);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {skillName}
        </Text>
        <View style={{ width: 22 }} />
      </View>

      <View
        style={[styles.banner, { backgroundColor: skill?.color ?? "#eee" }]}
      >
        <Text style={styles.bannerText}>
          Mentors for “{skillName}” (skills exchange)
        </Text>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TutorCard
            tutor={item}
            onPress={(t) =>
              navigation.navigate("Chat", { tutorId: t.id, tutorName: t.name })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No one offers this skill yet.
          </Text>
        }
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  title: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "800" },
  banner: { margin: 12, borderRadius: 16, padding: 12 },
  bannerText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  empty: { textAlign: "center", color: "#777", marginTop: 40 },
});
