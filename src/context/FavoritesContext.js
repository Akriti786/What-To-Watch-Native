import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await AsyncStorage.getItem("favorites");
    setFavorites(favs ? JSON.parse(favs) : []);
  };

  const toggleFavorite = async (movie) => {
    let updatedFavs;
    if (favorites.some((m) => m.id === movie.id)) {
      updatedFavs = favorites.filter((m) => m.id !== movie.id);
    } else {
      updatedFavs = [...favorites, movie];
    }
    setFavorites(updatedFavs);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavs));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
