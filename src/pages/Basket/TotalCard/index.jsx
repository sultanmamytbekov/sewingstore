import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { actionType } from "../../redux/actionType";
import "../index.scss";
import { actionType } from "../../../redux/actionType";
const TotalCard = () => {
  const { save } = useSelector((s) => s);
  const dispatch = useDispatch();
  let total = save
    .map((el) => el.price * el.count)
    .reduce((acc, el) => acc + el);

  let sale = Math.ceil((total / 100) * 10);

  let salePrice = Math.ceil(total - sale);

  let totalCount = save.map((el) => el.count).reduce((acc, el) => acc + el);

  return (
    <div className="total border shadow px-[15px] py-[10px] bg-[white] ">
      <div>
        <h1>К оплате</h1>
        <h1>{salePrice}</h1>
      </div>
      <div>
        <p>Сумма за {totalCount} товара</p>
        <span className="flex-auto mx-[4px] h-[1rem] border-b-[1px] border-dashed border-[gray]"></span>
        <p>{total}c</p>
      </div>
      <div>
        <p>Скидка</p>
        <span className="flex-auto mx-[4px] h-[1rem] border-b-[1px] border-dashed border-[gray]"></span>
        <p>-{sale}c</p>
      </div>
      <div>
        <p>Начислим скидку</p>
        <span className="flex-auto mx-[4px] h-[1rem] border-b-[1px] border-dashed border-[gray]"></span>
        <p>-10%</p>
      </div>
      <div className="promo border shadow">
        <div>
          <h2>Промокод:</h2>{" "}
          <button className="border-b-[1px] border-dashed border-[#257ae8] cursor-pointer">
            Выбрать
          </button>
        </div>
        <div>
          <h2>Доставка:</h2>{" "}
          <button className="border-b-[1px] border-dashed border-[#257ae8] cursor-pointer">
            Выбрать
          </button>
        </div>
      </div>
      <button onClick={() => dispatch({ type: actionType.OPEN_CLOSE_MODAL, payload: true })}>Оформить заказ</button>
    </div>
  );
};

export default TotalCard;
