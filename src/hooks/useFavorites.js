import { useEffect, useState } from "react";
import axios from "axios";

export default function useFavorites(newFavorites) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (newFavorites.length) {
      setFavorites(newFavorites);
    } else {
      axios
        .get("/api/favorites")
        .then((res) => {
          setFavorites(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [newFavorites]);

  return favorites;
}
