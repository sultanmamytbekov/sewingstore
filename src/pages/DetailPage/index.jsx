import React, { useEffect, useState } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Recom from "./Recom";
import Card from "../../components/Hero/Сard";
import { addToSave } from "../../redux/Reducer/ActionCreater";
import { actionType } from "../../redux/actionType";
import ModalBuy from "../Basket/ModalBuy/ModalBuy";

const DetailPage = () => {
  const { recipes, save , user , modal   } = useSelector((s) => s);

  const [oneRecipe, setOneRecipe] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  function foundOneRecipe() {
    let oneRecipes = recipes.find((el) => el.id == id);
    setOneRecipe(oneRecipes);
  }
  useEffect(() => {
    foundOneRecipe();
  }, [recipes]);

  return (
    <>
      <div id="detail">
        <div className="container">
          <div className="detail">
            <div className="detail--text">
              <img
                style={{
                  border: "2px solid #29AAE3",
                }}
                className="w-[588px] h-[480px] rounded-[20px] max-[1200px]:w-[788px] max-[1025px]:h-[400px] max-[700px]:h-[350px] "
                src={
                  oneRecipe
                    ? oneRecipe.image
                      ? oneRecipe.image[imgIdx]
                      : ""
                    : null
                }
                alt=""
              />
              <div
                id="img"
                className="flex gap-[30px] max-w-[800px] h-[230px] min-h-[166px] items-center overflow-x-scroll max-[540px]:gap-[15px] max-[375px]:w-[99%]"
              >
                {oneRecipe
                  ? oneRecipe.image.map((img, idx) => (
                      <div key={idx} className="relative">
                        <div
                          onClick={() => setImgIdx(idx)}
                          style={{
                            opacity: imgIdx === idx ? "0" : "1",
                          }}
                          className="absolute w-[100%] h-[100%] rounded-[8px] bg-[#0000007c] z-10"
                        ></div>
                        <img
                          style={{
                            height: imgIdx === idx ? "121px" : "115px",
                            width: imgIdx === idx ? "154px" : "140px",
                            border: imgIdx === idx ? "2px solid #29AAE3" : "",
                            boxShadow:
                              imgIdx === idx
                                ? "0px 0px 17px 2px #00000087"
                                : "",
                          }}
                          className="min-w-[132px] h-[160px] rounded-[8px]"
                          src={img}
                          alt="products"
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <div className="detail--text1">
              <div className="block">
                <h1>{oneRecipe ? oneRecipe.name : ""}</h1>
                <h4>В наличии</h4>
                <h2>{oneRecipe ? oneRecipe.price : ""}сом</h2>
              </div>
              <div className="blocks">
                <div className="detail--text1__count">
                  <button
                    onClick={() => {
                      setOneRecipe({...oneRecipe , count:oneRecipe.count -= (oneRecipe.count !== 1 ? 1 : 0)});
                    }}
                  >
                    -
                  </button>
                  <div>{oneRecipe ? oneRecipe.count : ""}</div>
                  <button
                    onClick={() => {
                      setOneRecipe({...oneRecipe , count:oneRecipe.count += 1});
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  className="buttons"
                  style={{
                    background: save.some(
                      (item) => item.id == (oneRecipe ? oneRecipe.id : null)
                    )
                      ? "rgb(218, 215, 215)"
                      : "",
                    color: save.some(
                      (item) => item.id == (oneRecipe ? oneRecipe.id : null)
                    )
                      ? "white"
                      : "",
                    border: save.some(
                      (item) => item.id == (oneRecipe ? oneRecipe.id : null)
                    )
                      ? "none"
                      : "",
                  }}
                  onClick={() => {
                    if(user){
                      dispatch(addToSave(oneRecipe));
                    }else{
                      alert('пройдите регистратцию')
                    }
                  }}
                >
                  {save.some(
                    (item) => item.id == (oneRecipe ? oneRecipe.id : null)
                  ) ? 'Убрать с корзину' : 'Добавить в корзину' }
                  
                </button>
                <button onClick={() => dispatch({ type: actionType.OPEN_CLOSE_MODAL, payload: true })} className="buttons">Купить в один клик</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal ? <ModalBuy /> : null}
      <Recom />
      <Card />
    </>
  );
};

export default DetailPage;
