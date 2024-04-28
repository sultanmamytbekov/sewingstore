import React, { useEffect, useState } from "react";
import "./index.scss";
import img1 from "./image/image 4.png";
import img2 from "./image/image 5.png";
import img3 from "./image/image 6.png";
import Populars from "./PopularProducts";
import Elements from "./Elememts";
import Card from "./Сard";

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex % 3) + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  function getImage() {
    switch (imageIndex) {
      case 1:
        return img1;
      case 2:
        return img2;
      case 3:
        return img3;
      default:
        return img1;
    }
  }

  return (
    <div className="home">
      <div
        id="hero"
        style={{ background: `url("${getImage()}") no-repeat center/cover`}}
      >
      </div>
      <Populars />
      <Elements />
      <Card />
    </div>
  );
};

export default Hero;
