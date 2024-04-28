import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actionType } from "../../../redux/actionType";
import { IoClose } from "react-icons/io5";
import Loading from "../img/Loading";
import axios from "axios";

const ModalBuy = () => {
  const [newData, setNewDate] = useState({ name: "", phone: "", email: "" });
  const [isLoading, setLoading] = useState(false);
  const [time, setTime] = useState(false);
  const dispatch = useDispatch();
  function onChange(e) {
    const { name, value } = e.target;

    setNewDate({ ...newData, [name]: value });
  }
  const TELEGRAM_CHAT_ID = "@Sewing_Store";
  const TELEGRAM_BOT_TOKEN = "6913526585:AAF30nzBU_Ttqh68ScTdpyzeDbF17dqjFyY";
  const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  async function sendMessageBot(e) {
    e.preventDefault();
    setLoading(true);
    let rondom = Math.floor(Math.random() * 10);
    let res = {
      name: newData.name,
      number: newData.phone,
      gmail: newData.email,
    };
    let resMessage = `ногул чмо \n имя: '${res.name} \n нрмер: "${res.number}" \n email: ${res.gmail}`;
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
      <div className="py-[30px] px-[40px] bg-white rounded-[10px] flex flex-col gap-[20px] w-[100%] max-w-[500px] items-center">
        <div className="flex items-center justify-between w-[100%]">
          <h1 className="text-[24px] font-medium">Заказать</h1>
          <button
            onClick={() =>{
              dispatch({ type: actionType.OPEN_CLOSE_MODAL, payload: false })
              setTime(false)
            }
            }
          >
            <IoClose className="text-[24px]" />
          </button>
        </div>

        {isLoading ? (
          <div className="time">{time ? <h1 className="">прошло успошно</h1> : <Loading />}</div>
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
              onChange={onChange}
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
