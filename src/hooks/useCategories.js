import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return {
    categories,
  };
}
