import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Block from "../../../components/Hero/Elememts/Block";
import "./index.scss";
const Recom = () => {
  const { recipes } = useSelector((s) => s);
  const shuffleArray = () => {
    const newArr = [...recipes];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };
  useEffect(() => {
    shuffleArray()
  } , [])
  return (
    <div id="recom">
      <div className="container">
        <div className="recom">
          <h1>Другие продукты</h1>
          <center>
          <div className="recom--title">
            {shuffleArray().length > 0 ? (
              shuffleArray().slice(0,4).map((el, idx) => <Block el={el} idx={idx} />)
            ) : (
              <svg class="spinner" viewBox="0 0 50 50">
                <circle
                  class="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="5"
                ></circle>
              </svg>
            )}
          </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Recom;
