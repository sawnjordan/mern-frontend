import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Outlet } from "react-router-dom";

export const HomePageLayout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};
