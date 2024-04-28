import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../Hero/image/HeroImg.png";
import errorImage from "../Hero/error.svg";
import { useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useAuth } from "../../contex/AuthContext";
import './index.scss'
export const LogIn = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [valid, setValid] = useState({
    email: true,
    password: true,
  });
  const { logIn, registWithGoogle } = useAuth();
  const { user } = useSelector((s) => s);

  function handleInputValue(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function checkValid() {
    !values.email
      ? setValid({ ...valid, email: (valid.email = false) })
      : setValid({ ...valid, email: (valid.email = true) });
    !values.password
      ? setValid({ ...valid, password: (valid.password = false) })
      : setValid({ ...valid, password: (valid.password = true) });
  }

  let findFirstInd = error.indexOf("/") + 1;
  let findLastInd = error.lastIndexOf(")");
  let messageError = error.slice(findFirstInd, findLastInd);

  async function handleSignUp() {
    try {
      if (values.email && values.password) {
        await logIn(values);
        setValues({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
    checkValid();
    return;
  }

  function navigat(){
    if (user) {
      navigate("/");
    }
  }

  useEffect(() => {
   navigat()
  }, [user]);

  const [eyeOne, setEyeOne] = useState(false);

  return (
    <section className="fixed bg-white w-[100%] z-[100]">
      <img
        className="absolute right-0 z-[-1] h-[100vh] max-[680px]:hidden"
        src={bg}
        alt=""
      />
      <img
        className="absolute left-0 z-[-1] h-[100vh] rotate-180 max-[1250px]:hidden"
        src={bg}
        alt=""
      />
      <div className="container">
        <div className="flex flex-col items-center justify-center h-[100vh]">
          <input
            style={{
              border: values.email || valid.email ? "" : "2px solid red",
            }}
            onChange={handleInputValue}
            className={`border-[1px] mt-3 border-[#29aae3] rounded-[8px] px-[20px] py-[4px] text-[17px] max-w-[300px] w-[100%] ${
              values.email || valid.email ? "" : "placeholder:text-red-500"
            }`}
            type="text"
            placeholder={
              values.email || valid.email ? "Email" : "Заполните Email!"
            }
            value={values.email}
            name="email"
          />
          <div className="relative max-w-[300px] mt-3 w-[100%]">
            <input
              style={{
                border:
                  values.password || valid.password ? "" : "2px solid red",
              }}
              onChange={handleInputValue}
              className={`border-[1px] border-[#29aae3] bg-white rounded-[8px] px-[20px] py-[4px] text-[17px] w-[100%] ${
                values.password || valid.password
                  ? ""
                  : "placeholder:text-red-500"
              }`}
              type={eyeOne ? "text" : "password"}
              placeholder={
                values.password || valid.password
                  ? "Пароль"
                  : "Заполните пароль!"
              }
              value={values.password}
              name="password"
            />
            {eyeOne ? (
              <IoEyeOffOutline
                onClick={() => setEyeOne(false)}
                className="absolute top-[9px] right-4 cursor-pointer text-[18px]"
              />
            ) : (
              <IoEyeOutline
                onClick={() => setEyeOne(true)}
                className="absolute top-[9px] right-4 cursor-pointer text-[18px]"
              />
            )}
          </div>
          <p
            style={{
              display: error ? "" : "none",
            }}
            className="flex items-center border-[2px] border-[red] gap-2 bg-[#ff000096] mt-[10px] py-1 px-5 text-[#fff] rounded-lg"
          >
            <img className="w-[20px]" src={errorImage} alt="" />
            {messageError}
          </p>
          <button
            onClick={handleSignUp}
            className="max-w-[200px] w-[100%] mt-3 bg-[#29aae3] border-[1px] border-[#29aae3] py-[4px] text-[#fff] rounded-[8px] text-[18px] font-semibold hover:bg-[#29aae3] transition-all"
          >
            Войти
          </button>
          <button
            onClick={() => registWithGoogle()}
            className="flex items-center gap-2 max-w-[280px] justify-center w-[100%] mt-3 bg-[#29aae3] border-[1px] border-[#29aae3] py-[4px] text-[#fff] rounded-[8px] text-[18px] font-semibold hover:bg-[#29aae3] transition-all"
          >
            <img
              className="w-[20px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt="button"
            />
            регистрация через Google
          </button>
          <h6 className="mt-[8px] ml-[5px] text-center">
            Вы впервые в нашем сайте?{" "}
            <span
              onClick={() => navigate("/sign_up")}
              className="text-[#29aae3] cursor-pointer"
            >
              Зарегистрироваться
            </span>
          </h6>
        </div>
      </div>
    </section>
  );
};
