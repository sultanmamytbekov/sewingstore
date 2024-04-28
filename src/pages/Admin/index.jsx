import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ImagesByURL } from "./ImagesByURL";
import {useRecipeContext} from '../../contex/RecipeContext'
import { useNavigate } from "react-router-dom";
export const AddNew = () => {
  const { user } = useSelector((s) => s);
  const {addProduct} = useRecipeContext()
  const navigator = useNavigate()
  const [values, setValues] = useState({
    user: {
      name: user ? user.displayName : "",
      image: user ? user.photoURL : "",
      email: user ? user.email : "",
    },
    title: "",
    image: [],
    price: "",
    desciption: "",
  });
  function addProducts() {
    let obj = {
      user: {
        name: user ? user.displayName : "",
        image: user ? user.photoURL : "",
        email: user ? user.email : "",
      },
      name: values.title,
      image: values.image,
      price: values.price,
      desciption: values.desciption,
      boolean:false,
      available:false,
      count:1,
    }
    addProduct(obj)
    setValues({...values, title:'' , image: values.image = [], desciption:'' , price:'' })
    navigator('/')
    window.scroll(0, 0)
  }
  return (
    <section className="pt-[100px] max-[720px]:pt-[80px]">
      <div className="container">
        <div>
          <div className="mx-[auto] max-w-[590px] w-[100%]">
            <h2
              style={{
                fontWeight: "400",
              }}
              className="text-[30px] text-[#000] font-semibold max-[540px]:text-[28px] mt-[50px] mb-[20px]"
            >
              Название продукта
            </h2>
            <input
              style={{ border: "2px solid #757575" }}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              className="border-[2px] border-[#757575] rounded-[8px] text-[22px] py-[8px] px-[20px] w-[100%] gap-[8px]"
              type="text"
              placeholder="Добавить название"
              value={values.title}
            />
            <ImagesByURL setValues={setValues} values={values} />
            <input
              style={{ border: "2px solid #757575" }}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              className="border-[2px] border-[#757575] rounded-[8px] text-[22px] py-[8px] px-[20px] w-[100%] gap-[8px]"
              type="number"
              placeholder="Добавить цену"
              value={values.price}
            />
            <textarea
              onChange={(e) =>
                setValues({ ...values, desciption: e.target.value })
              }
              className="border-[2px] border-[#757575] rounded-[8px] text-[22px] py-[8px] px-[20px] w-[100%] gap-[8px] mt-[40px] max-h-[200px]"
              type="text"
              placeholder="Описание"
              value={values.desciption}
            ></textarea>

            <button onClick={() => {
              addProducts()
            }} className="py-[10px] mt-[40px] px-[54px] text-[25px] bg-[#29aae3] rounded-xl text-cente text-white">
              Создать
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
