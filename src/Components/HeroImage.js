import React from "react";
import Box from "@mui/material/Box";

const Image = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 650;

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width < breakpoint ? (
    <React.Fragment>
      <img
        width="100%"
        src="https://i.imgur.com/Aumz1ep.png"
        alt="Creator's Cross Jewelry Display"
      />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <img
        width="100%"
        src="https://i.imgur.com/UtjfNB3.png"
        alt="Creator's Cross Jewelry Display"
      />
    </React.Fragment>
  );
};

export default function HeroImage() {
  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Image />
      </Box>
    </React.Fragment>
  );
}
