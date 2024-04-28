import React, { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { actionType } from "../redux/actionType";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

export const AuthContext = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  function getUser() {
    return onAuthStateChanged(auth, (user) => {
      dispatch({ type: actionType.GET_USER, payload: user });
    });
  }

  useEffect(() => {
    getUser();
  }, []);

  async function register(values) {
    await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    ).then((res) => {
      let person = res.user;
      updateProfile(person, {
        displayName: `${values.name} ${values.lastName}`,
        photoURL: values.image,
      });
    });
  }

  async function logIn(values) {
    await signInWithEmailAndPassword(auth, values.email, values.password);
  }

  async function registWithGoogle() {
    await signInWithPopup(auth, googleProvider);
  }
  const values = {
    register,
    registWithGoogle,
    logIn,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};
