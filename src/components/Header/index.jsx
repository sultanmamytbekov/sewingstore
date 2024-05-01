import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./image/Group 3.svg";
import saveWhite from "./image/shopping-cart (2) 1.svg";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { IoSearch } from "react-icons/io5";
import "./index.scss";
import { useRecipeContext } from "../../contex/RecipeContext";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [burger, setBurger] = useState(false);
  const [searchs, setSearchs] = useState(window.innerWidth >= 1024)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { user, save , admin } = useSelector((s) => s);
  const { search, setSearch } = useRecipeContext();
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setSearchs(window.innerWidth >= 1024)
  } , [window.innerWidth])

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function naviget(){
    if (search.length > 0) {
      navigate("/search");
    }
  }
  useEffect(() => {
    naviget()
  }, [search]);


  return (
    <>
      <div
        style={{
          display: burger ? "" : "none",
        }}
        onClick={() => setBurger(false)}
        id="bg"
        className="fixed w-[100%] h-[100vh] z-[50]"
      ></div>
      <header
        className={`transition-colors w-full duration-200 ${
          scrolled ? "backdrop-blur-sm fixed top-0 z-50" : "absolute z-50"
        }`}
        style={{ borderBottom: scrolled ? "2px solid #29aae3" : "" }}
      >
        <div className="container">
          <div className="flex justify-between items-center h-[100px] max-[720px]:h-[80px]">
            <img
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  window.scroll(0, 0);
                }, 100);
                setBurger(false);
              }}
              className="max-[640px]:w-[110px]"
              src={logo}
              alt="logo"
            />

            <div className="flex gap-4 items-center">
              <div
                style={{
                  // transform: searchs ? "" : "translate(0% , 0%)",
                  opacity: searchs ? "1" : "0",
                  transition: ".5s",
                }}
                className="header--text__inputs"
              >
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Искать товары"
                  type="text"
                />
                <button>
                  <IoSearch />
                </button>
              </div>
              {user ? (
                admin.includes(user.email) ? (
                  <div
                    className="admin"
                    onClick={() => navigate("/admin")}
                    id="profile"
                  >
                    <img
                      onClick={() => setBurger(false)}
                      className="w-[40px] h-[40px] rounded-[50%]"
                      src={
                        "https://cdn-icons-png.freepik.com/512/3093/3093000.png"
                      }
                      alt="avatar"
                    />
                    <h2 id="userName">admin</h2>
                  </div>
                ) : null
              ) : null}

              {user ? (
                <div className="flex items-center gap-8 sticky">
                  <div
                    onClick={() => {
                      navigate("/saved");
                      setTimeout(() => {
                        window.scroll(0, 0);
                      }, 100);
                      setBurger(false);
                    }}
                    className="relative  max-[640px]:hidden cursor-pointer"
                  >
                    <img src={saveWhite} alt="" />
                    <p
                      style={{
                        display: save.length > 0 ? "" : "none",
                        borderColor: scrolled ? "" : "#fff",
                      }}
                      className="absolute cursor-pointer transition-all top-[-8px] right-[-8px] bg-[red] border-[2px] border-[#fff] w-[23px] h-[23px] text-center leading-[18px] rounded-[50%] text-[#fff]"
                    >
                      {save.length}
                    </p>
                  </div>
                  <div id="profile">
                    <img
                      onClick={() => setBurger(false)}
                      className="w-[40px] h-[40px] rounded-[50%]"
                      src={
                        user && user.photoURL
                          ? user.photoURL
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_we7r5CWAZRO7KN7WjBPMnjp4hDlLIrVGYad4FRuh2g&s"
                      }
                      alt="avatar"
                    />
                    <h2 id="userName">{user.displayName}</h2>
                  </div>
                  <img
                    onClick={() => signOut(auth)}
                    className="w-[30px] max-[640px]:hidden"
                    src="https://cdn-icons-png.freepik.com/512/8455/8455227.png"
                    alt="signOut"
                  />
                </div>
              ) : (
                <div className="flex gap-4 items-center max-[640px]:hidden">
                  <button
                    onClick={() => navigate("/log_in")}
                    className="text-[20px] h-[35px] bg-[#29AAE3] px-[16px] text-[#fff] flex items-center rounded-[10px]"
                  >
                    Вход
                  </button>
                  <button
                    onClick={() => navigate("/sign_up")}
                    className="text-[20px] h-[35px] bg-[#29AAE3] px-[16px] text-[#fff] flex items-center rounded-[10px]"
                  >
                    Регистрация
                  </button>
                </div>
              )}
              <div
                onClick={() => setBurger(!burger)}
                className="relative w-[35px] h-[29px] min-[1025px]:hidden"
              >
                <span
                  style={{
                    transform: burger ? "rotate(135deg)" : "",
                    top: burger ? "13px" : "",
                  }}
                  className="absolute z-[60] transition-all w-[100%] h-[3px] bg-[#29aae3] rounded-[2px] top-0"
                ></span>
                <span
                  style={{
                    transform: burger ? "scale(0)" : "",
                    top: burger ? "10px" : "",
                  }}
                  className="absolute z-[60] transition-all w-[100%] h-[3px] bg-[#29aae3] rounded-[2px] top-[50%] translate-y-[-50%]"
                ></span>
                <span
                  style={{
                    transform: burger ? "rotate(-135deg)" : "",
                    bottom: burger ? "13px" : "",
                  }}
                  className="absolute z-[60] transition-all w-[100%] h-[3px] bg-[#29aae3] rounded-[2px] bottom-0"
                ></span>
              </div>
            </div>
          </div>

          <div
            style={{
              transform: burger ? "" : "translateY(-200%)",
            }}
            id="menu"
            className="absolute transition-all z-[60]  list-none flex flex-col gap-3 p-[20px] bg-[#29aae3] border-[2px] border-[#fff] w-[190px] rounded-lg right-0 top-[100px]"
          >
            {user ? (
              <div
                onClick={() => {
                  navigate("/saved");
                  setBurger(false);
                  setTimeout(() => {
                    window.scroll(0, 0);
                  }, 100);
                setSearchs(false);
                }}
                className="flex items-center gap-3 min-[640px]:hidden"
                style={{display:user ? 'flex' :'none'}}
              >
                <li className="text-[17px] text-[#380202] cursor-pointer">
                  Корзина
                </li>
                <p
                  style={{
                    display: save.length > 0 ? "" : "none",
                  }}
                  className="bg-[red] border-[2px] border-[#fff] w-[23px] h-[23px] text-center leading-[18px] rounded-[50%] text-[#fff]"
                >
                  {save.length}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/log_in")}
                  className="text-[19px] justify-center h-[35px] bg-[#29aae3] px-[16px] text-[#fff] flex items-center rounded-[10px] min-[640px]:hidden"
                  style={{border:'1px solid #fff'}}
                >
                  Вход
                </button>
                <button
                  onClick={() => navigate("/sign_up")}
                  className="text-[19px] justify-center h-[35px] bg-[#29aae3] px-[16px] text-[#fff] flex items-center rounded-[10px] min-[640px]:hidden"
                  style={{border:'1px solid #fff'}}
                >
                  Регистрация
                </button>
              </div>
            )}
            <li
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  windowWidth < 500
                    ? window.scroll(0, 140000)
                    : window.scroll(0, 135000);
                }, 100);
                setSearchs(false);
                setBurger(false);
              }}
              className="text-[17px] text-[#380202] cursor-pointer"
            >
              Контакты
            </li>
            <li
              onClick={() => {
                setSearchs(!searchs);
                setBurger(false);
              }}
              className="text-[17px] text-[#380202] cursor-pointer"
            >
              Поиск
            </li>
            <li
              onClick={() => {
                navigate("/admin");
                window.scroll(0, 0);
                window.scroll(0, 0);
                setBurger(false);
                setSearchs(false);

              }}
              className="text-[17px] text-[#380202] cursor-pointer"
              style={{display:user ? admin.includes(user.email) ? 'flex' :'none' : 'none'}}
            >
              Добавить блок
            </li>
            <li
              onClick={() => signOut(auth)}
              className="text-[17px] text-[#380202] cursor-pointer flex items-center gap-2"
              style={{display:user ? 'flex' :'none'}}
            >
              Выйти
              <img
                className="w-[20px]"
                src="https://cdn-icons-png.flaticon.com/512/3580/3580154.png"
                alt="signOut"
              />
            </li>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
