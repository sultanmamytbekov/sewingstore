import React from "react";
import Slider from "react-slick";
import imageOne from "./image/imageOne 10.png";
import imgOne from "./image/imageOne 9.png";
import imageTwo from "./image/imageTwo 7.png";
import imgTwo from "./image/imageTwo 8.png";
import imageThree from "./image/imageThree 11.png";
import imgThree from "./image/imageThree 12.png";
import "./index.scss";
const settings = {
  dots: true,
  infinite: true,
  speed: 2000,
  autoplaySpeed: 5000,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  cssEase: "linear",
};

const Populars = () => {
  return (
    <div id="populars">
      <div className="container">
        <div className="populars">
          <h1 data-aos="fade-right">Популярные продукты</h1>
          <div data-aos="fade-right" className="populars--slider">
            <div className="populars--slider__text">
              <Slider {...settings}>
                <img src={imageOne} alt="" />
                <img src={imgTwo} alt="" />
                <img src={imgThree} alt="" />
              </Slider>
            </div>
            <div className="populars--slider__text">
              <Slider {...settings}>
                <img src={imgOne} alt="" />
                <img src={imageTwo} alt="" />
                <img src={imageThree} alt="" />
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Populars;
