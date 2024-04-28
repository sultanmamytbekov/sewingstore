import React from "react";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../image/shopping-cart (1) 1.svg";
import { addToSave } from "../../../../redux/Reducer/ActionCreater";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useRecipeContext } from "../../../../contex/RecipeContext";

const Block = ({ el, idx }) => {
  const { user, save } = useSelector((s) => s);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {removeProduct} = useRecipeContext()
  return (
    <div
      data-aos={idx % 2 === 0 ? "fade-up" : "fade-down"}
      key={idx}
      className="text"
    >
      <img className="text--img" src={el.image[0]} alt="" />
      <h1>{el.name}</h1>
      <div className="text--flex">
        <div>
          <h4>В наличии</h4>
          <h2>{el.price}сом</h2>
        </div>
        <div className="removeFlex flex gap-[10px]">
        <button 
          style={{
            background: save.some((item) => item.id === el.id)
              ? "rgb(218, 215, 215)"
              : "",
          }}
          onClick={() => {
            dispatch(addToSave(el));
          }}
        >
          <img src={img1} alt="" />
          <p
            style={{
              background: save.some((item) => item.id === el.id)
                ? "rgb(218, 215, 215)"
                : "",
            }}
          >
            +
          </p>
        </button>
        {
          user ? user.email === "sultanmamytbekov98@gmail.com" ? (
            <button className="removeBtn" onClick={() => removeProduct(el.id)}><MdDeleteOutline/></button>
          ) : null : null
        }
        </div>

      </div>
      <button
        onClick={() => {
          navigate(`/detail/${el.id}`);
          window.scroll(0, 0);
        }}
        className="buttons"
      >
        Подробнее
      </button>
    </div>
  );
};

export default Block;
