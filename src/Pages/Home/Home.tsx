import Blog from "../../Components/Blog/Blog";
import Brands from "../../Components/Brands/Brands";
import Categories from "../../Components/Categories/Categories";
import DailyOffers from "../../Components/DailyOffers/DailyOffers";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import MainSlider from "../../Components/MainSlider/MainSlider";
import MostSell from "../../Components/MostSell/MostSell";
import NewlyAvailable from "../../Components/NewlyAvailable/NewlyAvailable";
import WhyDastresi from "../../Components/SwiperButton/WhyDastresi/WhyDastresi";

const Home = () => {
  return (
    <>
      <Header />
      <MainSlider />
      <DailyOffers />
      <Categories />
      <NewlyAvailable />
      <WhyDastresi />
      <MostSell />
      <Brands />
      <Blog />
      <Footer />
    </>
  );
};

export default Home;
