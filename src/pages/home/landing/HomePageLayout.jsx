import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInUser } from "../../../reducers/user.reducers";

export const HomePageLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token") ?? null;
    if (token) {
      dispatch(getLoggedInUser());
    }
  }, []);
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};
