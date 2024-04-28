import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { delInBasket, minusCartCount } from "../../redux/Reducer/ActionCreater";
// import { addToCart } from "./../../redux/Reducer/ActionCreater";
import { MdDeleteOutline } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ModalBuy from "./ModalBuy/ModalBuy";
import { addToSave } from "../../redux/Reducer/ActionCreater";
import { actionType } from "../../redux/actionType";
import "./index.scss";
import TotalCard from "./TotalCard";
const Basket = () => {
  const { save, modal } = useSelector((s) => s);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div id="basket">
      <div className="container">
        <div className="basket">
          <h1 style={{ display: save.length !== 0 ? "block" : "none" }}>
            Корзина
          </h1>
          {save.length !== 0 ? (
            <div className="basket--title border shadow">
              <div className="basket--title__text">
                {save.map((el, idx) => (
                  <div className="basket--title__text--block" key={idx}>
                    <img src={el.image[0]} alt="" />
                    <div className="basket--title__text--block__texts">
                      <div className="blockOne">
                        <h2>{el.name}</h2>
                        <div>
                          <h1>{el.price * el.count}c</h1>
                          <h3>14000c / ш.</h3>
                        </div>
                      </div>
                      <div className="blockTwe">
                        <div>
                          <button
                            onClick={() =>
                              dispatch({
                                type: actionType.ADD_COUNT_TWE,
                                payload: el.id,
                              })
                            }
                          >
                            <FaMinus />
                          </button>
                          <h3>{el.count}</h3>
                          <button
                            onClick={() =>
                              dispatch({
                                type: actionType.ADD_COUNT_ONE,
                                payload: el.id,
                              })
                            }
                          >
                            <FaPlus />
                          </button>
                        </div>

                        <button onClick={() => dispatch(addToSave(el))}>
                          <span>
                            <MdDeleteOutline />{" "}
                          </span>{" "}
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <TotalCard />
              {modal ? <ModalBuy /> : null}
            </div>
          ) : (
            <div className="flex flex-col gap-[15px] h-[80vh] items-center justify-center">
              <h1 data-aos="fade-down" className="text-[32px] font-semibold">Ваша корзина пуста</h1>
              <h5 data-aos="fade-down" className="max-w-[500px] text-center">
                Скорее в каталог, там много потрясающих украшений, которые вам
                обязательно понравятся!
              </h5>
              <button
              data-aos="fade-up"
                onClick={() => navigate("/")}
                className="bg-[#257ae8] w-[260px] h-[40px] text-[#fff] rounded-[10px] mt-[10px]"
              >
                Перейти в каталог
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Basket;

{
  /* <div className="flex flex-col justify-center z-10 bg-white w-[100%] py-[50px] ">
      <h1
        style={{
          display: save.length >= 1 ? "" : "none",
        }}
        className="ml-[30px] pb-[15px] text-[28px] font-medium border-b text-center"
      >
        Корзина
      </h1>
      {save.length > 0 ? (
        <div className="flex justify-center pr-[300px] gap-[90px]">
          <div className="basket flex flex-col items-start">
            {save.map((el, idx) => (
              <div
                className="flex py-[20px] ml-[30px] border-b min-w-[700px]"
                key={idx}
              >
                <img
                  className="h-[150px] w-[150px] object-cover"
                  src={el.image}
                  alt="product image"
                />
                <div className="py-[30px] px-[20px]">
                  <div className="flex justify-between min-w-[500px]">
                    <h1 className="max-w-90 text-[18px]">{el.name}</h1>
                    <div className="flex flex-col items-end">
                      <h3 className=" min-w-[110px] flex justify-end text-[20px] font-medium">
                        {el.count * el.price}cx
                      </h3>
                      <h4 className="text-[gray]">{el.price}c / ш.</h4>
                    </div>
                  </div>
                  <div className="flex justify-between mt-[20px]">
                    <div className="flex items-center gap-[10px]">
                      <button
                        style={{ border: "1px solid rgb(218, 215, 215)" }}
                        className="border-[1.5px] w-[40px] h-[30px] flex items-center justify-center rounded-[10px]"
                        onClick={() =>
                          dispatch({
                            type: actionType.ADD_COUNT_TWE,
                            payload: el.id,
                          })
                        }
                      >
                        <FaMinus className="text-[14px]" />
                      </button>
                      <h2 className="mx-[10px] text-[20px] font-medium">
                        {el.count}
                      </h2>
                      <button
                        style={{ border: "1px solid rgb(218, 215, 215)" }}
                        className="border-[1.5px] w-[40px] h-[30px] flex items-center justify-center rounded-[10px]"
                        onClick={() =>
                          dispatch({
                            type: actionType.ADD_COUNT_ONE,
                            payload: el.id,
                          })
                        }
                      >
                        <FaPlus className="text-[14px]" />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(addToSave(el))}
                      className="bg-[#f2f2f2] py-[5px] px-[10px] flex items-center gap-[5px] rounded-[10px] text-[#257ae8]"
                    >
                      <MdDeleteOutline className="text-[20px]" />
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <TotalCard basket={save} />
          </div>
          {modal ? <ModalBuy /> : null}
        </div>
      ) : (
        <div className="flex flex-col gap-[15px] h-[80vh] items-center justify-center">
          <h1 className="text-[32px] font-semibold">Ваша корзина пуста</h1>
          <h5 className="max-w-[500px] text-center">
            Скорее в каталог, там много потрясающих украшений, которые вам
            обязательно понравятся!
          </h5>
          <button
            onClick={() => navigate("/")}
            className="bg-[#257ae8] w-[260px] h-[40px] text-[#fff] rounded-[10px] mt-[10px]"
          >
            Перейти в каталог
          </button>
        </div>
      )}
    </div> */
}
