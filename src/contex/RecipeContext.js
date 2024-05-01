import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { actionType } from "./../redux/actionType";

const recipeContext = createContext();
export const useRecipeContext = () => useContext(recipeContext);

export const RecipeContext = ({ children }) => {
  const API =
    "https://6623da983e17a3ac84707262.mockapi.io/seamstress/seamstress";
  const dispatch = useDispatch();
  const [search , setSearch] = useState('')
  async function getData() {
    const { data } = await axios.get(API);
    dispatch({ type: actionType.GET_RECIPE, payload: data });
  }
  async function addProduct(data){
    await axios.post(API, data)
    getData();
  }
  async function removeProduct(data){
    await axios.delete(`${API}/${data}`)
    getData()
  }

  useEffect(() => {
    getData();
  }, []);
  const values = {
    setSearch,
    search,
    addProduct,
    removeProduct,
  };
  return (
    <recipeContext.Provider value={values}>{children}</recipeContext.Provider>
  );
};
