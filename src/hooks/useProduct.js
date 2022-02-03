import { useEffect, useState } from "react";
import axios from "axios";

export default function useProduct(id, categoryId) {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(1);
  const [categoryAttribute, setCategoryAttribute] = useState(1);
  const [attribute, setAttribute] = useState(1);
  const [mark, setMark] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [URL, setURL] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (id && !isNaN(id)) {
      axios
        .get(`/api/product/${id}/${categoryId}`)
        .then((res) => {
          setProduct(res.data[0]);
          setName(res.data[0].name);
          setCategory(res.data[0].category_id);
          res.data[0].hasOwnProperty("attribute_name")
            ? setCategoryAttribute(res.data[0].attribute_name)
            : setCategoryAttribute("");
          res.data[0].hasOwnProperty("attribute_value")
            ? setAttribute(res.data[0].attribute_value)
            : setAttribute("");
          setMark(res.data[0].mark);
          setYear(res.data[0].year);
          setDescription(res.data[0].description);
          setURL(res.data[0].url);
          setQuantity(res.data[0].quantity);
          setPrice(res.data[0].price);
        })
        .catch((err) => console.log(err));
    }
  }, [id, categoryId]);

  return {
    product,
    name,
    category,
    categoryAttribute,
    attribute,
    mark,
    year,
    description,
    URL,
    quantity,
    price,
    setName,
    setCategory,
    setCategoryAttribute,
    setAttribute,
    setMark,
    setYear,
    setDescription,
    setURL,
    setQuantity,
    setPrice,
    updateProduct() {
      return new Promise((resolve) => {
        axios
          .put("/api/product", {
            name,
            category,
            mark,
            year,
            description,
            URL,
            quantity,
            price,
            inventoryId: product.inventory_id,
            productId: product.product_id,
          })
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => console.log(err.response));
      });
    },
  };
}
