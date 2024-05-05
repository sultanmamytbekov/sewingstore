import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionType } from "../../../redux/actionType";
import { IoClose } from "react-icons/io5";
import Loading from "../img/Loading";
import axios from "axios";

const ModalBuy = () => {
  const [newData, setNewDate] = useState({ name: "", phone: "", email: "" });
  const [isLoading, setLoading] = useState(false);
  const [time, setTime] = useState(false);
  const { save, user } = useSelector((s) => s);
  const dispatch = useDispatch();
  console.log(
    "lol",
    
  );
  function onChange(e) {
    const { name, value } = e.target;
    setNewDate({ ...newData, [name]: value });
  }

  function getPhone(e) {
    let str = e.target.value.replace(/\D/g, ""); // Удаляем все нецифровые символы
    let formattedNumber = "";

    if (str.length > 0) {
      formattedNumber += `(${str.slice(0, 4)}`;
    }

    if (str.length > 4) {
      formattedNumber += `) ${str.slice(4, 6)}`;
    }

    if (str.length > 6) {
      formattedNumber += `-${str.slice(6, 8)}`;
    }

    if (str.length > 8) {
      formattedNumber += `-${str.slice(8, 10)}`;
    }

    setNewDate({ ...newData, phone: formattedNumber });
  }

  const TELEGRAM_CHAT_ID = "@Sewing_Store";
  const TELEGRAM_BOT_TOKEN = "6913526585:AAF30nzBU_Ttqh68ScTdpyzeDbF17dqjFyY";
  const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  async function sendMessageBot(e) {
    e.preventDefault();
    if (
      newData.name.length === 0 &&
      newData.phone.length === 0 &&
      newData.email.length === 0
    ) {
      alert("заполните все поле!");
      return;
    } else if (newData.phone.length !== 15) {
      alert("заполните поле с номером телефона!");
      return;
    }

    setLoading(true);
    let rondom = Math.floor(Math.random() * 10);
    let res = {
      name: newData.name,
      number: newData.phone,
      gmail: newData.email,
    };
    let resMessage = `
    Пользователь: ${user.displayName} \n имя: '${res.name} \n нормер: "${
      res.number
    }" \n email: ${res.gmail} \n купил товар под номером: ${save
      .map((el) => el.id)
      .join(",")} \n общая цена: ${Math.round(save.map((el) => el.count * +el.price).reduce((acc, el) => acc + el))}сом`;
    axios.post(API, {
      chat_id: TELEGRAM_CHAT_ID,
      parse_mode: "html",
      text: resMessage,
    });
    setTimeout(() => {
      setTime(true);
    }, rondom * 1000);
  }

  return (
    <div
      id="modal"
      className="fixed inset-[0] z-20 w-[100%] h-[100vh] backdrop-blur-md bg-[#a09f9f57] flex justify-center items-center"
    >
      <div className="py-[30px] px-[40px] bg-white rounded-[10px] flex flex-col gap-[20px] w-[100%] max-w-[500px] items-center m-[30px]">
        <div className="flex items-center justify-between w-[100%]">
          <h1 className="text-[27px] font-medium">Заказать</h1>
          <button
            onClick={() => {
              dispatch({ type: actionType.OPEN_CLOSE_MODAL, payload: false });
              setTime(false);
            }}
          >
            <IoClose className="text-[24px]" />
          </button>
        </div>

        {isLoading ? (
          <div className="time">
            {time ? <h1 className="">прошло успошно</h1> : <Loading />}
            <center>
              <button
                onClick={() => {
                  dispatch({
                    type: actionType.OPEN_CLOSE_MODAL,
                    payload: false,
                  });
                  dispatch({ type: actionType.BASKET_REMOVE, payload: [] });
                  setTime(false);
                }}
                style={{ display: time ? "block" : "none" }}
                className="bg-[#257ae8] px-[20%] py-[10px] my-2 rounded-[10px] text-[#fff]"
              >
                ок
              </button>
            </center>
          </div>
        ) : (
          <form onSubmit={sendMessageBot}>
            <input
              className="border-b-[1px] border-[#000] bg-[#f2f2f2] py-[5px]  px-[10px] w-[100%] text-[18px] outline-none "
              type="text"
              placeholder="Имя..."
              required
              name="name"
              value={newData.name}
              onChange={onChange}
            />
            <input
              className="border-b-[1px] border-[#000] bg-[#f2f2f2] py-[5px] my-2 px-[10px] w-[100%] text-[18px] outline-none "
              type="text"
              placeholder="Номер телефона..."
              name="phone"
              required
              value={newData.phone}
              onChange={getPhone} // Обновленный onChange для номера телефона
            />
            <input
              className="border-b-[1px] border-[#000] bg-[#f2f2f2] py-[5px] px-[10px] w-[100%] text-[18px] outline-none"
              placeholder="Email..."
              type="text"
              name="email"
              required
              value={newData.email}
              onChange={onChange}
            />
            <button className="bg-[#257ae8] px-[20%] py-[10px] my-2 rounded-[10px] text-[#fff]">
              Отправить
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalBuy;
