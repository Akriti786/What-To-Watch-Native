import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import MovieCard from "../components/MovieCard";
import { FavoritesContext } from "../context/FavoritesContext";
import { ThemeContext } from "../context/ThemeContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 45) / 2;

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { colors } = useContext(ThemeContext);   // ← THEME COLORS NOW AVAILABLE

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Header */}
      <Text 
        variant="headlineLarge"
        style={[styles.header, { color: colors.text }]}
      >
        💖 My Favorites
      </Text>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No favorites yet!
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              isFav={true}
              onFavPress={toggleFavorite}
              cardWidth={CARD_WIDTH}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 15,
  },
  header: { 
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
  },
});
