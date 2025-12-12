import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, IconButton } from "react-native-paper";

export default function MovieCard({ movie, onFavPress, isFav, cardWidth }) {
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image
        source={{
          uri: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/150x225.png?text=No+Image",
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {movie.title}
        </Text>
        <TouchableOpacity onPress={() => onFavPress(movie)}>
          <IconButton
            icon={isFav ? "heart" : "heart-outline"}
            iconColor={isFav ? "red" : "gray"}
            size={22}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.subInfo}>
        {movie.release_date ? movie.release_date : "Unknown"} | {movie.original_language?.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
    padding: 5,
  },
  image: {
    height: 225,
    borderRadius: 10,
    resizeMode: "cover",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 14,
  },
  subInfo: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
});
