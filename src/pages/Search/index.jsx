import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Block from "../../components/Hero/Elememts/Block";
import "./index.scss";
import { useRecipeContext } from "../../contex/RecipeContext";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const { recipes } = useSelector((s) => s);
  const { search } = useRecipeContext();
  const navigate = useNavigate();
  function Search() {
    let searchs = [...recipes];
    return searchs.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));
  }
  useEffect(() => {
    if(search.length === 0){
      navigate('/')
    }
  },[search])
  return (
    <div id="search">
      <div className="container">
        <div className="search">
          {Search().length !== 0 ? (
            Search().map((el, idx) => <Block el={el} idx={idx} />)
          ) : (
            <div className="search--title">
              <h1>По вашему зопросу нечего не найденно</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
