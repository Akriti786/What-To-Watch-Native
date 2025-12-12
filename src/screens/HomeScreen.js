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
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2; // responsive grid

export default function HomeScreen() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { isDarkMode, colors } = useContext(ThemeContext); // Use ThemeContext

  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [moviesByLang, setMoviesByLang] = useState({}); // cache per language
  const [selectedLang, setSelectedLang] = useState(""); // empty = all languages
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
    { name: "Armenian", code: "hy" },
    { name: "Azerbaijani", code: "az" },
    { name: "Bengali", code: "bn" },
    { name: "Bulgarian", code: "bg" },
    { name: "Cantonese", code: "zh" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dutch", code: "nl" },
    { name: "Estonian", code: "et" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "Georgian", code: "ka" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Hebrew", code: "he" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Indonesian", code: "id" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Korean", code: "ko" },
    { name: "Latvian", code: "lv" },
    { name: "Lithuanian", code: "lt" },
    { name: "Malay", code: "ms" },
    { name: "Nepali", code: "ne" },
    { name: "Norwegian", code: "no" },
    { name: "Persian", code: "fa" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Serbian", code: "sr" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Spanish", code: "es" },
    { name: "Swedish", code: "sv" },
    { name: "Thai", code: "th" },
    { name: "Turkish", code: "tr" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Chinese (Simplified)", code: "zh" },
    { name: "Chinese (Traditional)", code: "zh-TW" },
    { name: "Gujarati", code: "gu" },
    { name: "Bhojpuri", code: "bh" },
  ];

  // Fetch trending movies (once)
  useEffect(() => {
    api
      .get("/trending")
      .then((res) => setTrending(res.data.results))
      .catch(console.error);
  }, []);

  // Fetch movies by language (with caching)
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
        const res = await api.get("/movies", { params });
        setMovies(res.data.results);
        setMoviesByLang((prev) => ({ ...prev, [selectedLang]: res.data.results }));
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [selectedLang]);

  // Search movies
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const res = await api.get("/search", { params: { query: searchQuery } });
      setMovies(res.data.results);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* App Title */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>🎬 What To Watch</Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor={colors.text + "99"}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          style={[styles.searchInput, { color: colors.text }]} 
        />
        <IconButton icon="magnify" size={28} onPress={handleSearch} color={colors.text} /> 
      </View>

      {/* Trending Worldwide */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>🌍 Trending Worldwide</Text>
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
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => setSelectedLang(lang.code)}
            style={[
              styles.langButton,
              selectedLang === lang.code && styles.langButtonActive,
              { borderColor: colors.border },
            ]}
          >
            <Text
              style={[
                { fontWeight: selectedLang === lang.code ? "bold" : "normal" },
                { color: colors.text },
              ]}
            >
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Movies Grid */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Movies</Text>
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} color={colors.text} /> // Loader color
      ) : movies.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: colors.text }}>
          No movies found.
        </Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isFav={favorites.some((f) => f.id === item.id)}
              onFavPress={toggleFavorite}
              cardWidth={CARD_WIDTH}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </ScrollView>
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
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  langButton: {
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  langButtonActive: {
    backgroundColor: "#eee",
    borderWidth: 0,
  },
});
