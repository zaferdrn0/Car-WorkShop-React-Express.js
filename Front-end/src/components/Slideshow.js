import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Slideshow(props) {
  const { images } = props;

  const [index, setIndex] = useState(0);

  function changeIndex(increment) {
    setIndex((prevState) => {
      let toReturn = prevState + increment;
      if (toReturn < 0) toReturn = 0;
      else if (toReturn > images.length - 1) toReturn = images.length - 1;
      return toReturn;
    });
  }

  const backgroundDivSx = {
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(120,120,120,0.5)",
    width: "10%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const iconSx = {
    fontSize: "3rem",
    zIndex: 5,
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {index !== 0 && (
        <div
          style={{ ...backgroundDivSx, left: 0 }}
          onClick={() => {
            changeIndex(-1);
          }}
        >
          <ArrowBackIosIcon sx={iconSx} />
        </div>
      )}
      <img src={`/images/${images[index]}`} alt="workshop" />
      {index < images.length - 1 && (
        <div
          style={{ ...backgroundDivSx, right: 0 }}
          onClick={() => {
            changeIndex(1);
          }}
        >
          <ArrowForwardIosIcon sx={iconSx} />
        </div>
      )}
    </div>
  );
}
