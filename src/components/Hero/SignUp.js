import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import bg from "../Hero/image/HeroImg.png";
import bg from "../Hero/image/Снимок экрана от 2024-04-30 11-48-51.png";
import errorImage from "../Hero/image/error.svg";
import { useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useAuth } from "../../contex/AuthContext";
import './index.scss'

export const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    image: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeat: "",
  });
  const [error, setError] = useState("");
  const [valid, setValid] = useState({
    image: true,
    name: true,
    lastName: true,
    email: true,
    password: true,
    repeat: true,
  });
  const { register, registWithGoogle } = useAuth();
  const { user } = useSelector((s) => s);

  function handleInputValue(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function checkValid() {
    !values.image
      ? setValid({ ...valid, image: (valid.image = false) })
      : setValid({ ...valid, image: (valid.image = true) });
    !values.name
      ? setValid({ ...valid, name: (valid.name = false) })
      : setValid({ ...valid, name: (valid.name = true) });
    !values.lastName
      ? setValid({ ...valid, lastName: (valid.lastName = false) })
      : setValid({ ...valid, lastName: (valid.lastName = true) });
    !values.email
      ? setValid({ ...valid, email: (valid.email = false) })
      : setValid({ ...valid, email: (valid.email = true) });
    !values.password
      ? setValid({ ...valid, password: (valid.password = false) })
      : setValid({ ...valid, password: (valid.password = true) });
    !values.repeat
      ? setValid({ ...valid, repeat: (valid.repeat = false) })
      : setValid({ ...valid, repeat: (valid.repeat = true) });
  }

  let findFirstInd = error.indexOf("/") + 1;
  let findLastInd = error.lastIndexOf(")");
  let messageError = error.slice(findFirstInd, findLastInd);

  async function handleSignUp() {
    try {
      if (
        values.image &&
        values.name &&
        values.lastName &&
        values.email &&
        values.password &&
        values.repeat
      ) {
        await register(values);
        setValues({
          image: "",
          name: "",
          lastName: "",
          email: "",
          password: "",
          repeat: "",
        });
      }
    } catch (error) {
      setError(error.message);
    }
    checkValid();
    return;
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [eyeOne, setEyeOne] = useState(false);
  const [eyeTwo, setEyeTwo] = useState(false);

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
          {/* <label>
            <img
              className="w-[50px] h-[50px] rounded-[50%]"
              src="https://static.vecteezy.com/system/resources/previews/021/352/967/original/user-icon-person-profile-avatar-with-plus-symbol-add-user-profile-icon-png.png"
              alt="add avatar"
            />
            <input className="hidden" type="file" />
          </label> */}
          <input
            style={{
              border: values.image || valid.image ? "" : "2px solid red",
            }}
            onChange={handleInputValue}
            className={`border-[1px] mt-3 border-[#29aae3] rounded-[8px] px-[20px] py-[4px] text-[17px] max-w-[300px] w-[100%] ${
              values.image || valid.image ? "" : "placeholder:text-red-500"
            }`}
            type="text"
            placeholder={
              values.image || valid.image ? "Фото URL" : "Заполните поле!"
            }
            value={values.image}
            name="image"
          />
          <input
            style={{
              border: values.name || valid.name ? "" : "2px solid red",
            }}
            onChange={handleInputValue}
            className={`border-[1px] mt-3 border-[#29aae3] rounded-[8px] px-[20px] py-[4px] text-[17px] max-w-[300px] w-[100%] ${
              values.name || valid.name ? "" : "placeholder:text-red-500"
            }`}
            type="text"
            placeholder={values.name || valid.name ? "Имя" : "Заполните поле!"}
            value={values.name}
            name="name"
          />
          <input
            style={{
              border: values.lastName || valid.lastName ? "" : "2px solid red",
            }}
            onChange={handleInputValue}
            className={`border-[1px] mt-3 border-[#29aae3] rounded-[8px] px-[20px] py-[4px] text-[17px] max-w-[300px] w-[100%] ${
              values.lastName || valid.lastName
                ? ""
                : "placeholder:text-red-500"
            }`}
            type="text"
            placeholder={
              values.lastName || valid.lastName ? "Фамилия" : "Заполните поле!"
            }
            value={values.lastName}
            name="lastName"
          />
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
              values.email || valid.email ? "Email" : "Заполните поле!"
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
              className={`border-[1px] border-[#29aae3] rounded-[8px] px-[20px] py-[4px] text-[17px] w-[100%] ${
                values.password || valid.password
                  ? ""
                  : "placeholder:text-red-500"
              }`}
              type={eyeOne ? "text" : "password"}
              placeholder={
                values.password || valid.password ? "Пароль" : "Заполните поле!"
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

          <div className="relative max-w-[300px] mt-3 w-[100%]">
            <input
              style={{
                border: values.repeat || valid.repeat ? "" : "2px solid red",
              }}
              onChange={handleInputValue}
              className={`border-[1px] border-[#29aae3] rounded-[8px] px-[20px] py-[4px] text-[17px] w-[100%] ${
                values.repeat || valid.repeat ? "" : "placeholder:text-red-500"
              }`}
              type={eyeTwo ? "text" : "password"}
              placeholder={
                values.repeat || valid.repeat
                  ? "Повторить пароль"
                  : "Заполните поле!"
              }
              value={values.repeat}
              name="repeat"
            />
            {eyeTwo ? (
              <IoEyeOffOutline
                onClick={() => setEyeTwo(false)}
                className="absolute top-[9px] right-4 cursor-pointer text-[18px]"
              />
            ) : (
              <IoEyeOutline
                onClick={() => setEyeTwo(true)}
                className="absolute top-[9px] right-4 cursor-pointer text-[18px]"
              />
            )}
            <p
              style={{
                display: error ? "" : "none",
              }}
              className="flex items-center border-[2px] border-[red] gap-2 bg-[#ff000096] mt-[10px] py-1 px-5 text-[#fff] rounded-lg"
            >
              <img className="w-[20px]" src={errorImage} alt="" />
              {messageError}
            </p>
          </div>
          <button
            onClick={handleSignUp}
            className="max-w-[200px] w-[100%] mt-3 bg-[#29aae3] border-[1px] border-[#29aae3] py-[4px] text-[#fff] rounded-[8px] text-[18px] font-semibold hover:bg-[#29aae3] transition-all"
          >
            Зарегистрироваться
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
            у тебя есть аккаунт?{" "}
            <span
              onClick={() => navigate("/log_in")}
              className="text-[#29aae3] cursor-pointer"
            >
              Войти
            </span>
          </h6>
        </div>
      </div>
    </section>
  );
};
