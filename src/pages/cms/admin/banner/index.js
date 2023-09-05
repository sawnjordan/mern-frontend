import { AdminCreateBanner } from "./AdminCreateBanner";
import { AdminBannerList } from "./AdminBannerList";
import { AdminUpdateBanner } from "./AdminUpdateBanner";
import BannerService from "./banner.service";

const bannerServiceObj = new BannerService();

export {
  AdminCreateBanner,
  AdminBannerList,
  AdminUpdateBanner,
  bannerServiceObj,
};
