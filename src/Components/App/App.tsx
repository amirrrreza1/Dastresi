import React from "react";
import Home from "../../Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "../../Pages/NotFound/NotFound";
import { Provider } from "react-redux";
import store from "../../Redux/Store";
import Admin from "../../Pages/Admin/Admin";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
