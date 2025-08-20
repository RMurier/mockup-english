// src/components/AppHeader.tsx
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title?: string;
  onPressAccount?: () => void;
  onPressLogout?: () => void;
  onPressBack?: () => void;   // optionnel si tu veux un bouton retour
  showBack?: boolean;
};

export default function AppHeader({
  title = 'SkillSwap',
  onPressAccount,
  onPressLogout,
  onPressBack,
  showBack = false,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.left}>
          {showBack ? (
            <TouchableOpacity onPress={onPressBack} style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={22} />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          )}
        </View>

        <Text numberOfLines={1} style={styles.title}>{title}</Text>

        <View style={styles.right}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setMenuOpen((v) => !v)}
            accessibilityRole="button"
            accessibilityLabel="Ouvrir le menu profil"
          >
            <Ionicons name="person-circle-outline" size={24} />
          </TouchableOpacity>

          {menuOpen && (
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuOpen(false);
                  onPressAccount?.();
                }}
              >
                <Ionicons name="person-outline" size={18} style={styles.menuIcon} />
                <Text style={styles.menuText}>Mon compte</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuOpen(false);
                  onPressLogout?.();
                }}
              >
                <Ionicons name="log-out-outline" size={18} style={styles.menuIcon} />
                <Text style={styles.menuText}>Déconnexion</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  left: { width: 40, alignItems: 'flex-start' },
  right: { width: 40, alignItems: 'flex-end', justifyContent: 'center' },
  placeholder: { width: 24, height: 24 },
  iconBtn: { padding: 6, borderRadius: 999 },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  menu: {
    position: 'absolute',
    top: 44,
    right: 0,
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuIcon: { marginRight: 8 },
  menuText: { fontSize: 15 },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
    marginVertical: 2,
  },
});
