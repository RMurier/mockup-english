// src/screens/ChatScreen.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
} from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { tutors } from "../../data/tutors";

type Msg = {
  id: string;
  author: "me" | "tutor";
  text: string;
  at: number; // timestamp
};

type Props = {
  route: { params: { tutorId: number; tutorName: string } };
  navigation: any;
};

function Initials({ name }: { name: string }) {
  const initials = name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

export default function ChatScreen({ route, navigation }: Props) {
  const { tutorId, tutorName } = route.params;
  const tutor = useMemo(() => tutors.find(t => t.id === tutorId), [tutorId]);

  // conversation fictive au démarrage
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: "m1", author: "tutor", text: `Salut, je peux t'aider pour ${tutor?.offers?.length ? "tes objectifs" : "ce skill"}. Tu veux échanger ?`, at: Date.now() - 1000 * 60 * 60 },
    { id: "m2", author: "me", text: "Oui ! Je peux t'apprendre la cuisine en échange 😊", at: Date.now() - 1000 * 60 * 58 },
    { id: "m3", author: "tutor", text: "Parfait. Dispo en visio ce soir ?", at: Date.now() - 1000 * 60 * 57 },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<FlatList<Msg>>(null);

  useEffect(() => {
    // scroll bas au montage
    setTimeout(() => listRef.current?.scrollToOffset({ offset: 0, animated: true }), 0);
  }, []);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const msg: Msg = { id: String(Math.random()), author: "me", text, at: Date.now() };
    setMessages((prev) => [msg, ...prev]); // FlatList inversée
    setInput("");

    // Réponse fictive rapide
    setTimeout(() => {
      const reply: Msg = {
        id: String(Math.random()),
        author: "tutor",
        text: "Top ! Je t'envoie une proposition d'échange.",
        at: Date.now(),
      };
      setMessages((prev) => [reply, ...prev]);
    }, 600);
  };

  const renderItem = ({ item }: { item: Msg }) => {
    const mine = item.author === "me";
    return (
      <View style={[styles.row, mine ? { justifyContent: "flex-end" } : { justifyContent: "flex-start" }]}>
        {!mine && <Initials name={tutorName} />}
        <View style={[styles.bubble, mine ? styles.bubbleMe : styles.bubbleOther]}>
          <Text style={[styles.text, mine ? styles.textMe : styles.textOther]}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Initials name={tutorName} />
          <Text numberOfLines={1} style={styles.title}>{tutorName}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="ellipsis-vertical" size={18} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          inverted // dernier message en bas
          contentContainerStyle={{ paddingVertical: 10 }}
        />

        {/* Input */}
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="add" size={20} />
          </TouchableOpacity>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Écrire un message…"
              value={input}
              onChangeText={setInput}
              style={styles.input}
              multiline
            />
          </View>

          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Ionicons name="send" size={18} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56, paddingHorizontal: 12,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerCenter: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 16, fontWeight: "800" },

  avatar: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: "#EAF5FF", alignItems: "center", justifyContent: "center",
  },
  avatarText: { fontWeight: "800", color: "#2A6FD6" },

  row: { flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 12, marginVertical: 4, gap: 8 },
  bubble: { maxWidth: "76%", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  bubbleMe: { backgroundColor: "#2A6FD6", borderTopRightRadius: 4 },
  bubbleOther: { backgroundColor: "#F0F3FA", borderTopLeftRadius: 4 },
  text: { fontSize: 15, lineHeight: 20 },
  textMe: { color: "#fff" },
  textOther: { color: "#222" },

  inputRow: {
    flexDirection: "row", alignItems: "flex-end", gap: 8,
    padding: 10, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  iconBtn: {
    width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth, borderColor: "#e6e6e6", backgroundColor: "#fff",
  },
  inputBox: {
    flex: 1, borderRadius: 14, borderWidth: StyleSheet.hairlineWidth, borderColor: "#e6e6e6",
    backgroundColor: "#fafafa", paddingHorizontal: 10, paddingVertical: 6,
  },
  input: { minHeight: 20, maxHeight: 120, fontSize: 15 },
  sendBtn: {
    width: 40, height: 36, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
    backgroundColor: "#EAF5FF",
  },
});
