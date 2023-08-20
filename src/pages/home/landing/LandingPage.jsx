import { Banner } from "../components/Banner";
import { BannerAds } from "../components/BannerAds";
import { CategoryListing } from "../components/CategoryListing";
import { ProductListing } from "../components/ProductListing";

export const LandingPage = () => {
  return (
    <>
      <Banner />

      <BannerAds />

      <CategoryListing />

      <BannerAds />

      <ProductListing />
    </>
  );
};
