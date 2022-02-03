import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cart")
      .then((res) => {
        setCart(res.data.cart);
      })
      .catch((err) => console.log(err));
  });

  return cart;
}
