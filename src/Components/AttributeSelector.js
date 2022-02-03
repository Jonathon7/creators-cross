import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import RingSizeSelector from "./RingSizeSelector";
import Snackbar from "./Snackbar";
import useSnackbar from "../hooks/useSnackbar";

export default function AttributeSelector(props) {
  const [component, setComponent] = useState(
    <h1>Error: No component selected</h1>
  );
  const [value, setValue] = useState(null);
  const { isOpen, message, openSnackbar } = useSnackbar();

  useEffect(() => {
    if (props.favorite) {
      switch (props.favorite.category_id) {
        case 2:
          setComponent(
            <RingSizeSelector
              values={props.favorite.value}
              setValue={setValue}
              value={value}
            />
          );
          break;
        default:
          setComponent(<h1>Error: No component selected</h1>);
      }
    }
  }, [props.favorite, value]);

  const favoriteToCart = () => {
    if (!value) {
      openSnackbar("No value selected.");
    } else {
      const favorite = props.favorite;

      const idx = props.favorite.value.findIndex(
        (elem) => elem === value.toString()
      );

      favorite.value = [value];
      favorite.product_id = [props.favorite.product_id[idx]];

      axios
        .post("/api/favorites-to-cart", { favorite })
        .then((res) => {
          props.setFavorites(res.data.favorites);
          props.setCart(res.data.cart);
          props.close();
        })
        .catch((err) => {
          console.log(err.response);
          openSnackbar(err.response.data);
        });
    }
  };

  return (
    <Modal open={props.open} onClose={props.close}>
      <Box
        sx={{
          bgcolor: "#fff",
          width: "70%",
          height: "50%",
          m: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Snackbar open={isOpen} message={message} />
        {component}
        <Box>
          <Button variant="outlined" onClick={props.close}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={favoriteToCart}>
            Select
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
