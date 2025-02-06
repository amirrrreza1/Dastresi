import { combineReducers } from "redux";
import { MainSliderActionReducer } from "./MainSlider/MainSliderActionReducer";
import { DailyOffersActionReducer } from "./DailyOffers/DailyOffersActionReducer";
import { CategoriesActionReducer } from "./Categories/CategoriesActionReducer";
import { NewlyAvailableActionReducer } from "./NewlyAvailable/NewlyAvailableActionReducer";
import { MostSellActionReducer } from "./MostSell/MostSellActionReducer";
import { BrandsActionReducer } from "./Brands/BrandsActionReducer";
import { BlogActionReducer } from "./Blog/BlogActionReducer";
import { NavbarActionReducer } from "./Navbar/NavbarActionReducer";

let rootReducer = combineReducers({
  mainSlider: MainSliderActionReducer,
  dailyOffers: DailyOffersActionReducer,
  categories: CategoriesActionReducer,
  newlyAvailable: NewlyAvailableActionReducer,
  mostSell: MostSellActionReducer,
  brands: BrandsActionReducer,
  blog: BlogActionReducer,
  navbar: NavbarActionReducer,
});

export default rootReducer;