import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Text, ActivityIndicator, IconButton } from "react-native-paper";
import MovieCard from "../components/MovieCard";
import { FavoritesContext } from "../context/FavoritesContext";
import { api } from "../api";
import { ThemeContext } from "../context/ThemeContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2;

export default function HomeScreen() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { colors } = useContext(ThemeContext);

  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesByLang, setMoviesByLang] = useState({});
  const [selectedLang, setSelectedLang] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const languages = [
    { name: "Hollywood", code: "en" },
    { name: "Bollywood", code: "hi" },
    { name: "Tamil", code: "ta" },
    { name: "Telugu", code: "te" },
    { name: "Kannada", code: "kn" },
    { name: "Malayalam", code: "ml" },
    { name: "Punjabi", code: "pa" },
    { name: "Marathi", code: "mr" },
    { name: "Arabic", code: "ar" },
    { name: "French", code: "fr" },
    { name: "German", code: "de" },
    { name: "Japanese", code: "ja" },
    { name: "Korean", code: "ko" },
    { name: "Russian", code: "ru" },
    { name: "Spanish", code: "es" },
    { name: "Chinese (Simplified)", code: "zh" },
    // { name: "Chinese (Traditional)", code: "zh-TW" },
  ];

  // 🔹 Trending
  useEffect(() => {
    api
      .get("/api/trending")
      .then((res) => setTrending(res.data.results || []))
      .catch((err) => console.log("Trending error:", err.message));
  }, []);

  // 🔹 Movies by language
  useEffect(() => {
    async function fetchMovies() {
      if (moviesByLang[selectedLang]) {
        setMovies(moviesByLang[selectedLang]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const params = selectedLang ? { language: selectedLang } : {};
        const res = await api.get("/api/movies", { params });
        setMovies(res.data.results || []);
        setMoviesByLang((prev) => ({
          ...prev,
          [selectedLang]: res.data.results || [],
        }));
      } catch (err) {
        console.log("Movies error:", err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [selectedLang]);

  // 🔹 Search
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const res = await api.get("/api/search", {
        params: { query: searchQuery },
      });
      setMovies(res.data.results || []);
    } catch (err) {
      console.log("Search error:", err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => (
        <MovieCard
          movie={item}
          isFav={favorites.some((f) => f.id === item.id)}
          onFavPress={toggleFavorite}
          cardWidth={CARD_WIDTH}
        />
      )}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20, color: colors.text }}>
            No movies found.
          </Text>
        )
      }
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              🎬 What To Watch
            </Text>
          </View>

          {/* Search */}
          <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
            <TextInput
              placeholder="Search movies..."
              placeholderTextColor={colors.text + "99"}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              style={[styles.searchInput, { color: colors.text }]}
            />
            <IconButton icon="magnify" size={28} onPress={handleSearch} />
          </View>

          {/* Trending */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            🌍 Trending Worldwide
          </Text>
          <FlatList
            horizontal
            data={trending}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                isFav={favorites.some((f) => f.id === item.id)}
                onFavPress={toggleFavorite}
                cardWidth={180}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />

          {/* Categories */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={`${lang.code}-${lang.name}`}
                onPress={() => setSelectedLang(lang.code)}
                style={[
                  styles.langButton,
                  selectedLang === lang.code && styles.langButtonActive,
                ]}
              >
                <Text style={{ color: colors.text }}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Movies
          </Text>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { alignItems: "center", marginBottom: 10 },
  title: { fontSize: 28, fontWeight: "bold" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  searchInput: { flex: 1, padding: 8, fontSize: 16 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  langButton: {
    marginRight: 10,
    padding: 6,
    borderWidth: 1,
    borderRadius: 6,
  },
  langButtonActive: { backgroundColor: "#ddd" },
});
