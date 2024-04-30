import React, { useEffect, useState } from "react";
import addImg from "./image/addImg.svg";
import del from "./image/delete.svg";
import './index.scss'
export const ImagesByURL = ({ setValues, values }) => {
  const [image, setImage] = useState("");
  const [collec, setCollec] = useState([]);
  const [imgIdx, setImgIdx] = useState(0);
  const [error, setError] = useState("");

  function addCollection() {
    if (image) {
      setCollec([...collec, image]);
      setImage("");
    } else {
      setError("Добавьте ссылку!!!");
      return;
    }
  }

  function onKeyEnterAddImage(e) {
    if (e.key === "Enter") {
      addCollection();
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError("");
      }
    }, 4000);
  }, [error]);

  useEffect(() => {
    setValues({ ...values, image: collec });
  }, [collec]);

  const deleteImage = (idx) => {
    if (window.confirm("Удалить")) {
      setCollec(collec.filter((el, ind) => ind !== idx));
      setImgIdx(imgIdx > 0 ? idx - 1 : idx);
    }
  };

  return (
    <div className="mt-[40px] mb-[40px]">
      <div
        style={{
          display: collec.length > 0 ? "" : "none",
        }}
        className="relative"
      >
        <img
          className="w-[100%] h-[300px] rounded-lg"
          src={collec[imgIdx]}
          alt=""
        />
        <button
          onClick={() => deleteImage(imgIdx)}
          className="absolute bottom-3 left-3 text-white"
        >
          <img src={del} alt="" />
        </button>
      </div>
      <div
        id="images"
        className="flex gap-2 max-w-[100%] overflow-x-scroll pb-1 my-2"
      >
        {collec.map((img, idx) => (
          <div key={idx} className="relative">
            <img
              style={{
                border: imgIdx === idx ? "5px solid #29aae3" : "",
              }}
              onClick={() => setImgIdx(idx)}
              className="min-w-[140px] max-w-[140px] h-[120px] rounded-lg"
              key={idx}
              src={img}
              alt="hjk"
            />
            <h3
              style={{
                display: imgIdx === idx ? "" : "none",
              }}
              className="absolute bottom-0 text-[#fff] bg-[#29aae3] px-[10px] rounded-r-lg rounded-br-none rounded-bl-lg pb-[5px]"
            >
              cover
            </h3>
          </div>
        ))}
      </div>
      <p className="text-center text-[20px] mb-2 text-red-600">{error}</p>

      <div className="flex max-[500px]:flex-col items-start gap-2">
        <input
            style={{border: '2px solid #757575'}}
          className="border-[2px] border-[#757575] rounded-[8px] text-[22px] py-[8px] px-[20px] w-[90%] gap-[8px] max-[500px]:w-[100%]"
          type="text"
          placeholder="фото URL..."
          onChange={(e) => setImage(e.target.value)}
          value={image}
          onKeyDown={onKeyEnterAddImage}
        />
        <button
          onClick={addCollection}
          className="min-w-[80px] max-w-[80px] h-[60px] rounded-lg flex flex-col items-center bg-[#323232] justify-center"
        >
          <img className="w-[30px]" src={addImg} alt="" />
          <h5 className="text-[#fff]">добавить</h5>
        </button>
      </div>
    </div>
  );
};
