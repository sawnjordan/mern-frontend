import { AdminCreateBanner } from "./AdminCreateBanner";
import { AdminBannerList } from "./AdminBannerList";
import BannerService from "./banner.service";

const bannerServiceObj = new BannerService();

export { AdminCreateBanner, AdminBannerList, bannerServiceObj };
