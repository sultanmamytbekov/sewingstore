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
import Header from "../../components/Header";
const Basket = () => {
  const { save, modal } = useSelector((s) => s);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
    <Header/>
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
                <h1 data-aos="fade-down" className="text-[32px] font-semibold">
                  Ваша корзина пуста
                </h1>
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
    </>
  );
};

export default Basket;
