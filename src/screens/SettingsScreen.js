import React, { useContext } from "react";
import { View, StyleSheet, Switch, ScrollView, Linking } from "react-native";
import { Text, Divider, List } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SettingsScreen() {
  const { isDarkMode, colors, toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>⚙️ Settings</Text>
        </View>

        <Divider style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Appearance */}
        <List.Section>
          <List.Subheader style={[styles.sectionHeader, { color: colors.text }]}>
            Appearance
          </List.Subheader>
          <List.Item
            title="Dark Mode"
            description={isDarkMode ? "Enabled" : "Disabled"}
            titleStyle={{ color: colors.text }}
            descriptionStyle={{ color: colors.text }}
            right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
            left={() => <List.Icon icon="theme-light-dark" color={colors.text} />}
          />
        </List.Section>

        <Divider style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* About */}
        <List.Section>
          <List.Subheader style={[styles.sectionHeader, { color: colors.text }]}>
            About the App
          </List.Subheader>
          <List.Item
            title="App Version"
            description="1.0.0"
            titleStyle={{ color: colors.text }}
            descriptionStyle={{ color: colors.text }}
            left={() => <List.Icon icon="information-outline" color={colors.text} />}
          />
          <List.Item
            title="Privacy Policy"
            onPress={() => Linking.openURL("https://example.com/privacy")}
            titleStyle={{ color: colors.text }}
            descriptionStyle={{ color: colors.text }}
            left={() => <List.Icon icon="shield-outline" color={colors.text} />}
          />
          <List.Item
            title="Terms & Conditions"
            onPress={() => Linking.openURL("https://example.com/terms")}
            titleStyle={{ color: colors.text }}
            descriptionStyle={{ color: colors.text }}
            left={() => <List.Icon icon="file-document-outline" color={colors.text} />}
          />
          <List.Item
            title="Contact Support"
            onPress={() => Linking.openURL("mailto:support@example.com")}
            titleStyle={{ color: colors.text }}
            descriptionStyle={{ color: colors.text }}
            left={() => <List.Icon icon="email-outline" color={colors.text} />}
          />
        </List.Section>

        <Divider style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={{ textAlign: "center", color: colors.text }}>
            © 2025 MovieApp. All rights reserved.
          </Text>
          <Text style={{ textAlign: "center", color: colors.text }}>
            Developed By Akriti
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15 },
  header: { marginVertical: 20 },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { marginTop: 5, fontSize: 14 },
  sectionHeader: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  divider: { marginVertical: 10 },
  footer: { paddingVertical: 20 },
});
