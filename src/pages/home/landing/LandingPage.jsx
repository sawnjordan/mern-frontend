import { Banner } from "../components/Banner";
import { BannerAds } from "../components/BannerAds";
import { BrandListing } from "../components/BrandListing";
import { CategoryListing } from "../components/CategoryListing";
import { HomeProductListing } from "../components/HomeProductListing";

export const LandingPage = () => {
  return (
    <>
      <Banner />

      <BrandListing />

      <BannerAds />

      <CategoryListing />

      <BannerAds />

      <HomeProductListing />
    </>
  );
};
