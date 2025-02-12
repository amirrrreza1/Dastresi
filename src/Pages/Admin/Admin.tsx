import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      setError("");
    } else {
      setError("یوزر یا پسورد اشتباه است.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };


  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen bg-(--color-PrimeBlue) text-white flex flex-col items-center justify-around">
        <div className="w-[60vw] h-[60vh] bg-white rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center">
          <h2 className="bg-(--color-SecondaryBlue) text-white text-center text-xl font-bold px-4 py-2 rounded-md">
            ورود به صفحه Admin
          </h2>
          <input
            type="text"
            placeholder="یوزر"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-500 p-2 m-3 rounded-md focus-within:outline-none"
          />
          <input
            type="password"
            placeholder="پسورد"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-500 p-2 m-3 rounded-md focus-within:outline-none"
          />
          <button
            onClick={handleLogin}
            className="bg-gray-400 px-8 py-2 m-3 rounded-md hover:bg-gray-700 transition-all duration-200"
          >
            ورود
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#9BD4E4]">
      <h1 className="!leading-[70px] !text-black !opacity-100">Admin Page</h1>
      <h2 className="text-center text-xl mb-2">Select an item to edit</h2>
      <div className="w-[50%] min-w-[350px] flex-wrap m-auto flex items-center justify-center gap-5">
        <Link to="/Admin/MainSlider" className="AdminPanelLinks">
          Main Slider
        </Link>
        <Link to="/Admin/DailyOffers" className="AdminPanelLinks">
          Daily Offers
        </Link>
        <Link to="/Admin/Categories" className="AdminPanelLinks">
          Categories
        </Link>
        <Link to="/Admin/NewlyAvailable" className="AdminPanelLinks">
          Newly Available
        </Link>
        <Link to="/Admin/MostSell" className="AdminPanelLinks">
          Most Sell
        </Link>
        <Link to="/Admin/Brands" className="AdminPanelLinks">
          Brands
        </Link>
        <Link to="/Admin/Blog" className="AdminPanelLinks">
          Blog
        </Link>
      </div>
      <Link to="/" onClick={handleLogout} className="AdminPageBackButton">
        خروج
      </Link>
    </div>
  );
};

export default Admin;
