// src/screens/HomeScreen.tsx
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { skills as seed } from "../../data/skills";
import { SkillCard } from "../components/SkillCard";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seed;
    return seed.filter(s =>
      s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Retour")}>
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.brand}>Skill<Text style={styles.brandAccent}>S</Text>wap</Text>
        <TouchableOpacity onPress={() => Alert.alert("Menu")}><Ionicons name="ellipsis-vertical" size={18} /></TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} style={styles.searchIcon} />
          <TextInput
            placeholder="Search a skill..."
            value={query}
            onChangeText={setQuery}
            style={styles.input}
            returnKeyType="search"
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={() => Alert.alert("Filtres")}>
          <Ionicons name="options-outline" size={18} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SkillCard
            skill={item}
            onPress={(s) =>
              navigation.navigate("Tutors", { skillId: s.id, skillName: s.name })
            }
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: { height: 56, paddingHorizontal: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#e8e8e8", backgroundColor: "#fff" },
  brand: { fontSize: 20, fontWeight: "800" },
  brandAccent: { color: "#3fb7ff" },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 12, paddingVertical: 10 },
  searchBox: { flex: 1, height: 42, borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: "#e6e6e6", backgroundColor: "#fafafa", flexDirection: "row", alignItems: "center", paddingHorizontal: 10 },
  searchIcon: { marginRight: 8, opacity: 0.6 },
  input: { flex: 1, fontSize: 15 },
  filterBtn: { width: 42, height: 42, borderRadius: 12, borderWidth: StyleSheet.hairlineWidth, borderColor: "#e6e6e6", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  gridContent: { paddingHorizontal: 6, paddingBottom: 16 },
});
