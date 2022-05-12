import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { ReactComponent as MobileHero } from "../assets/CC-Hero-Mobile.svg";
import { ReactComponent as DesktopHero } from "../assets/CC-Hero-Desktop.svg";

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
      <Box sx={{ width: "100%" }}>
        <Link href="#">
          <MobileHero />
        </Link>
      </Box>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Link href="#">
          <DesktopHero />
        </Link>
      </Box>
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
