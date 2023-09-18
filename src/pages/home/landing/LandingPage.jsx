import { Banner } from "../components/Banner";
import { BannerAds } from "../components/BannerAds";
import { CategoryListing } from "../components/CategoryListing";
import { HomeProductListing } from "../components/HomeProductListing";

export const LandingPage = () => {
  return (
    <>
      <Banner />

      <BannerAds />

      <CategoryListing />

      <BannerAds />

      <HomeProductListing />
    </>
  );
};
