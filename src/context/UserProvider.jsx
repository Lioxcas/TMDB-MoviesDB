import { createContext, useState } from "react";

const UserContext = createContext({
  user: {},
  setUser: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    favorites: [],
  });

  const addFavorite = (favorite) => {
    setUser((prevUser) => ({
      ...prevUser,
      favorites: [...prevUser.favorites, favorite],
    }));
  };

  const removeFavorite = (favoriteId) => {
    setUser((prevUser) => ({
      ...prevUser,
      favorites: prevUser.favorites.filter(
        (favorite) => favorite !== Number(favoriteId)
      ),
    }));
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, addFavorite, removeFavorite }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
